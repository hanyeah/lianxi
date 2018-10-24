#include "m.c"

#define X 0
#define A 9 // 1001
#define B 12// 1100
#define C 3 // 0011
#define D 6 // 0110
#define E 10// 1010
#define F 5 // 0101
#define G 13// 1101
#define H 11// 1011
#define I 7 // 0111
#define J 14// 1110
#define K 15//1111

int dir2[4] = {
	8, //1000
	4, //0100
	1, //0001
	2  //0010
};
int dir[4][2] = {{0, -1}, {1, 0}, {-1, 0}, {0, 1}};

//const int m = 2;
//const int n = 2;
//int map[m][n] = {{D, K}, {H, F}};

const int m = 3;
const int n = 3;
int map[m][n] = {{A, D, C}, {F, J, K}, {I, H, E}};

void showBytes(int a){
	printf("%d",(a>>3) & 1);
	printf("%d",(a>>2) & 1);
	printf("%d",(a>>1) & 1);
	printf("%d",(a>>0) & 1);
}

void DFS(int x, int y){
	int c = map[x][y];
	map[x][y] = X;
	printf("(%d,%d) ", x, y);
	for(int i = 0; i < 4; i++){
		int xx = x + dir[i][1];
		int yy = y + dir[i][0];
		if(xx < 0 || xx >= m || yy < 0 || yy >= n){
			continue;
		}
		int c0 = map[xx][yy];
		if(c0 == X){
			continue;
		}
		int d = dir2[i];
		int d0 = dir2[3 - i];
		printf("\n    ");
		showBytes(c);
		printf(" ");
		showBytes(d);
		printf(" ");
		showBytes(c0);
		printf(" ");
		showBytes(d0);
		printf("\n");
		printf("    (%d,%d)->(%d,%d) ",x,y,xx,yy);
		if((c & d) && (c0 & d0)){
			printf("YES\n");
			DFS(xx, yy);
		} else {
			printf("NO\n");
		}
	}
}

int main(){
	int count = 0;
	for(int i = 0; i < m; i++){
		for(int j = 0; j < n; j++){
			if(map[i][j] != X){
				DFS(i, j);
				count++;
				printf("\n");
			}
		}
	}
	printf("水源个数：%d",count);
	return 0;
}
