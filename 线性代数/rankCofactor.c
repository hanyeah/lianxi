#include <stdio.h>
#include <math.h>
#include <stdlib.h>
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

int cofactor(int **a, int n, int i, int j);
int rank(int **a, int n);

// 代数余子式
int cofactor(int **a, int n, int i, int j){
	if(n == 1){
		return 1;
	}
	int si = ((i + j) & 0x1) == 1 ? -1 : 1;
	int n1 = n - 1;
	int c[n1][n1];
	int ii,jj;
	for(int ic = 0; ic < n1; ic++){
		for(int jc = 0; jc < n1; jc++){
			ii = ic < i ? ic : ic + 1;
			jj = jc < j ? jc : jc + 1;
			c[ic][jc] = GET(a, n, ii, jj);
		}
	}
	int r = rank((int **)c, n1);
	return si * r;
}

// 秩
int rank(int **a, int n){
	if(n == 1){
		return GET(a, n, 0, 0);
	}
	int r = 0;
	int aij;
	int cij;
	for(int i = 0; i < n; i++){
		aij = GET(a, n, i, 0);
		cij = cofactor(a, n, i, 0);
		r += aij * cij;
	}
	return r;
}

void test01(){
	int n = 4;
	int a[4][4] = {{1,1,0,0},{1,1,1,0},{0,1,1,1},{0,0,1,1}};
	int r = rank((int **)a, n);
	printf("A = \n");
	trace((int **)a, n, n);
	printf("Rank(A) = %d", r);
}

void test(int n){
	int a[n][n];
	for(int i = 0;i < n; i++){
		for(int j = 0; j < n; j++){
			if(abs(i - j) <= 1){
				a[i][j] = 1;
			} else {
				a[i][j] = 0;
			}
		}
	}
	int r = rank((int **)a, n);
	printf("A = \n");
	trace((int **)a, n, n);
	printf("Rank(A) = %d\n", r);
}

int main(){
	for(int i = 1; i <= 6; i++){
		test(i);
	}
	return 0;
}
