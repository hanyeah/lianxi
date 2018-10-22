#include "m.c"

int inSet(Vertex* X, int n, Vertex v){
	for(int i = 0; i < n; i++){
		if((*(X + i)).id == v.id){
			return 1;
		}
	}
	return 0;
}

int adjacency(Edge* E, int m, Vertex v1, Vertex v2){
	for(int i = 0; i < m; i++){
		Edge e = *(E + i);
		if(v1.id == e.v1.id && v2.id == e.v2.id){
			return 1;
		}
		if(v1.id == e.v2.id && v2.id == e.v1.id){
			return 1;
		}
	}
	return 0;
}

int adjacency(Edge* E, int m, Vertex* X, int n, Vertex v){
	for(int i = 0; i < n; i++){
		if(adjacency(E, m, v, *(X + i))){
			return 1;
		}
	}
	return 0;
}

int bipartite(Vertex* V, int n, Edge* E, int m){
	Vertex X[n];
	Vertex Y[n];
	int xn = 0;
	int yn = 0;
	for(int i = 0; i < n; i++){
		Vertex vi = *(V + i);
		if(!adjacency(E, m, (Vertex *)X, xn, vi)){
			X[xn] = vi;
			xn++;
		} else if(!adjacency(E, m, (Vertex *)Y, yn, vi)){
			Y[yn] = vi;
			yn++;
		} else {
			return 0;
		}
	}
	trace((Vertex*)X, xn);
	trace((Vertex*)Y, yn);
	return 1;
}

int main(){
	//int e[] = {0, 4, 0, 8, 1, 5, 1, 7, 2, 6, 2,7, 3, 5, 3, 8};
	//int n = 9;
	
	//int e[] = {0, 1, 0, 3, 0, 5, 1, 2, 1, 4, 2, 3, 2, 5, 3, 4, 4, 5};
	//int n = 6;
	
	int e[] = {0, 1, 0, 3, 0, 4, 1, 2, 1, 5, 2,  3, 2, 6, 3, 7, 4, 5, 4, 7, 5, 6, 6, 7, 0, 2};
	int n = 8;
	
	int m = sizeof(e) / sizeof(int) / 2;
	
	Vertex V[n];
	Edge E[m];
	for(int i = 0; i < n; i++){
		Vertex vi;
		vi.id = i;
		vi.degree = 0;
		V[i] = vi;
	}
	for(int i = 0; i < m; i++){
		Edge ei;
		ei.v1 = V[e[i * 2]];
		ei.v2 = V[e[i * 2 + 1]];
		E[i] = ei;
	}
	trace((Edge*)E, m);
	int b = bipartite((Vertex*)V, n, (Edge*)E, m);
	printf("%d\n",b);
	return 0;
}
