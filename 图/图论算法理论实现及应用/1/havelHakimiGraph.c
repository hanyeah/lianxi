#include <stdio.h>

struct Vertex {int id, degree;};
struct Edge {Vertex v1, v2;};

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

void swap(Vertex* v, int i, int j){
	Vertex temp = *(v + i);
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

int havelHakimiGraph(Vertex* v, int n, Edge* E, int m){
	int max = 0;
	for(int i = 0; i < n; i++){
		if((*(v + i)).degree < 0){
			return 0;
		}
		if((*(v + i)).degree > max){
			max = (*(v + i)).degree;
		}
	}
	if(max == 0){
		return 1;
	}
	sort(v, n);
	Vertex v0 = *v;
	int d0 = v0.degree;
	for(int i = 0; i < d0; i++){
		(*(E + m)).v1 = v0;
		(*(E + m)).v2 = *(v + i + 1);
		m++;
	}
	for(int i = 0; i < d0; i++){
		*(v + i) = *(v + i + 1);
		(*(v + i)).degree--;
	}
	n = n - 1;
	for(int i = d0; i < n; i++){
		*(v + i) = *(v + i + 1);
	}
	return havelHakimiGraph(v, n, E, m);
}

int sum(int* s, int n){
	int a = 0;
	for(int i = 0; i < n; i++){
		a += *(s + i);
	}
	return a;
}

int main(){
	// int s[] = {7, 7, 4, 3, 3, 3, 2, 1};
	int s[] = {5, 4, 3, 3, 2, 2, 2, 1, 1, 1};
	int n = sizeof(s) / sizeof(int);
	trace((int *)s, n);
	// 创建顶点数组
	Vertex v[n];
	for(int i = 0; i < n; i++){
		v[i].id = i;
		v[i].degree = s[i];
	}
	// 创建边的数组
	int m = sum((int *)s, n) / 2; // 计算边的个数
	Edge E[m];
	havelHakimiGraph((Vertex *)v, n, (Edge *)E, 0);
	trace((Edge*)E, m);
	return 0;
}
