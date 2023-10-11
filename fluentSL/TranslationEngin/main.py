
from dotenv import load_dotenv,find_dotenv
import os
from pymongo import MongoClient
load_dotenv(find_dotenv())

def db_connection():
    connection_string = os.environ.get("DB_URI")

    client = MongoClient(connection_string)
    return client
    