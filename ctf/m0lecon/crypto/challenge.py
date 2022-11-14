# The following imports are from the pycryptodome library
from Crypto.Util.number import isPrime, bytes_to_long, long_to_bytes
from functools import reduce
import random
import os
import base64


flag = os.getenv('FLAG', 'ptm{fake_flag}')

# Stolen from internet
def mod_inverse(x,y):

	# See: http://en.wikipedia.org/wiki/Extended_Euclidean_algorithm
	def eea(a,b):
		if b==0:return (1,0)
		(q,r) = (a//b,a%b)
		(s,t) = eea(b,r)
		return (t, s-(q*t) )

	inv = eea(x,y)[0]
	if inv < 1: inv += y #we only want positive values
	return inv

def getPrime() -> int:
    # Magic function to get 256 bits or more prime
    while True:
        p = random.randint(2, 2**16)
        # print("P:::",p)
        ds = [int(d) for d in str(p)]
        r = reduce(lambda x, y: x * y, ds)
        print("r", r)
        # print(2**256)

        if r in [1, 0]:
            continue


        while not isPrime(r) or r <= 2**256:
            r = r * 2 - 1
        # print(r)
        return r


if __name__ == '__main__':
    # p, q = getPrime(), getPrime()

    orgN = 19947485316056905993931646775941987256548403731465180084945508247185642344122444186584301925382000751483279209250816790912519050540122026105676356199286065255875041514980612323221784967308146326689205858291964161149849179979371164314385332438988323302642256355694342283417841306799868619347413738695017860092178971579146235735267010603291619706159760367889906915448176629836688823504117353814051485333797705641462699567204450801352179713
    result = 3378835538025100066858189605253385186193182606568947285413151320702836498308597573504106146927194477658866999634334567520784696503261127472226506671872322090990356345087228892030181029727782257077045419267662772484081883662849307300946673299443737643159198620964876221768731320724777961634357841823079813297467591107634823086591388724216402913192084061935863891901795120253011313582433207228716480519477417177404112549120051567425697098
    resultStr = b'3378835538025100066858189605253385186193182606568947285413151320702836498308597573504106146927194477658866999634334567520784696503261127472226506671872322090990356345087228892030181029727782257077045419267662772484081883662849307300946673299443737643159198620964876221768731320724777961634357841823079813297467591107634823086591388724216402913192084061935863891901795120253011313582433207228716480519477417177404112549120051567425697098'
    minOrgN = orgN >> 1
    p = 0

    if True:
#         for r0 in range(2, 10000):
#       2240 is real answer
        for r0 in range(2240, 10000):
            startNum = r0
            while (not isPrime(r0) or r0 <= 2 ** 256) and r0 < minOrgN:
                # print(2**256, r0, isPrime(r0))
                r0 = r0 * 2 - 1
            if r0 < orgN:
                if (orgN % r0) == 0:
                    p = r0
                    print("The answer is ", startNum, " (cause ", orgN, " % ", r0, " === ", orgN % r0, ")")
                    break

    # pow
    q = orgN//p
    print("\nP:", p)
    print("Q:", q)

    e = 65537

    N = p*q
    phi = (p-1)*(q-1)

    d = mod_inverse(e, phi)

    deciph = pow(result, d, N)
    print('ciphertext =', deciph)
    print('ciphertext =', str(long_to_bytes(deciph)).encode("utf-8"))
