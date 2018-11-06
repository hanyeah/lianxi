#include "m.c"
#include<stdlib.h>
/*
int n = 6;
int s = 1;
int l = 3;
int sp[2] = {34, 24};
int lp[6] = {2, 22, 4, 15, 19, 32};
int map[36];
*/

int n = 5;
int s = 1;
int l = 1;
int sp[2] = {15, 13};
int lp[2] = {8, 10};
int map[25];

void checkTail(int d, int st, int *a, int s, int* pool, int* ind){
	int hId,tId;
	for(int j = 0; j < s; j++){
		hId = *(a + 2 * j);
		tId = *(a + 2 * j + 1);
		if(d == hId && st < map[tId]){
			map[tId] = st;
			*(pool + *ind) = tId; (*ind)++;
			printf("--push:%d,%d\n", tId, st);
			break;
		}
	}
}

int main(){
	for(int i = 0; i < n * n; i++){
		map[i] = 1000;
	}
	int st = 0;
	int* pool = (int *)malloc(400);
	int ind = 0;
	int* pool2 = (int *)malloc(400);
	int ind2 = 0;
	*(pool + ind) = -1; ind++;
	int* temp;
	while(1){
		st++;
		printf("------------------------\n");
		while(ind){
			ind--;
			for(int i = 1; i <= 6; i++){
				int c = *(pool + ind);
				int d = i + c;
				if(st < map[d]){
					map[d] = st;
					*(pool2 + ind2) = d; ind2++;
					printf("push:%d,%d\n", d, st);
				}
				checkTail(d, st, (int*)sp, s, pool2, &ind2);
				checkTail(d, st, (int*)lp, l, pool2, &ind2);
			}
		}
		temp = pool;
		pool = pool2;
		pool2 = temp;
		ind = ind2;
		ind2 = 0;
		if(map[n * n - 1] < 1000){
			break;
		}
		if(ind<=0){
			break;
		}
		trace((int *)map, n*n);
		//break;
	}
	trace((int *)map, n*n);
	printf("%d\n",map[n * n - 1]);
	free(pool);
	free(pool2);
	return 0;
}
