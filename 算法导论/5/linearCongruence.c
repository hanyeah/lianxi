#include <stdio.h>
#define A 2
#define C 7
#define M 11

int nextRand(int seed){
	return (A * seed + C) %M;
}

int main(){
	int size = M * 3;
	int seed = 8;
	for(int i = 0; i < size; i++){
		seed = nextRand(seed);
		printf("%d ", seed);
	}
	printf("\n");
	return 0;
}
