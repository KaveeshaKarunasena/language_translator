import sys
import numpy as np
from numpy.linalg import norm
from fuzzywuzzy import fuzz
from main import db_connection

# example_words = ["apita","heta","eakak","thiyenwa","exam"]


# n1 = "gedara"
# n2 = "gedaraka"

# print(fuzz.ratio(n1, n2))

db = db_connection()
test_db = db.test
dictionary = test_db.dictionary

def fuzzy_singlish_matching():
    result = dictionary.aggregate([
        {
            "$search":{
                "index":"language_index",
                "text":{
                    "query":"rupaya",
                    "path":"singlish_word",
                    "fuzzy":{}
                }
            }
        }
    ])
    print(list(result))

fuzzy_singlish_matching()


