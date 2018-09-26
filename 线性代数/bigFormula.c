#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#define GET(a,n,i,j) *((int*)a + n*i + j)

// n的阶乘
int factorial(int n){
	int a = 1;
	while(n > 1){
		a *= n--;
	}
	return a;
}

// 交换两个整数
void swap(int *a, int *b){
	int temp;
	temp = *a;
	*a = *b;
	*b = temp;
}

// 全排列(包括逆序数的奇偶)
// 参考：https://www.jianshu.com/p/d4aaee236c8d
//       https://www.cnblogs.com/xianzhedeyu/p/3822946.html
void perm(int *r, int *t, int *a, int k, int n, int d){
	if(k < n){
		for(int i = k; i < n; i++){
			swap(&a[k], &a[i]);
			perm(r, t, a, k + 1, n, (i == k ? 1 : -1) * d);
			swap(&a[k], &a[i]);
		}
	} else {
		for(int i = 0; i < n; i++){
			r[*t] = a[i];
			*t = *t + 1;
		}
		r[*t] = d;
		*t = *t + 1;
	}
}

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

// 输出全排列数组
void trace(int *r, int t, int n){
	int i = 0;
	while(i < t){
		for(int j = 0; j < n; j++){
			printf("%3d", *r++);
		}
		printf("\n");
		i+=n;
	}
}

// 输出一维数组
void trace(int *b, int n){
	for(int i = 0; i < n; i++){
		printf("%3d", b[i]);
	}
	printf("\n");
}

// 求行列式的值
int delt(int **a, int t, int *r, int n){
	int d = 0;
	int i = 0;
	while(i < t){
		int d0 = 1;
		for(int j = 0; j < n; j++){
			d0 = d0 * GET(a, n, j, *r++);
		}
		int a0 = *r++;
		d0 = d0 * a0;
		d += d0;
		i += n + 1;
	}
	return d;
}

void test(int n){
	int t = 0;
	int *r = (int *)malloc(factorial(n + 1)*sizeof(int));
	int a[n][n];
	int b[n];
	for(int i = 0; i < n; i++){
		b[i] = i;
	}
	for(int i = 0;i < n; i++){
		for(int j = 0; j < n; j++){
			if(abs(i - j) <= 1){
				a[i][j] = 1;
			} else {
				a[i][j] = 0;
			}
		}
	}
	printf("A = \n");
	trace((int **)a, n, n);
	// trace(b, n);
	perm(r, &t, b, 0, n, 1);
	// trace(r, t, n+1);
	int d = 0;
	d = delt((int **)a, t, r, n);
	printf("delt(A) = %d\n", d);
	free(r);
}

int main(){
	for(int i = 1; i <= 6; i++){
		test(i);
	}
	return 0;
}
