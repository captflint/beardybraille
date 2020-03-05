# takes a list of dot numbers and returns a unicode
# braille character
dotnums2braille = lambda x: chr(0x2800 + sum(map(lambda y: 2**(y-1), x)))

print(dotnums2braille([4,3,5]))
