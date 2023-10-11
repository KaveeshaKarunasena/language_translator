import sys
import nltk
from nltk.stem import WordNetLemmatizer


wnl = WordNetLemmatizer()

example_words = ["what","do","you","call","exam"]

print("{0:20}{1:20}".format("--Word--","--Lemma--"))
for word in example_words:
   print ("{0:20}{1:20}".format(word, wnl.lemmatize(word, pos="v")))