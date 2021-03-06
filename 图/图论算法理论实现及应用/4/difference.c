#include <stdio.h>
#define INF 100000
struct Edge{
	int u,v,w;
};

const int n = 6;
const int m = 13;
const int m3 = 39;
int e[m3] = {
	1, 2, 0,
	1, 5, -1,
	2, 5, 1,
	3, 1, 5,
	4, 1, 4,
	4, 3, -1,
	5, 3, -3,
	5, 4, -3,
	1, 0, 0,
	2, 0, 0,
	3, 0, 0,
	4, 0, 0,
	5, 0, 0
};
Edge edge[m3];
int dist[n];
int path[n];

int Bellman(int v0){
	for(int i = 0; i < n; i++){
		dist[i] = INF;
		path[i] = -1;
	}
	dist[v0] = 0;
	for(int k = 1; k < n; k++){// 从dist[1][u]递推出dist[2][u],...,dist[n-1][u]
		for(int i = 0; i < m; i++){// m为边的数目，即edges数组中元素的个数
			if(dist[edge[i].u]!=INF && edge[i].w + dist[edge[i].u] < dist[edge[i].v]){
				dist[edge[i].v] = edge[i].w + dist[edge[i].u];
				path[edge[i].v] = edge[i].u;
			}
		}
	}
	
	for(int i = 0; i < m; i++){
		if(dist[edge[i].u]!=INF && edge[i].w + dist[edge[i].u] < dist[edge[i].v]){
			return 0;// 存在从源点可达的负权值回路
		}
	}
	return 1;// 不存在从源点可达的负权值回路
}

int main(){
	for(int i = 0; i < m; i++){
		edge[i].v = e[3 * i];
		edge[i].u = e[3 * i + 1];
		edge[i].w = e[3 * i + 2];
	}
	
	int r = Bellman(0);
	if(!r){
		printf("存在从源点可达的负权值回路\n");
		return 0;
	}
	
	int shortest[100];
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
