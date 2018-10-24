#include "m.c"
#include <stdio.h>
#include <math.h>
#define S 1
#define X 2
#define C 3
#define D 4

int dir[4][2] = {{-1, 0}, {0, 1}, {0, -1}, {1, 0}};
int escape = 0;
int di;
int dj;
int si;
int sj;

// 测试数据1
//const int n = 3;
//const int m = 4;
//int t = 5;
//int map[n][m] = {{S, C, C, C}, {C, X, C, X},{C, C, C, D}};

// 测试数据2
const int n = 4;
const int m = 4;
int t = 8;
int map[n][m] = {{C, X, C, X}, {C, C, S, C}, {C, C, C, C}, {D, X, C, X}};

// 测试数据3
//const int n = 4;
//const int m = 4;
//int t = 5;
//int map[n][m] = {{S, C, X, C}, {C, C, X, C}, {C, C, X, D}, {C, C, C, C}};

void dfs(int si, int sj, int cnt){
	printf("%d,%d,%d\n",si,sj,cnt);
	if(si >= n || sj >= m || si < 0 || sj < 0){
		// 边界
		return;
	}
	if(si == di && sj == dj && cnt == t){
		// 成功逃脱
		escape = 1;
		return;
	}
	// 如果temp < 0或者temp为奇数，那就不可能到达
	// 搜索过程中的剪枝
	int temp = (t - cnt) - (int)fabs(si - di) - (int)fabs(sj - dj);
	if(temp < 0 || temp % 2){
		return;
	}
	//
	for(int i = 0; i < 4; i++){
		int ii = si + dir[i][0];
		int jj = sj + dir[i][1];
		if(map[ii][jj] != X){
			map[ii][jj] = X;
			dfs(ii, jj, cnt + 1);
			if(escape){
				return;
			}
			map[ii][jj] = C;
		}
	}
	return;
}

int main(){
	printf("hello bone\n");
	trace((int **)map, n, m);
	int wall = 0;
	for(int i = 0; i < n; i++){
		for(int j = 0; j < m; j++){
			if(map[i][j] == S){
				si = i;
				sj = j;
			} else if(map[i][j]==D){
				di = i;
				dj = j;
			} else if(map[i][j]==X){
				wall++;
			}
		}
	}
	// 搜索前剪枝
	if(n * m - wall <= t){
		printf("NO\n");
	} else {
		map[si][sj] = X;
		dfs(si, sj, 0);
		if(escape){
			printf("YES\n");
		} else {
			printf("NO\n");
		}
	}
	
	return 0;
}
