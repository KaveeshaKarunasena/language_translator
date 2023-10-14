import nltk
import re

nltk.download('punkt')

text = ""

sentence_pattern = r'[.?!]'

sentences = re.split(sentence_pattern, text)

sentences_tokens = []

for sentence in sentences:
    words = [word for word in nltk.word_tokenize(sentence) if word.isalnum()]
    sentences_tokens.append(words)

print(sentences_tokens)
