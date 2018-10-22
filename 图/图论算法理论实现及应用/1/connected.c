#include "m.c"
#define LENGTH(a) (sizeof(a) / sizeof(int))

int isConnected(int* e, int n, int u, int v){
	for(int i = 0; i < n; i+=2){
		int u0 = *(e + i);
		int v0 = *(e + i + 1);
		if(u0 == u){
			if(v0 == v){
				return 1;
			}
			if(isConnected(e, n, v0, v)){
				return 1;
			}
		}
	}
	return 0;
}

int isConnectedGraph(int* e, int* v, int ne, int nv){
	for(int i = 0; i < nv; i++){
		for(int j = i + 1; j < nv; j++){
			if(!isConnected(e, ne, *(v + i), *(v + j))){
				return 0;
			}
		}
	}
	return 1;
}

int main(){
	int v[] = {1, 2, 3, 5};
	int e[] = {1, 2, 1, 3, 2, 3, 2, 5, 3, 5};
	
	printf("%d和%d是连通的:%d\n", 1, 5, isConnected((int *)e, LENGTH(e), 1, 5));
	printf("是连通图：%d\n", isConnectedGraph((int *)e, (int *)v, LENGTH(e), LENGTH(v)));
	return 0;
}
