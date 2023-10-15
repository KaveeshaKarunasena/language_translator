import sys
from dotenv import load_dotenv,find_dotenv
from fuzzywuzzy import fuzz
import os
from pymongo import MongoClient
import textwrap
import Tokenizer

load_dotenv(find_dotenv())

base_form=[]

connection_string = os.environ.get("DB_URI")
client = MongoClient(connection_string)
test_db = client.test
dictionary = test_db.dictionary
suffixes = test_db.suffixes



example_words = Tokenizer.sentences_tokens_sin

def suffixes_exact_matching(word):
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
    word_size = len(base_word) 
    if word_size < len(word):
        splited_words = textwrap.wrap(word,word_size)
        suffix_english = suffixes_exact_matching(splited_words[1])
        base_form.append(suffix_english)
    englis_word = fuzzy_english_matching(base_word) 
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

for i in Tokenizer.sentences_tokens_eng:
    base_form.append(i)

for i in Tokenizer.names:
    base_form.append(i)


listToStr = ' '.join([str(elem) for elem in base_form])
print(listToStr)



