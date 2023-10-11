from sysconfig import get_python_version
from dotenv import load_dotenv,find_dotenv
import os
import pprint
from pymongo import MongoClient
import English_Stemmer
load_dotenv(find_dotenv())

connection_string = os.environ.get("DB_URI")

client = MongoClient(connection_string)

dbs = client.list_database_names()
test_db = client.test
collection = test_db.test

print(dbs)