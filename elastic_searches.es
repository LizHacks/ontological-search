
POST /fedex/_search?q=*

--
// user types "Alzheimer disease"
// translate "Alzheimer disease" to ontology id (HP:0002511)
// return all documents relating to (HP:0002511)
// TODO: add document that doesn't have ontology id annotation
POST /fedex/_search
{
	"query": {
	    "bool": {
	      "should": [
	        {"match": {"disease.rdf.id": "HP:0002511"} },
	        {"match": {"disease.text": "Alzheimer disease"} }
	        ]
	    }
	}
}

--
// user types "Morphological abnormality of the central nervous system"
// translate "Morphological abnormality of the central nervous system" to ontology id (HP:0002011)
// return all documents relating to (HP:0002011) including children
POST /fedex/_search
{
	"query": {
	    "bool": {
	      "should": [
	        {"match": {"disease.rdf.id": "HP:0002011"} },
	        {"match": {"disease.rdf.id": "HP:0002511"} },
	        {"match": {"disease.rdf.id": "HP:0100006"} },
	        {"match": {"disease.text": "Morphological abnormality of the central nervous system"} }
	        ]
	    }
	}
}

--
// user types "Cushing Syndrome"
// translate "Cushing Syndrome" to ontology id (HP:0003118)
// return all documents relating to (HP:0003118) including synonyms (Hypercortisolism) & parents
POST /fedex/_search
{
	"query": {
	    "bool": {
	      "should": [
	        {"match": {"disease.rdf.id": "HP:0003118"} },
	        {"match": {"disease.rdf.id": "HP:0003077"} },
	        {"match": {"disease.text": "Cushing Syndrome"} }
	        ]
	    }
	}
}


      