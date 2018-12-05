import os
import json
import sys

from pyArango.connection import Connection;
import pronto;

# FIXME: this sucks but it'll be ok
ONTOLOGY_PATH = print(os.getcwd() + '/' +sys.argv[1])
DB_NAME = "ontologies_1"

def main():
    arango_connection = Connection()

    #  arango_connection.createDatabase(name = DB_NAME)
    arango_database = arango_connection[DB_NAME]
    try:
        arango_database.createCollection(name = "first_ontology")
    except:
        pass

    onto_collection = arango_database["first_ontology"]

    # Create documents
    print("Loading ontology")
    ontology = pronto.Ontology(sys.argv[1])
    print(ontology)

    for term in ontology:
        # insert that term into arango's document collection
        # insert the term's relationships into arango's graph collection
        print("Indexing term_id: {0}".format(term.id))
        print(json.dumps(make_term_entry(term)))
        to_insert = make_term_entry(term);
        # do something with onto_collection

def make_graph_relations(term): # -> {}[]
    # Generate each graph_relation from the term
    for relation in term.children:
        pass

    pass

def make_graph_relation(fr, to, ve):
    return {"_from": fr, "_to": to, "vertex": ve}

def make_term_entry(term):
    return {
        "id": term.id,
        "title": term.name,
        "desc": term.desc,
        "synonyms": list(map(lambda syn: syn.desc, list(term.synonyms))),
        "other": term.other,
    }

main()
