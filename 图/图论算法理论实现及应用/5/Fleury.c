#include <stdio.h>
#define MAXN 200

struct stack{
	int top,node[MAXN];
}s; // 顶点的栈结构

const int n = 9;
const int m = 14;
const int m2 = 28;
int e[m2] = {
	1, 2,
	1, 8,
	2, 3,
	2, 8,
	2, 9,
	3, 4,
	4, 5,
	4, 6,
	4, 9,
	5, 6,
	6, 7,
	6, 9,
	7, 8,
	8, 9
};
int edge[n][n];

void dfs(int x){
	// 深度优先搜索
	int i;
	s.top++;
	s.node[s.top] = x;
	for(i = 0; i < n; i++){
		if(edge[i][x] > 0){
			edge[i][x] = 0;
			edge[x][i] = 0;
			dfs(i);
			break;
		}
	}
}

void Fleury(int x){
	int i,b;
	s.top = 0;
	s.node[s.top] = x;// 入栈
	while(s.top>=0){
		b = 0;
		for(i = 0; i < n; i++){
			if(edge[s.node[s.top]][i]>0){
				b = 1;
				break;
			}
		}
		if(b==0){
			// 如果没有点可以扩展，输出并出栈
			printf("%d->", s.node[s.top]+1);
			s.top--;
		} else {
			// 如果有，就DFS
			s.top--;
			dfs(s.node[s.top+1]);
		}
	}
	printf("\n");
}

int main(){
	int s,t;
	for(int i = 0; i < n; i++){
		for(int j = 0; j < n; j++){
			edge[i][j] = 0;
		}
	}
	for(int i = 0; i < m2; i+= 2){
		s = e[i] - 1;
		t = e[i+1] - 1;
		edge[s][t] = 1;
		edge[t][s] = 1;
	}
	
	int num = 0;
	int start = 0;
	for(int i = 0; i < n; i++){
		int degree = 0;
		for(int j = 0; j < n; j++){
			degree += edge[i][j];
		}
		if(degree % 2 == 1){
			start = i;
			num++;
		}
	}
	
	if(num == 0 || num == 2){
		Fleury(start);
	} else {
		printf("No Euler path\n");
	}
	
	return 0;
}
