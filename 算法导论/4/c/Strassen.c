#include <stdio.h>
#define GET(a,n,i,j) *((int*)a + n*i + j)

// 输出二维数组
void trace(int **a, int m, int n){
	for(int i = 0; i < m; i++){
		for(int j = 0; j < n; j++){
			// printf("%5d", *((int*)a + n*i + j));
			printf("%5d", GET(a, n, i, j));
		}
		printf("\n");
	}
}

int main(){
	int A[2][2] = {
		{1, 3},
		{7, 5}
	};
	int B[2][2] = {
		{6, 8},
		{4, 2}
	};
	
	// 普通乘法
	int C[2][2] = {
		{A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]},
		{A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]}
	};
	trace((int **)C, 2, 2);
	
	//
	
}
