#include <stdlib.h>
#include "m.c"

void sort(int* a, int n, int k){
	for(int i = k; i < n; i++){
		for(int j = i + 1; j < n; j++){
			if(*(a + i) < *(a + j)){
				swap(a, i, j);
			}
		}
	}
}

void frogs(int *s, int n){
	int flag = 1;
	int e[n][n];
	for(int i = 0; i< n; i++){
		for(int j = 0; j < n; j++){
			e[i][j] = 0;
		}
	}
	for(int i = 0; i < n && flag; i++){
		sort((int*)s, n, i);
		printf("排序：");
		trace((int*)s, n);
		int d1 = *(s + i);
		if(d1 > n - i - 1){
			flag = 0;
		}
		for(int j = 1; j <= d1 && flag; j++){
			if(*(s + i + j) <= 0){
				flag = 0;
			}
			(*(s + i + j))--;
			e[i][j] = e[j][i] = 1;
		}
	}
	if(flag){
		printf("YES\n");
		trace((int **)e, n, n);
	} else {
		printf("NO\n");
	}
}

int main(){
	int n = 7;
	int s[] = {4, 3, 1, 5, 4, 2, 1};
	int n2 = 6;
	int s2[] = {4, 3, 1, 4, 2, 0};
	frogs((int*)s, n);
	frogs((int*)s2, n2);
	return	0;
}
