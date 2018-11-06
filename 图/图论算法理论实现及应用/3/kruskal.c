#include "UFset.c"
struct Edge{
	int u;
	int v;
	int w;
	int flag;
};

int main(){
	int e[27] = {
		1, 6, 10,
		3, 4, 12,
		2, 7, 14,
		2, 3, 16,
		4, 7, 18,
		4, 5, 22,
		5, 7, 24,
		5, 6, 25,
		1, 2, 28
		};
		
	Edge ed[9];
	for(int i = 0; i < 9; i++){
		ed[i].u = e[3*i];
		ed[i].v = e[3*i + 1];
		ed[i].w = e[3*i + 2];
		ed[i].flag = 1;
	}
	
	UFSet set0;
	set0.n = 7;
	UFSet* set = &set0;
	initUFSet(set);
	
	Edge e0;
	for(int i = 0; i < 9; i++){
		for(int j = 0; j < i; j++){
			if(ed[i].w < ed[j].w){
				e0 = ed[i];
				ed[i] = ed[j];
				ed[j] = e0;
			}
		}
	}
	/*
	for(int i = 0; i < 9; i++){
		printf("(%d,%d,%d) ", ed[i].u, ed[i].v, ed[i].w);
	}
	printf("\n");
	*/
	for(int i = 0; i < 9; i++){
		e0 = ed[i];
		if(Find(set, e0.u) != Find(set, e0.v)){
			printf("(%d,%d,%d) ",e0.u,e0.v,e0.w);
			Union(set, e0.u, e0.v);
		}
	}
	
	printf("\n");
	return 0;
}
