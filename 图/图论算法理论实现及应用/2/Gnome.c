#include "m.c"

// https://blog.csdn.net/PosPro/article/details/51405318
// http://acm.zju.edu.cn/onlinejudge/showProblem.do?problemCode=1008
// https://wiki.gnome.org/Apps/Tetravex
int dir[4][2] = {{0, -1}, {1, 0}, {0, 1}, {-1, 0}};

const int n = 2;
const int t = 4;
int map[4][4] = {{5, 9, 1, 4}, {4, 4, 5, 6}, {6, 8, 5, 4}, {0, 4, 4, 3}};
//int map[4][4] = {{1, 1, 1, 1}, {2, 2, 2, 2}, {3, 3, 3, 3}, {4, 4, 4, 4}}; 
int mark[4] = {0, 0, 0, 0};
int map2[2][2] = {{-1, -1}, {-1, -1}};

int canPut(int x, int y, int id){
	int* mi = map[id];
	for(int j = 0; j < 4; j++){
		int xx = x + dir[j][1];
		int yy = y + dir[j][0];
		if(xx < 0 || xx >= n || yy < 0 || yy >= n){
			continue;
		}
		int nid = map2[xx][yy];
		if(~nid){
			int* cm = map[nid];
			if(*(mi+j) != *(cm + ((j + 2) % 4))){
				return 0;
			}
		}
	}
	return 1;
}

int gnome(int crt){
	if(crt == t){
		return 1;
	}
	int x = crt / n;
	int y = crt % n;
	for(int i = 0; i < t; i++){
		if(mark[i]){
			// 块已经用过了
			continue;
		}
		int* mi = map[i];
		if(canPut(x, y, i)){
			mark[i] = 1;
			map2[x][y] = i;
			if(gnome(crt + 1)){
				return 1;
			}
			mark[i] = 0;
			map2[x][y] = -1;
		}
	}
	return 0;
}

int main(){
	int a = gnome(0);
	if(a){
		printf("Possible\n");
	} else {
		printf("Impossible\n");
	}
	return 0;
}
