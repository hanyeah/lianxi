#include <stdio.h>
struct Vertex {int id, degree;};
struct Edge {Vertex v1, v2;};
struct Graph {Vertex* V; Edge* E;};

#define LENGTH(a) (sizeof(a) / sizeof(int))
#define GET(a,n,i,j) *((int*)a + n*i + j)

void trace(int* s, int n){
	for(int i = 0; i < n; i++){
		printf("%d ", *(s + i));
	}
	printf("\n");
}

void trace(Vertex* v, int n){
	for(int i = 0; i < n; i++){
		printf("{id: %d, degree: %d} ", (*(v + i)).id, (*(v + i)).degree);
	}
	printf("\n");
}

void trace(Edge* E, int n){
	for(int i = 0; i < n; i++){
		printf("(%d,%d) ", (*(E + i)).v1.id, (*(E + i)).v2.id);
	}
	printf("\n");
}

void trace(int** a, int m, int n){
	for(int i = 0; i < m; i++){
		for(int j = 0; j < n; j++){
			printf("%d ",GET(a, n, i, j));
		}
		printf("\n");
	}
}

void swap(Vertex* v, int i, int j){
	Vertex temp = *(v + i);
	*(v + i) = *(v + j);
	*(v + j) = temp;
}

void swap(int* v, int i, int j){
	int temp = *(v + i);
	*(v + i) = *(v + j);
	*(v + j) = temp;
}

void sort(Vertex* v, int n){
	for(int i = 0; i < n; i++){
		for(int j = 0; j < i; j ++){
			if((*(v + i)).degree > (*(v + j)).degree){
				swap(v, i, j);
			}
		}
	}
}
