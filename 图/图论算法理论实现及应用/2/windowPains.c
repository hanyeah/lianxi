#include "m.c"

struct Edge0{
	int v1;
	int v2;
	int flag;
};

struct Node{
	int id;
	int in;
	int flag;
};

int main(){
	int map[4][4] = {{1,2,3,3},{4,5,6,6},{7,8,9,9},{7,8,9,9}};
	//int map[4][4] = {{1,1,3,3},{4,1,3,3},{7,7,9,9},{7,7,9,9}};
	
	for(int i = 0; i < 4; i++){
		for(int j = 0; j < 4; j++){
			printf("%d ", map[i][j]);
		}
		printf("\n");
	}
	const int n = 40;
	Edge0 ed[n];
	Node nd[9];
	for(int i = 0; i < 9; i++){
		nd[i].id = i + 1;
		nd[i].in = 0;
		nd[i].flag = 0;
	}
	for(int i = 0; i < n; i++){
		ed[i].v1 = 0;
		ed[i].v2 = 0;
		ed[i].flag = 0;
	}
	int f[6] = {0, -1, -1, 0, -1, -1};
	int ii,jj;
	int pt = 0;
	for(int i = 0; i < 4; i++){
		for(int j = 0; j < 4; j++){
			for(int k = 0; k < 6; k +=2){
				ii = i + f[k];
				jj = j + f[k+1];
				int c = map[i][j];
				if(ii >=0 && ii < 4 && jj >= 0 && jj < 4){
					int d = map[ii][jj];
					if(d!=c){
						ed[pt].v1 = c;
						ed[pt].v2 = d;
						ed[pt].flag = 1;
						pt++;
					}
				}
			}
		}
	}
	for(int i = 0; i < pt; i++){
		printf("(%d,%d) ",ed[i].v1,ed[i].v2);
		int id = ed[i].v2 - 1;
		nd[id].in++;
		nd[id].flag = 1;
		nd[ed[i].v1 - 1].flag = 1;
	};
	printf("\n");
	int m = 0;
	while(1){
		int ind = -1;
		for(int i = 0; i < 9; i++){
			if(nd[i].flag && nd[i].in == 0){
				ind = nd[i].id;
				nd[i].flag = 0;
				m++;
				break;
			}
		}
		if(ind > 0){
			// printf("%d ", ind);
			for(int i = 0; i < pt; i ++){
				if(ed[i].flag){
					if(ed[i].v1 == ind){
						ed[i].flag = 0;
						nd[ed[i].v2 - 1].in--;
					}
				}
			}
		} else {
			break;
		}
	}
	if(m==9){
		printf("These windows are clean\n");
	} else {
		printf("these windows are broken\n");
	}
	printf("\n");
	return 0;
}
