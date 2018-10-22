#include "m.c"
#define LENGTH(a) (sizeof(a) / sizeof(int))

int isInE(int* e, int ne, int u, int v){
	for(int i = 0; i < ne; i+=2){
		if(u == *(e + i) && v == *(e + i + 1)){
			return 1;
		}
		if(v == *(e + i) && u == *(e + i + 1)){
			return 1;
		}
	}
	return 0;
}

void vertexInducedSubGraph(int* e, int ne, int* v1, int nv1){
	int e1[ne];
	int k = 0;
	for(int i = 0; i < nv1; i++){
		for(int j = i + 1; j < nv1; j++){
			int u = *(v1 + i);
			int v = *(v1 + j);
			if(isInE(e, ne, u, v)){
				e1[k++] = u;
				e1[k++] = v;
				printf("(%d,%d) ", u, v);
			}
		}
	}
	printf("\n");
}

int main(){
	int v[] = {1, 2, 3, 4, 5};
	int e[] = {1, 3, 2, 3, 2, 5, 3, 4, 3, 5, 4, 5};
	
	int v1[] = {2, 3, 4, 5};
	vertexInducedSubGraph((int *)e, LENGTH(e), (int *)v1, LENGTH(v1));
	return 0;
}
