#include "m.c"
#define H 1
#define B 2
#define W 3
#define C 0
#define D 4
int dir[4][2] = {{-1, 0}, {0, 1}, {0, -1}, {1, 0}};

int main(){
	const int m = 5;
	const int n = 6;
	const int l = 4;
	int lp[l] = {4, 1, 4, 2, 3, 2, 3, 1};
	const int k = 3;
	int kp[k] = {2, 3, 3, 3, 3, 4};
	/*
	const int m = 4;
	const int n = 4;
	const int l = 4;
	int lp[l] = {2, 3, 1, 3, 1, 4, 2, 4};
	const int k = 4;
	int kp[k] = {2, 1, 2, 2, 3, 4, 4, 2};
	*/
	
	int map[m][n];
	for(int i = 0; i < m; i++){
		for(int j = 0; j < n; j++){
			map[i][j] = 0;
		}
	}
	
	for(int i = 0; i < 2 * l; i += 2){
		if(i == 0){
			map[lp[i]][lp[i + 1]] = H;
		} else {
			map[lp[i]][lp[i + 1]] = B;
		}
	}
	
	for(int i = 0; i < 2 * k; i += 2){
		map[kp[i]][kp[i + 1]] = W;
	}
	
	return 0;
}
