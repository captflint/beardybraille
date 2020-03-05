# takes a list of dot numbers and returns a unicode
# braille character
def dotnums2braille(dotnums):
    codepoint = 0x2800
    for dotnum in dotnums:
        codepoint += 2 ** (dotnum - 1)
    return(chr(codepoint))

i = 0
s = ''
while i < 64:
    s += chr(0x2800 + i)
    i += 1

print(s)
