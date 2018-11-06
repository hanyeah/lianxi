#include "m.c"

struct Node{
	int id;
	int in;
	int flag;
};

struct Edge0{
	int v1;
	int v2;
	int flag;
};

int main(){
	const int m = 6;
	const int n = 8;
	int e[16] = {1, 2, 1, 4, 2, 6, 3, 2, 3, 6, 5, 1, 5, 2, 5, 6};
	Node no[6];
	Edge0 ed[8];
	for(int i = 0; i < m; i++){
		no[i].id = i + 1;
		no[i].in = 0;
		no[i].flag = 1;
	}
	for(int i = 0; i < n; i++){
		ed[i].v1 = e[2 * i];
		ed[i].v2 = e[2 * i + 1];
		ed[i].flag = 1;
		no[e[2 * i + 1] - 1].in++;
	}
	
	while(1){
		int ind = -1;
		for(int i = 0; i < m; i++){
			if(no[i].flag && no[i].in == 0){
				ind = no[i].id;
				no[i].flag = 0;
				break;
			}
		}
		if(ind > 0){
			printf("%d ", ind);
			for(int i = 0; i < n; i ++){
				if(ed[i].flag){
					if(ed[i].v1 == ind){
						ed[i].flag = 0;
						no[ed[i].v2 - 1].in--;
					}
				}
			}
		} else {
			break;
		}
	}
	printf("\n");
	return 0;
}
