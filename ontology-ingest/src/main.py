import os
import json
import sys

from pyArango.connection import Connection;
import pronto;

# FIXME: this sucks but it'll be ok
ONTOLOGY_PATH = print(os.getcwd() + '/' +sys.argv[1])
DB_NAME = "ontologies_1"
ONTOLOGY_COLLECTION = "terms"
ONTOLOGY_RELATIONSHIPS = "onto_tree"

def main():
    arango_connection = Connection()

    #  arango_connection.createDatabase(name = DB_NAME)
    arango_database = arango_connection[DB_NAME]
    try:
        arango_database.createCollection(name = ONTOLOGY_COLLECTION)
    except:
        pass
    onto_collection = arango_database[ONTOLOGY_COLLECTION]

    try:
        arango_database.createCollection(className= "Edges", name=ONTOLOGY_RELATIONSHIPS)
    except:
        pass
    relationships_collection = arango_database[ONTOLOGY_RELATIONSHIPS]

    # Create documents
    print("Loading ontology")
    ontology = pronto.Ontology(sys.argv[1])
    print(ontology)

    for term in ontology:
        # insert that term into arango's document collection
        # insert the term's relationships into arango's graph collection
        print("Indexing term_id: {0}".format(term.id))
        to_insert = make_term_entry(term);
        doc = onto_collection.createDocument(to_insert)
        doc._key = term.id;
        doc.save()
        make_graph_relations(term, relationships_collection)
        # do something with onto_collection

def make_graph_relations(term, arango_collection): # -> {}[]
    # Generate each graph_relation from the term
    relations = []
    for child in term.children:
        relation_data = make_graph_relation(term.id, child.id, term.id)
        doc = arango_collection.createDocument(relation_data)
        doc['_from'] = relation_data["_from"]
        doc['_to'] = relation_data["_to"]

        doc._key = "{0}-{1}".format(term.id, child.id)
        doc.save()

def make_graph_relation(fr, to, ve):
    return {
        "_from": "{0}/{1}".format(ONTOLOGY_COLLECTION, fr),
        "_to": "{0}/{1}".format(ONTOLOGY_COLLECTION, to),
        "vertex": ve
    }

def make_term_entry(term):
    return {
        "id": term.id,
        "title": str(term.name).lower(),
        "desc": term.desc,
        "synonyms": list(map(lambda syn: str(syn.desc).lower(), list(term.synonyms))),
        "other": term.other,
    }

main()
