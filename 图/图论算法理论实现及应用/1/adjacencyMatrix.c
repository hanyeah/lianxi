#include "m.c"

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

int od(int** a, int n, int k){
	int d = 0;
	for(int i = 0; i < n; i++){
		if(GET(a, n, k, i)!=0){
			d ++;
		}
	}
	return d;
}

int id(int** a, int n, int k){
	int d = 0;
	for(int i = 0; i < n; i++){
		if(GET(a, n, i, k)!=0){
			d ++;
		}
	}
	return d;
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
	for(int i = 0; i < n; i++){
		printf("%d的出度：%d\n", i, od((int **)edge, n, i));
		printf("%d的入度：%d\n", i, id((int **)edge, n, i));
	}
	
	return 0;
}
