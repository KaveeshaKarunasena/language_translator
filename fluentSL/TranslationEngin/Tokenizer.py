import os
import nltk
nltk.download('punkt')
from nltk.tokenize import word_tokenize

str = "Apita het school ek exame ekk thiyenwa"

AI_token = word_tokenize(str)
print(AI_token)

