from curses import wrapper

a = 0
b = 0

def main(stdscr):
    global a, b
    a = stdscr.getkey()

wrapper(main)
print(a)
