#include <stdio.h>
#define INF 100000

int n = 7;
int m = 10;
int e[30] = {
	0, 1, 6,
	0, 2, 5,
	0, 3, 5,
	1, 4, -1,
	2, 1, -2,
	2, 4, 1,
	3, 2, -2,
	3, 5, -1,
	4, 6, 3,
	5, 6, 3
};

int edge[7][7];
int dist[7];
int path[7];

void Bellman(int v0){
	for(int i = 0; i < n; i++){
		dist[i] = edge[v0][i];
		if(i!=v0 && dist[i]<INF){
			path[i] = v0;
		} else {
			path[i] = -1;
		}
	}
	for(int k = 2; k < n; k++){// 从dist[1][u]递推出dist[2][u],...,dist[n-1][u]
		for(int u = 0; u < n; u++){// 修改每个顶点的dist[u]和path[u]
			if(u!=v0){
				for(int j = 0; j < n; j++){// 考虑其他每个顶点
					// 顶点j到顶点u有直接路径，且途经顶点j可以使得dist[u]缩短
					if(edge[j][u]<INF && dist[j] + edge[j][u] < dist[u]){
						dist[u] = dist[j] + edge[j][u];
						path[u] = j;
					}
				}
			}
		}
	}
}
/*
int Bellman(int v0){
	for(int i = 0; i < n; i++){
		dist[i] = edge[v0][i];
		if(i!=v0 && dist[i]<INF){
			path[i] = v0;
		} else {
			path[i] = -1;
		}
	}
	for(int k = 2; k < n; k++){// 从dist[1][u]递推出dist[2][u],...,dist[n-1][u]
		for(int u = 0; u < n; u++){// 修改每个顶点的dist[u]和path[u]
			if(u!=v0){
				for(int j = 0; j < n; j++){// 考虑其他每个顶点
					// 顶点j到顶点u有直接路径，且途经顶点j可以使得dist[u]缩短
					if(edge[j][u]<INF && dist[j] + edge[j][u] < dist[u]){
						dist[u] = dist[j] + edge[j][u];
						path[u] = j;
					}
				}
			}
		}
	}
	//
	for(int i = 0; i < n; i++){
		for(int j = 0; j < n; j++){
			if(edge[i][j]<INF && dist[i] + edge[i][j] < dist[j]){
				return 0;// 存在从源点可达的负权值回路
			}
		}
	}
	return 1;// 不存在从源点可达的负权值回路
}
*/
int main(){
	for(int i = 0; i < n; i++){
		for(int j = 0; j < n; j++){
			edge[i][j] = INF;
		}
	}
	
	for(int i = 0; i < 30; i+=3){
		edge[e[i]][e[i+1]] = e[i+2];
	}
	
	Bellman(0);
	/*
	int r = Bellman(0);
	if(!r){
		printf("存在从源点可达的负权值回路\n");
		return 0;
	}
	*/
	int shortest[7];
	for(int i = 1; i < n; i++){
		printf("%d\t", dist[i]);
		int k = 0;
		shortest[k] = i;
		while(path[shortest[k]] != 0){
			shortest[k+1] = path[shortest[k]];
			k++;
		}
		k++;
		shortest[k] = 0;
		for(int j = k; j > 0; j--){
			printf("%d→",shortest[j]);
		}
		printf("%d\n",shortest[0]);
	}
	
	return 0;
}
