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
