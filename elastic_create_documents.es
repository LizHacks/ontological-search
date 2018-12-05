

GET /

--
GET /_cat/indices

--
GET /fedex/_mapping

--
DELETE /fedex

--
PUT /fedex
{
  "settings": {
    "analysis": {
      "filter": {
        "english_stop": {
          "type": "stop",
          "stopwords": "_english_"
        },
        "english_stemmer": {
          "type": "stemmer",
          "language": "english"
        },
        "light_english_stemmer": {
          "type": "stemmer",
          "language": "light_english"
        },
        "english_possessive_stemmer": {
          "type": "stemmer",
          "language": "possessive_english"
        },
        "url_stop": {
          "type": "stop",
          "stopwords": [
            "http",
            "https",
            "ftp",
            "sftp",
            "www"
          ]
        }
      },
      "analyzer": {
        "english_custom": {
          "tokenizer": "standard",
          "filter": [
            "english_possessive_stemmer",
            "lowercase",
            "english_stop",
            "light_english_stemmer",
            "asciifolding"
          ]
        },
        "url_tokens_custom": {
          "tokenizer": "letter",
          "filter": [
            "lowercase",
            "url_stop"
          ]
        },
        "url_english_custom": {
          "tokenizer": "letter",
          "filter": [
            "lowercase",
            "url_stop",
            "light_english_stemmer"
          ]
        }
      }
    }
  },
  "mappings": {
    "record": {
      "properties": {
        "title": {
          "type": "text"
        },
        "disease": {
          "properties": {
            "text": {
              "type": "text"
            },
            "rdf": {
              "properties": {
                "id": {
                  "type": "keyword"
                },
                "namespace": {
                  "type": "keyword"
                }
              }
            }
          }
        },
        "gender": {
          "properties": {
            "text": {
              "type": "text"
            },
            "rdf": {
              "properties": {
                "id": {
                  "type": "keyword"
                },
                "namespace": {
                  "type": "keyword"
                }
              }
            }
          }
        },
        "assay": {
          "properties": {
            "text": {
              "type": "text"
            },
            "rdf": {
              "properties": {
                "id": {
                  "type": "keyword"
                },
                "namespace": {
                  "type": "keyword"
                }
              }
            }
          }
        }
      }
    }
  }
}


POST /fedex/record/0001
{
  "title": "Record #1 with Alzheimer disease, RNA-seq & M",
  "disease": {
    "text":"Alzheimer disease",
    "rdf": [{
      "id":"HP:0002511",
      "namespace":"HPO"
    }]
  },
  "gender": {
    "text":"M",
    "rdf": [{
      "id":"",
      "namespace":""
    }]
  },
  "assay": {
    "text":"RNA-seq",
    "rdf": [{
      "id":"",
      "namespace":""
    }]
  }
}

POST /fedex/record/0002
{
  "title": "Record #2 with Alzheimer's disease, RNA-seq & Male",
  "disease": {
    "text":"Alzheimer's disease",
    "rdf": [{
      "id":"HP:0002511",
      "namespace":"HPO"
    }]
  },
  "gender": {
    "text":"Male",
    "rdf": [{
      "id":"",
      "namespace":""
    }]
  },
  "assay": {
    "text":"RNA-seq",
    "rdf": [{
      "id":"",
      "namespace":""
    }]
  }
}

POST /fedex/record/0003
{
  "title": "Record #3 with Alzheimer, RNA-seq & Male",
  "disease": {
    "text":"Alzheimer",
    "rdf": [{
      "id":"HP:0002511",
      "namespace":"HPO"
    }]
  },
  "gender": {
    "text":"Male",
    "rdf": [{
      "id":"",
      "namespace":""
    }]
  },
  "assay": {
    "text":"RNA-seq",
    "rdf": [{
      "id":"",
      "namespace":""
    }]
  }
}

POST /fedex/record/0004
{
  "title": "Record #4 with Neoplasm of the central nervous system, ATAC-seq & Female",
  "disease": {
    "text":"Neoplasm of the central nervous system",
    "rdf": [{
      "id":"HP:0100006",
      "namespace":"HPO"
    }]
  },
  "gender": {
    "text":"Female",
    "rdf": [{
      "id":"",
      "namespace":""
    }]
  },
  "assay": {
    "text":"ATAC-seq",
    "rdf": [{
      "id":"",
      "namespace":""
    }]
  }
}

POST /fedex/record/0005
{
  "title": "Record #5 with Spinal hemangioblastoma, WES & F",
  "disease": {
    "text":"Spinal hemangioblastoma",
    "rdf": [{
      "id":"HP:0009713",
      "namespace":"HPO"
    }]
  },
  "gender": {
    "text":"F",
    "rdf": [{
      "id":"",
      "namespace":""
    }]
  },
  "assay": {
    "text":"WES",
    "rdf": [{
      "id":"",
      "namespace":""
    }]
  }
}

POST /fedex/record/0006
{
  "title": "Record #6 with Hypercortisolism, WES & F",
  "disease": {
    "text":"Hypercortisolism",
    "rdf": [{
      "id":"HP:0003118",
      "namespace":"HPO"
    }]
  },
  "gender": {
    "text":"F",
    "rdf": [{
      "id":"",
      "namespace":""
    }]
  },
  "assay": {
    "text":"WES",
    "rdf": [{
      "id":"",
      "namespace":""
    }]
  }
}

POST /fedex/record/0007
{
  "title": "Record #7 with Increased circulating cortisol level, WES & F",
  "disease": {
    "text":"Increased circulating cortisol level",
    "rdf": [{
      "id":"HP:0003118",
      "namespace":"HPO"
    }]
  },
  "gender": {
    "text":"F",
    "rdf": [{
      "id":"",
      "namespace":""
    }]
  },
  "assay": {
    "text":"WES",
    "rdf": [{
      "id":"",
      "namespace":""
    }]
  }
}


POST /fedex/record/0008
{
  "title": "Record #8 with Hyperlipidemia, WES & F",
  "disease": {
    "text":"Hyperlipidemia",
    "rdf": [{
      "id":"HP:0003077",
      "namespace":"HPO"
    }]
  },
  "gender": {
    "text":"F",
    "rdf": [{
      "id":"",
      "namespace":""
    }]
  },
  "assay": {
    "text":"WES",
    "rdf": [{
      "id":"",
      "namespace":""
    }]
  }
}

