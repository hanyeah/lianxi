#include "m.c"
#define LENGTH(a) (sizeof(a) / sizeof(int))
#define GET(a,n,i,j) *((int*)a + n*i + j)

int isInE(int* e, int n, int u, int v){
	for(int i = 0; i < n; i+=2){
		if(*(e + i) == u && *(e + i + 1) == v){
			return 1;
		}
		if(*(e + i) == v && *(e + i + 1) == u){
			return 1;
		}
	}
	return 0;
}

void trace(int** a, int m, int n){
	for(int i = 0; i < m; i++){
		for(int j = 0; j < n; j++){
			printf("%d ",GET(a, n, i, j));
		}
		printf("\n");
	}
}

int main(){
	int v[] = {1, 2, 3, 5};
	int e[] = {1, 2, 1, 3, 2, 3, 2, 5, 3, 5};
	
	int n = LENGTH(v);
	int m = LENGTH(e);
	int edge[n][n];
	for(int i = 0; i < n; i++){
		for(int j = 0; j < n; j++){
			edge[i][j] = isInE((int *)e, m, v[i], v[j]);
		}
	}
	
	trace((int **)edge, n, n);
	return 0;
}
