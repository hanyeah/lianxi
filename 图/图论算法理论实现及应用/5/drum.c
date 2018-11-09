#include <stdio.h>

struct Edge{
	int u;
	int v;
	int w;
	int x;
	int flag;
};
int v[8] = {0, 1, 2, 3, 4, 5, 6, 7};//000, 001, 010, 011, 100, 101, 110, 111
Edge e[16];

void traceBits(int v, int n){
	for(int i = n - 1; i >= 0; i--){
		printf("%d",(v>>i)&1);
	}
	printf(" ");
}

int main(){
	int p = 0;
	for(int i = 0; i < 8; i++){
		e[p].u = v[i];
		e[p].w = 0x0;
		e[p].x = (v[i] << 1) | e[p].w;
		e[p].v = e[p].x & 7;
		e[p].flag = 1;
		p++;
		e[p].u = v[i];
		e[p].w = 0x1;
		e[p].x = (v[i] << 1) | e[p].w;
		e[p].v = e[p].x & 7;
		p++;
	}
	
	for(int i = 0; i < 16; i++){
		traceBits(e[i].u, 3);
		traceBits(e[i].v, 3);
		traceBits(e[i].w, 1);
		traceBits(e[i].x, 4);
		printf("\n");
	}
	
	Edge* e0 = &e[0];
	for(int i = 0; i < 16; i++){
		traceBits((*e0).x, 4);
		(*e0).flag = 0;
		if(e[(*e0).v * 2].flag){
			e0 = &e[(*e0).v * 2];
		} else {
			e0 = &e[(*e0).v * 2 + 1];
		}
	}
	
	return 0;
}
