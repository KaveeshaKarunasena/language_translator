import sys
from numpy.linalg import norm
from fuzzywuzzy import fuzz
from main import db_connection
import textwrap

text = "rupaya"
width = 5 #

print (textwrap.wrap(text,width))

example_words = ["mama","gedara","yanwa","bus","eke"]



db = db_connection()
test_db = db.test
dictionary = test_db.dictionary
suffixes = test_db.suffixes

base_form=[]

def suffixes_exact_matching(word):
    print(word)
    result = suffixes.aggregate([
        {
            "$search":{
                "index":"suffixes_index",
                "text":{
                    "query":word,
                    "path":"singlish_word",
                }
            }
        }
    ])
    word_list = list(result)
    return word_list[0]['english_word']



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
    word_list = list(result)
    return word_list[0]['english_word']


def fuzzy_score(word,word_list):
    if(len(word_list) == 0):
        print("no words found in Data base")
    singlish_score = 0
    base_word = ''
    for item in word_list:
        item_word =item['singlish_word']
        if fuzz.ratio(word, item_word ) > singlish_score:
            singlish_score =fuzz.ratio(word, item_word )
            base_word = item_word
    print("singlish score",singlish_score)
    word_size = len(base_word) 
    if word_size < len(word):
        splited_words = textwrap.wrap(word,word_size)
        print(splited_words)
        suffix_english = suffixes_exact_matching(splited_words[1])
        base_form.append(suffix_english)
    englis_word = fuzzy_english_matching(base_word) 
    print("english word",englis_word)
    base_form.append(englis_word)       
    
    
    



def fuzzy_singlish_matching(word):
    result = dictionary.aggregate([
        {
            "$search":{
                "index":"language_index",
                "text":{
                    "query":word,
                    "path":"singlish_word",
                    "fuzzy":{ "maxEdits": 2}
                }
            }
        }
    ])
    word_list = list(result)
    fuzzy_score(word,word_list)




for word in example_words:
    fuzzy_singlish_matching(word)


print(base_form)



