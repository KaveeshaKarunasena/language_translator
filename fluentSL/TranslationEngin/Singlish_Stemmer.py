import sys
from numpy.linalg import norm
from fuzzywuzzy import fuzz
from main import db_connection
import textwrap

text = "rupaya"
width = 5 #

print (textwrap.wrap(text,width))

example_words = ["apita","heta","eakak","thiyenwa","exam"]



db = db_connection()
test_db = db.test
dictionary = test_db.dictionary
suffixes = test_db.suffixes

base_form=[]

def suffixes_exact_matching(word):
    result = suffixes.aggregate([
        {
            "$search":{
                "index":"suffixes_index",
                "text":{
                    "query":word,
                    "path":"singlish_suffix",
                }
            }
        }
    ])
    result["english_suffix"]


def fuzzy_english_matching(word):
    result = dictionary.aggregate([
        {
            "$search":{
                "index":"language_index",
                "text":{
                    "query":word,
                    "path":"singlish_word",
                }
            }
        }
    ])
    result["english_word"]


def fuzzy_score(word_list):
    singlish_score = 0
    the_word = ''
    for item in word_list:
        item_word =item['singlish_word']
        if fuzz.ratio(word, item_word ) > singlish_score:
            singlish_score =fuzz.ratio(word, item_word )
            the_word = item_word
    print("singlish score",singlish_score)
    englis_word = fuzzy_english_matching(the_word) 
    print("english word",englis_word)
    base_form.append(englis_word)       
    word_size = len(item_word)
    splited_words = textwrap.wrap(the_word,word_size)
    suffix_english = suffixes_exact_matching(splited_words[1])
    base_form.append(suffix_english)



def fuzzy_singlish_matching(word):
    result = dictionary.aggregate([
        {
            "$search":{
                "index":"language_index",
                "text":{
                    "query":word,
                    "path":"singlish_word",
                    "fuzzy":{ "maxEdits": 1}
                }
            }
        }
    ])
    word_list = list(result)
    fuzzy_score(word_list)




for word in example_words:
    fuzzy_singlish_matching(word)



