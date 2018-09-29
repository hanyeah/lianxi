#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#define GET(a,n,i,j) *((float*)a + n*i + j)
#define SET(a,n,i,j,v) *((float*)a + n*i + j) = v

// 输出二维数组
void trace(float **a, int m, int n){
	for(int i = 0; i < m; i++){
		for(int j = 0; j < n; j++){
			// printf("%5d", *((int*)a + n*i + j));
			printf("%5f  ", GET(a, n, i, j));
		}
		printf("\n");
	}
}

float cofactor(float **a, int n, int i, int j);
float det(float **a, int n);

// 代数余子式
float cofactor(float **a, int n, int i, int j){
	if(n == 1){
		return 1;
	}
	int si = ((i + j) & 0x1) == 1 ? -1 : 1;
	int n1 = n - 1;
	float c[n1][n1];
	int ii,jj;
	for(int ic = 0; ic < n1; ic++){
		for(int jc = 0; jc < n1; jc++){
			ii = ic < i ? ic : ic + 1;
			jj = jc < j ? jc : jc + 1;
			c[ic][jc] = GET(a, n, ii, jj);
		}
	}
	float r = det((float **)c, n1);
	return si * r;
}

// 行列式值
float det(float **a, int n){
	if(n == 1){
		return GET(a, n, 0, 0);
	}
	float r = 0;
	float aij;
	float cij;
	for(int i = 0; i < n; i++){
		aij = GET(a, n, i, 0);
		cij = cofactor(a, n, i, 0);
		r += aij * cij;
	}
	return r;
}

int inverse(float **a, int n, float **b){
	float d = det(a, n);
	if(d == 0.0){
		printf("det(A) = 0, 不存在逆矩阵");
		return 0;
	}
	float cji;
	for(int i = 0; i < n; i++){
		for(int j = 0; j < n; j++){
			cji = cofactor(a, n, j, i);
			SET(b, n, i, j, cji/d);
		}
	}
	return 1;
}

void test(float **a, int n){
	printf("=========\n");
	printf("A = \n");
	trace(a, n, n);
	float b[n][n];
	if(inverse(a, n, (float **)b)){
		printf("A' = \n");
		trace((float **)b, n, n);
	}
}

int main(){
	float a[2][2] = {{1.,1.},{0.,1.}};
	float b[2][2] = {{-2.,1.},{4.,-3.}};
	float c[4][4] = {{1.,1.,0.,0.},{1.,1.,1.,0.},{0.,1.,1.,1.},{0.,0.,1.,1.}};
	test((float **)a, 2);
	test((float **)b, 2);
	test((float **)c, 4);
	
	return 0;
}

