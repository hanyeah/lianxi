#include <stdio.h>
#include "UFset.c"

struct Edge{
	int u,v,w;
	int equal;
	int used;
	int del;
};
	
	int m = 7;
	int n = 10;
	int e[30] = {
		1, 2, 28,
		1, 4, 22,
		1, 6, 10,
		2, 3, 16,
		2, 7, 14,
		3, 4, 12,
		4, 5, 22,
		4, 7, 18,
		5, 6, 25,
		5, 7, 24
	};
	/*
	int m = 7;
	int n = 12;
	int e[36] = {
		1, 2, 6,
		1, 6, 6,
		1, 7, 6,
		2, 3, 2,
		2, 7, 3,
		3, 4, 3,
		3, 7, 2,
		4, 5, 1,
		4, 7, 4,
		5, 6, 8,
		5, 7, 3,
		6, 7, 7
	};
	*/

Edge edges[100];
int first = 1;

Edge e0;
	
int kruskal(){
	int sumWeight = 0, num = 0;
	int u,v;
	UFSet set0;
	UFSet* set = &set0;
	set0.n = m;
	initUFSet(set);
	for(int i = 0; i < n; i++){
		e0 = edges[i];
		if(edges[i].del == 1){
			continue;
		}
		u = edges[i].u;
		v = edges[i].v;
		if(Find(set, u) != Find(set, v)){
			sumWeight += edges[i].w;
			num++;
			Union(set, u, v);
			if(first){
				edges[i].used = 1;
			}
		}
		if(num>=n-1){
			break;
		}
	}
	return sumWeight;
}

int main(){
	for(int i = 0; i < n; i++){
		edges[i].u = e[3 * i];
		edges[i].v = e[3 * i + 1];
		edges[i].w = e[3 * i + 2];
		edges[i].equal = 0;
		edges[i].used = 0;
		edges[i].del = 0;
	}
	// 标记权值相同的边
	for(int i = 0; i < n; i++){
		for(int j = 0; j < n; j++){
			if(i == j)continue;
			if(edges[i].w == edges[j].w){
				edges[i].equal = 1;
				edges[j].equal = 1;
			}
		}
	}
	// 按权值排序
	for(int i = 0; i < n; i++){
		for(int j = 0; j < n; j++){
			if(edges[i].w < edges[j].w){
				e0 = edges[i];
				edges[i] = edges[j];
				edges[j] = e0;
			}
		}
	}
	first = 1;
	int weight1 = kruskal();
	first = 0;
	int weight2, i;
	for(i = 0; i < n; i++){
		if(edges[i].used && edges[i].equal){
			edges[i].del = 1;
			weight2 = kruskal();
			if(weight2 == weight1){
				printf("Not Unique!\n");
				break;
			}
			edges[i].del = 0;
		}
	}
	if(i>=n){
		printf("%d\n",weight1);
	}
	
	return 0;
}
