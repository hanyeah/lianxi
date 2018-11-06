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
	/*
	int map[m][n] = {	{W,R,W,W,W,W,W,R},
						{W,R,A,W,R,R,F,R},
						{W,R,R,W,X,R,R,R},
						{R,R,W,R,R,W,R,W},
						{W,R,R,R,W,W,R,R},
						{R,W,R,R,R,R,R,R},
						{R,R,R,R,R,R,R,R}
						};
	*/
	
	int map[m][n] = {	{W,R,W,W,W,W,W,R},
						{W,A,R,W,X,F,R,R},
						{W,R,X,W,X,X,R,R},
						{R,R,X,X,X,X,R,W},
						{W,R,R,R,R,R,R,R},
						{R,W,R,R,R,R,R,R},
						{R,R,R,R,R,R,R,R}
						};
	
	int dir[4][2] = {{-1, 0}, {0, 1}, {0, -1}, {1, 0}};
	int si,sj,ai,aj;
	int w[m][n];
	int step[m][n];
	for(int i = 0; i < m; i++){
		for(int j = 0; j < n; j++){
			if(map[i][j] == F){
				si = i;
				sj = j;
			}
			if(map[i][j] == A){
				ai = i;
				aj = j;
			}
			w[i][j] = INF;
			step[i][j] = 0;
		}
	}
	printf("map:\n");
	trace((int **)map, m, n);
	printf("Angel朋友的位置：(%d,%d)\n",si,sj);
	map[si][sj] = 0;
	w[si][sj] = 0;
	int pool[200];
	int ind = 0;
	//push
	pool[ind++] = si;
	pool[ind++] = sj;
	//
	int ci,cj,ni,nj,st;
	while(1){
		// pop
		cj = pool[--ind];
		ci = pool[--ind];
		st = step[ci][cj];
		int cv = w[ci][cj];
		for(int i = 0; i < 4; i++){
			ni = ci + dir[i][0];
			nj = cj + dir[i][1];
			if(ni < 0 || ni >= m || nj < 0 || nj >= n){
				continue;
			}
			int va = map[ni][nj];
			if(va == A){
				va = 1;
			}
			// printf("(%d,%d):%d,%d\n",ni,nj, cv, va);
			if(cv + va < w[ni][nj]){
				w[ni][nj] = cv + va;
				pool[ind++] = ni;
				pool[ind++] = nj;
				step[ni][nj] = st+1;
			}
		}
		if(ind <= 0){
			break;
		}
	}
	printf("时间数组：\n");
	trace((int **)w, m, n);
	printf("步数数组：\n");
	trace((int **)step, m, n);
	if(w[ai][aj] >= INF){
		printf("poor Angel has to stay in the prison all his life.");
	} else{
		printf("需要走%d步，需要时间：%d\n",step[ai][aj], w[ai][aj]);
	}
	
	return 0;
}
