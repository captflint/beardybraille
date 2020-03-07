errors = {
        0: 'No errors',
        1: 'Invalid index',
        2: 'No more room in line',
        3: 'Index must be an int',
        }

bascii = " A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)="

class braillecell:

    def __init__(self, value):
        if type(value) == int:
            self.setfromint(value)
        elif type(value) == list:
            self.setfromlist(value)
        elif type(value) == str:
            if len(value) == 1:
                value = ord(value)
            else:
                raise ValueError
            if value < 0x2800:
                self.setfromascii(value)
            else:
                self.setfromunicode(value)
        else:
            raise TypeError

    def setfromint(self, value):
        if value >= 64:
            raise ValueError
        elif value < 0:
            raise ValueError
        else:
            self.brailleint = value

    def setfromlist(self, value):
        dotnums = []
        for i in range(1, 7):
            if i in value:
                dotnums.append(i)
        self.brailleint = sum(map(lambda x: 2**(x-1), dotnums))

    def setfromascii(self, value):
        if chr(value) in bascii:
            self.brailleint = bascii.index(chr(value))
        else:
            raise ValueError

    def setfromunicode(self, value):
        if (value < 0x2840) and (value >= 0x2800):
            self.brailleint = value - 0x2800
        else:
            raise ValueError

    def __str__(self):
        return chr(0x2800 + self.brailleint)

    def __repr__(self):
        return f'{self.__class__.__name__}({self.brailleint})'

    def ascii(self):
        return bascii[self.brailleint]

class brailleline:

    def __init__(self, value, width=40):
        if type(width) != int:
            raise TypeError
        if width <= 0:
            raise ValueError
        self.width = width
        if type(value) != str:
            raise TypeError
        if len(value) > width:
            raise ValueError
        self.content = []
        for cell in value:
            self.content.append(braillecell(cell))

    def validateindex(self, i):
        if type(i) != int:
            return 3
        if len(self.content) >= self.width:
            return 2
        if i < 0:
            return 1
        return 0

    def insert(self, i, value):
        if error := self.validateindex(i):
            return error
        if i > len(self.content):
            return 1
        self.content.insert(i, braillecell(value))
        return 0

    def delete(self, i):
        if error := self.validateindex(i):
            return error
        del self.content[i]
        return 0

    def __str__(self):
        rstr = ''
        for cell in self.content:
            rstr += str(cell)
        return rstr

    def ascii(self):
        rstr = ''
        for cell in self.content:
            rstr += cell.ascii()
        return rstr

    def __repr__(self):
        return f'a braile line of width {self.width} containing {len(self.content)} braille cells.'
