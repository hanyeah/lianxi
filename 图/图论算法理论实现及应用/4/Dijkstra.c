#include <stdio.h>
#define INF 1000
	
	int n = 6;
	int m = 9;
	int e[27] = {
		0, 2, 5,
		0, 3, 30,
		1, 0, 2,
		1, 4, 8,
		2, 5, 7,
		2, 1, 15,
		4, 3, 4,
		5, 3, 10,
		5, 4, 18
	};
	
	int edge[6][6];
	int s[6];
	int dist[6];
	int path[6];
	
void Dijkstra(int v0){
	for(int i = 0; i < n; i++){
		dist[i] = edge[v0][i];
		s[i] = 0;
		if(i!=v0&&dist[i]<INF){
			path[i] = v0;
		} else {
			path[i] = -1;
		}
	}
	s[v0] = 1;
	dist[v0] = 0;
	for(int i = 0; i < n -1; i ++){
		int min = INF,u=v0;
		// 选择当前集合T中具有最短路径的顶点U
		for(int j = 0; j < n; j++){
			if(!s[j] && dist[j] < min){
				u = j;
				min = dist[j];
			}
		}
		//将U加入到集合S，表示它的最短路径已求得
		s[u] = 1;
		//修改T集合中顶点的dist和path数组元素值
		for(int k = 0; k < n; k++){
			if(!s[k] && edge[u][k] < INF && dist[u] + edge[u][k] < dist[k]){
				dist[k] = dist[u] + edge[u][k];
				path[k] = u;
			}
		}
	}
}

int main(){
	
	for(int i = 0; i < n; i++){
		for(int j = 0; j < n; j++){
			edge[i][j] = INF;
		}
	}
	
	for(int i = 0; i < 27; i+=3){
		edge[e[i]][e[i+1]] = e[i+2];
	}
	
	Dijkstra(0);
	int shortest[6];
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
