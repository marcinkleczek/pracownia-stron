#!/usr/bin/python3

NUM_BYTES = 12345

def main(): 
    file = open('maze.bin', 'r')
    body = file.read()
    file.close()
    file_len = len(body)
    j = 0

    prev = 0
    for lenn in range(20, 60):
        CLOCK = NUM_BYTES // lenn
        print("\n" + str(CLOCK), end = " ")

        decoded = ""
        for num in range(0, 50):
            if num * CLOCK < file_len:
                decoded += body[num * CLOCK]

        if "flag" in decoded:
            print(decoded, end = "")


if __name__ == '__main__':
    main()
