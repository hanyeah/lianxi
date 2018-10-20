#include <stdio.h>

void trace(int* s, int n){
	for(int i = 0; i < n; i++){
		printf("%d ", *(s + i));
	}
	printf("\n");
}

void swap(int* s, int i, int j){
	int temp = *(s + i);
	*(s + i) = *(s + j);
	*(s + j) = temp;
}

void sort(int* s, int n){
	for(int i = 0; i < n; i++){
		for(int j = 0; j < i; j ++){
			if(*(s + i) > *(s + j)){
				swap(s, i, j);
			}
		}
	}
}

int havelHakimi(int *s, int n){
	int max = 0;
	for(int i = 0; i < n; i++){
		if(*(s + i) < 0){
			return 0;
		}
		if(*(s + i) > max){
			max = *(s + i);
		}
	}
	if(max == 0){
		return 1;
	}
	sort(s, n);
	printf("排序：");
	trace(s, n);
	int d0 = *s;
	for(int i = 0; i < d0; i++){
		*(s + i) = *(s + i + 1) - 1;
	}
	n = n - 1;
	for(int i = d0; i < n; i++){
		*(s + i) = *(s + i + 1);
	}
	printf("处理：");
	trace(s, n);
	printf("\n");
	return havelHakimi(s, n);
}

int main(){
	// int s[] = {7, 7, 4, 3, 3, 3, 2, 1};
	int s[] = {5, 4, 3, 3, 2, 2, 2, 1, 1, 1};
	int n = sizeof(s) / sizeof(int);
	trace((int *)s, n);
	int b = havelHakimi((int*)s, n);
	if(b){
		printf("可图\n");
	} else {
		printf("不可图\n");
	}
	return 0;
}
