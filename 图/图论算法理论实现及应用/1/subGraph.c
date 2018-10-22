#include "m.c"
#define LENGTH(a) (sizeof(a) / sizeof(int))

int isInV(int* pv, int v, int n){
	for(int i = 0; i < n; i++){
		if(*(pv + i) == v){
			return 1;
		}
	}
	return 0;
}

int isInE(int* pe, int v1, int v2, int n){
	for(int i = 0; i < n; i+=2){
		if(*(pe + i) == v1 && *(pe + i + 1) == v2){
			return 1;	
		}
	}
	return 0;
}

int isSubGraph(int* v1, int* e1, int nv1, int ne1, int* v2, int* e2, int nv2, int ne2){
	for(int i = 0; i < nv2; i++){
		if(!isInV(v1, *(v2 + i), nv1)){
			return 0;
		}
	}
	for(int i = 0; i < ne2; i+=2){
		if(!isInE(e1, *(e2 + i), *(e2 + i + 1), ne1)){
			return 0;
		}
	}
	return 1;
}

int main(){
	int v1[] = {1, 2, 3, 4, 5, 6};
	int e1[] = {1, 2, 1, 3, 2, 3, 2, 4, 2, 5, 2, 6, 3, 4, 3, 5, 4, 5};
	
	int v2[] = {1, 2, 3, 4, 5};
	int e2[] = {1, 2, 1, 3, 2, 3, 2, 4, 2, 5, 3, 4, 3, 5, 4, 5};
	
	int v3[] = {1, 2, 3, 4, 6};
	int e3[] = {1, 2, 1, 3, 2, 3, 2, 6, 3, 4};
	
	int v4[] = {1, 2, 3, 4, 5, 6};
	int e4[] = {1, 2, 1, 3, 2, 5, 2, 6, 3, 4};
	
	int v5[] = {1, 2, 3, 4, 5, 6};
	int e5[] = {1, 2, 1, 3, 2, 5, 2, 6, 3, 4, 5, 6};
	
	printf("2是1的子图：%d\n",isSubGraph((int *)v1, (int *)e1, LENGTH(v1), LENGTH(e1), (int *)v2, (int *)e2, LENGTH(v2), LENGTH(e2)));
	printf("3是1的子图：%d\n",isSubGraph((int *)v1, (int *)e1, LENGTH(v1), LENGTH(e1), (int *)v3, (int *)e3, LENGTH(v3), LENGTH(e3)));
	printf("4是1的子图：%d\n",isSubGraph((int *)v1, (int *)e1, LENGTH(v1), LENGTH(e1), (int *)v4, (int *)e4, LENGTH(v4), LENGTH(e4)));
	printf("5是1的子图：%d\n",isSubGraph((int *)v1, (int *)e1, LENGTH(v1), LENGTH(e1), (int *)v5, (int *)e5, LENGTH(v5), LENGTH(e5)));
	return 0;
}
