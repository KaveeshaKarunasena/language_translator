import sys
import numpy as np
from numpy.linalg import norm
from fuzzywuzzy import fuzz

example_words = ["apita","heta","eakak","thiyenwa","exam"]


n1 = "gedara"
n2 = "gedaraka"

print(fuzz.ratio(n1, n2))


