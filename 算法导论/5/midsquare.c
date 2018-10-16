#include <stdio.h>
#include <math.h>
#define S 2
#define COUNT 100

int main(){
	int x = 1234;
	for(int i = 0; i < COUNT; i++){
		x *= x;
		x = x / (int)(pow(10, S)) % (int)(pow(10, S << 1));
		printf("%d ", x);
	}
	printf("\n");
	return 0;
}
