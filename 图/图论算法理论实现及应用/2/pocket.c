#include "m.c"
#define C 0
#define P 1

int dir[8][2] = {{-1, -1}, {-1, 0}, {-1, 1}, {0, 1}, {1, 1}, {1, 0}, {1, -1}, {0, -1}};

//const int m = 3;
//const int n = 5;
//int map[m][n] = {{C, P, C, P, C}, {C, C, P, C, C}, {C, P, C, P, C}};

const int m = 5;
const int n = 5;
int map[m][n] = {{C, C, C, C, P}, {C, P, P, C, P}, {C, P, C, C, P}, {P, P, P, C, P}, {P, P, C, C, P}};

void DFS(int x, int y){
	map[x][y] = C;
	int i, xx, yy;
	for(i = 0; i < 8; i++){
		xx = x + dir[i][0];
		yy = y + dir[i][1];
		if(xx < 0 || yy < 0 || xx >= m || yy >= n){
			continue;
		}
		if(map[xx][yy] == P){
			DFS(xx, yy);
		}
	}
}

int main(){
	int count = 0;
	for(int i = 0; i < m; i++){
		for(int j = 0; j < n; j++){
			if(map[i][j]==P){
				DFS(i, j);
				count++;
			}
		}
	}
	printf("油田数：%d\n",count);
	return 0;
}
