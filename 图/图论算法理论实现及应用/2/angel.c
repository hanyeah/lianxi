#include "m.c"
#define W 1000
#define R 1
#define X 2
#define A -1
#define F 0
#define INF 1000

int main(){
	const int m = 7;
	const int n = 8;
	int map[m][n] = {	{W,R,W,W,W,W,W,R},
						{W,R,A,W,R,R,F,R},
						{W,R,R,W,X,R,R,R},
						{R,R,W,R,R,W,R,W},
						{W,R,R,R,W,W,R,R},
						{R,W,R,R,R,R,R,R},
						{R,R,R,R,R,R,R,R}
						};
	/*
	int map[m][n] = {	{W,R,W,W,W,W,W,R},
						{W,A,R,W,X,F,R,R},
						{W,R,X,W,X,X,R,R},
						{R,R,X,X,X,X,R,W},
						{W,R,R,R,R,R,R,R},
						{R,W,R,R,R,R,R,R},
						{R,R,R,R,R,R,R,R}
						};
						
	*/
	int dir[4][2] = {{-1, 0}, {0, 1}, {0, -1}, {1, 0}};
	int si,sj;
	int w[m][n];
	for(int i = 0; i < m; i++){
		for(int j = 0; j < n; j++){
			if(map[i][j] == F){
				si = i;
				sj = j;
			}
			w[i][j] = INF;
		}
	}
	printf("Angel朋友的位置：(%d,%d)\n",si,sj);
	map[si][sj] = 0;
	int pool[200];
	int ind = 0;
	//push
	pool[ind++] = si;
	pool[ind--] = sj;
	//
	int ci,cj;
	while(1){
		// pop
		ci = pool[--ind];
		cj = pool[--ind];
		for(){
			
		}
		
		
	}
	return 0;
}
