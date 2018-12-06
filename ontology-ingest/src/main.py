import os
import sys
import urllib
import json
import time

from pyArango.connection import Connection;
import pronto;

# FIXME: this sucks but it'll be ok
DB_NAME = "ontologies_2"
ONTOLOGY_COLLECTION = "terms"
ONTOLOGY_RELATIONSHIPS = "onto_tree"

ONTOLOGY_GRAPH_NAME = "ontology"

def main():
    """ main function - contains high level program logic"""
    print("[info] Connecting to Arango")
    arango_connection = Connection()

    _, onto_collection, relationships_collection = initialise_database(arango_connection)

    # Create documents
    if len(sys.argv) != 2:
        print("[error] You need to supply the name of the .owl file")
        sys.exit(-1)

    print("[info] Loading ontology from {0}".format(sys.argv[1]))
    ontology = pronto.Ontology(sys.argv[1])
    print("[info] Successfully loaded ontology")
    print("[info] Starting to index terms")

    last_percent = 0
    total_terms = len(ontology)

    for index, term in enumerate(ontology):
        # insert that term into arango's document collection
        # insert the term's relationships into arango's graph collection

        to_insert = make_term_entry(term)
        doc = onto_collection.createDocument(to_insert)
        doc['_key'] = term.id
        doc.save()
        make_graph_relations(term, relationships_collection)

        percent = int((index / total_terms) * 100)
        if (percent - last_percent) >= 5:
            print("[info] indexed {0}% of terms".format(percent))
            last_percent = percent

    # Now that we've done that, let's make actually make the graph
    print("[info] Finished indexing terms")
    print("[info] Creating graph: \"{0}\"".format(ONTOLOGY_GRAPH_NAME))

    payload = {
        "name": ONTOLOGY_GRAPH_NAME,
        "edgeDefinitions": [{
            "collection": ONTOLOGY_RELATIONSHIPS,
            "from": [
                ONTOLOGY_COLLECTION
            ],
            "to": [
                ONTOLOGY_COLLECTION
            ],
        }]
    }

    request_data = bytes(json.dumps(payload), 'UTF-8')
    request = urllib.request.Request(
        url="http://localhost:8529/_db/{0}/_api/gharial".format(DB_NAME),
        data=request_data,
    )
    urllib.request.urlopen(request)

    print("[info] All done!")

def initialise_database(arango_connection):
    """ Initialise the database and it's "tables" """
    try:
        arango_connection.createDatabase(name=DB_NAME)
    except Exception:
        pass
    arango_database = arango_connection[DB_NAME]

    try:
        arango_database.createCollection(name=ONTOLOGY_COLLECTION)
    except Exception:
        pass
    onto_collection = arango_database[ONTOLOGY_COLLECTION]

    try:
        arango_database.createCollection(className="Edges", name=ONTOLOGY_RELATIONSHIPS)
    except Exception:
        pass
    relationships_collection = arango_database[ONTOLOGY_RELATIONSHIPS]

    return (arango_database, onto_collection, relationships_collection)

def make_graph_relations(term, arango_collection): # -> {}[]
    """ Generate each graph_relation from the term """
    for child in term.children:
        relation_data = make_graph_relation(term.id, child.id, term.id)
        doc = arango_collection.createDocument(relation_data)
        doc['_from'] = relation_data["_from"]
        doc['_to'] = relation_data["_to"]

        doc['_key'] = "{0}-{1}".format(term.id, child.id)
        doc.save()

def make_graph_relation(from_id, to_id, vertex):
    """ Transform attributes into a json object """
    return {
        "_from": "{0}/{1}".format(ONTOLOGY_COLLECTION, from_id, ),
        "_to": "{0}/{1}".format(ONTOLOGY_COLLECTION, to_id),
        "vertex": vertex
    }

def make_term_entry(term):
    """ Transform an ontology term into a collection entry """
    return {
        "id": term.id,
        "title": str(term.name).lower(),
        "desc": term.desc,
        "synonyms": list(map(lambda syn: str(syn.desc).lower(), list(term.synonyms))),
        "other": term.other,
    }

main()
