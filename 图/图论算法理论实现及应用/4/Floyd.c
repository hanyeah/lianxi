#include <stdio.h>
#define INF 100000

int n = 4;
int e[24] = {
	0, 1, 1,
	0, 3, 4,
	1, 2, 9,
	1, 3, 2,
	2, 0, 3,
	2, 1, 5,
	2, 3, 8,
	3, 2, 6
};

int edge[4][4];
int a[4][4];
int path[4][4];

void Floyd(){
	for(int i = 0; i < n; i++){
		for(int j = 0; j < n; j++){
			a[i][j] = edge[i][j];
			if(i!=j&&a[i][j]<INF){
				path[i][j] = i;
			} else {
				path[i][j] = -1;
			}
		}
	}
	for(int k = 0; k < n; k++){
		for(int i = 0; i < n; i++){
			for(int j = 0; j < n; j++){
				if(k==i||k==j)continue;
				if(a[i][k] + a[k][j] < a[i][j]){
					a[i][j] = a[i][k] + a[k][j];
					path[i][j] = path[k][j];
				}
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
	for(int i = 0; i < 24; i+=3){
		edge[e[i]][e[i+1]] = e[i+2];
	}
	
	Floyd();
	
	int shortest[4];
	for(int i = 0; i < n; i++){
		for(int j = 0; j < n; j++){
			if(i==j)continue;
			printf("%d=>%d\t%d\t", i, j, a[i][j]);
			int k = 0;
			shortest[k] = j;
			while(path[i][shortest[k]]!=i){
				shortest[k+1] = path[i][shortest[k]];
				k++;
			}
			k++;
			shortest[k] = i;
			for(int t = k; t > 0; t--){
				printf("%d→",shortest[t]);
			}
			printf("%d\n",shortest[0]);
		}
	}
	
	return 0;
}
