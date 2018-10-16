// https://blog.csdn.net/tick_tock97/article/details/78657851

#include <stdint.h>
#include <stdio.h>

// 定义MT19937-32的常数
enum
{
    // 假定 W = 32 (此项省略)
    N = 624,
    M = 397,
    R = 31,
    A = 0x9908B0DF,

    F = 1812433253,

    U = 11,
    // 假定 D = 0xFFFFFFFF (此项省略)

    S = 7,
    B = 0x9D2C5680,

    T = 15,
    C = 0xEFC60000,

    L = 18,

    MASK_LOWER = (1ull << R) - 1,
    MASK_UPPER = (1ull << R)
};

static uint32_t  mt[N];
static uint16_t  index;

// 根据给定的seed初始化旋转链
void Initialize(const uint32_t  seed)
{
    uint32_t  i;
    mt[0] = seed;
    for ( i = 1; i < N; i++ )
    {
        mt[i] = (F * (mt[i - 1] ^ (mt[i - 1] >> 30)) + i);
    }
    index = N;
}

static void Twist()
{
    uint32_t  i, x, xA;
    for ( i = 0; i < N; i++ )
    {
        x = (mt[i] & MASK_UPPER) + (mt[(i + 1) % N] & MASK_LOWER);
        xA = x >> 1;
        if ( x & 0x1 )
        {
            xA ^= A;
        }
        mt[i] = mt[(i + M) % N] ^ xA;
    }

    index = 0;
}

// 产生一个32位随机数
uint32_t ExtractU32()
{
    uint32_t  y;
    int       i = index;
    if ( index >= N )
    {
        Twist();
        i = index;
    }
    y = mt[i];
    index = i + 1;
    y ^= (y >> U);
    y ^= (y << S) & B;
    y ^= (y << T) & C;
    y ^= (y >> L);
    return y;
}


int main(){
	Initialize(1234);
	for(int i = 0; i < 100; i++){
		printf("%u\n",ExtractU32());
	}
	printf("\n");
	return 0;
}
