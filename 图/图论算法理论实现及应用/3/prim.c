#include <stdio.h>
#define INFINITY 10000

int main(){
	int e[27] = {
		1, 6, 10,
		3, 4, 12,
		2, 7, 14,
		2, 3, 16,
		4, 7, 18,
		4, 5, 22,
		5, 7, 24,
		5, 6, 25,
		1, 2, 28
		};
	int map[8][8];
	for(int i = 1; i <= 7; i++){
		for(int j = 1; j <= 7; j++){
			map[i][j] = INFINITY;
		}
	}
	
	for(int i = 0; i < 27; i+=3){
		map[e[i]][e[i+1]] = e[i+2];
		map[e[i+1]][e[i]] = e[i+2];
	}
	
	int u0 = 1;
	int n = 7;
	// prim
	int sumweight = 0;
	int lowcost[8];
	int nearvex[8];
	for(int i = 1; i <= n; i++){
		lowcost[i] = map[u0][i];
		nearvex[i] = u0;
	}
	nearvex[u0] = -1;
	for(int i = 1; i < n; i++){
		int min = INFINITY;
		int v = -1;
		for(int j = 1; j <= n; j++){
			if(nearvex[j]!=-1 && lowcost[j] < min){
				v = j;
				min = lowcost[j];
			}
		}
		if(v!=-1){
			printf("(%d,%d,%d) ", nearvex[v], v, lowcost[v]);
			nearvex[v] = -1;
			sumweight += lowcost[v];
			for(int j = 1; j <= n; j++){
				if(nearvex[j]!=-1 && map[v][j] < lowcost[j]){
					lowcost[j] = map[v][j];
					nearvex[j] = v;
				}
			}
		}
	}
	printf("\n");
	printf("weight of MST is %d\n",sumweight);
	return 0;
}
