#include <stdio.h>
#define INF 100000
#define MAXN 10

struct Queue{
	int data[1000];
	int p0;
	int p1;
};

void init(Queue* Q){
	(*Q).p0 = 0;
	(*Q).p1 = 0;
}

void push(Queue* Q, int v){
	(*Q).data[(*Q).p1++] = v;
	// printf("---%d,%d\n",(*Q).p0,(*Q).p1);
}

int pop(Queue* Q){
	return (*Q).data[(*Q).p0++];
}

int empty(Queue* Q){
	return (*Q).p0 >= (*Q).p1;
}

struct ArcNode{
	int to;
	int weight;
	ArcNode* next;
};
Queue* Q;
ArcNode* list[MAXN];
int inq[MAXN];
int dist[MAXN];
int path[MAXN];
int n = 7;
int m = 10;
int e[30] ={
	0, 1, 6,
	0, 2, 5,
	0, 3, 5,
	1, 4, -1,
	2, 1, -2,
	2, 4, 1,
	3, 2, -2,
	3, 5, -1,
	4, 6, 3,
	5, 6, 3
};

void trace(Queue* Q){
	printf("Q:\np0 = %d,p1 = %d\n", (*Q).p0, (*Q).p1);
	for(int i = (*Q).p0; i < (*Q).p1; i++){
		printf("%d,",(*Q).data[i]);
	}
	printf("\n");
}

void SPFA(int src){
	int u;
	Queue Q0;
	Q = &Q0;
	init(Q);
	ArcNode* temp;
	for(int i = 0; i < n; i++){
		dist[i] = INF;
		path[i] = src;
		inq[i] = 0;
	}
	dist[src] = 0;
	path[src] = src;
	inq[src]++;
	
	push(Q, src);
	while(!empty(Q)){
		u = pop(Q);
		inq[u]--;
		temp = list[u];
		while(temp != NULL){
			int v = (*temp).to;
			if(dist[v] > dist[u] + (*temp).weight){
				dist[v] = dist[u] + (*temp).weight;
				path[v] = u;
				if(!inq[v]){
					push(Q, v);
					inq[v]++;
				}
			}
			temp = (*temp).next;
		}
	}
	
}

void traceList(){
	printf("list:");
	for(int i = 0 ; i < n; i++){
		ArcNode* temp = list[i];
		printf("%d:",i);
		while(temp!=NULL){
			printf("(%d,%d) ",(*temp).to,(*temp).weight);
			temp = (*temp).next;
		}
		printf("\n");
	}
	printf("\n");
}

int main(){
	for(int i = 0; i < m; i++){
		ArcNode* temp = new ArcNode;
		int u = e[3 * i];
		int v = e[3 * i + 1];
		int w = e[3 * i + 2];
		(*temp).to = v;
		(*temp).weight = w;
		(*temp).next = NULL;
		if(list[u]==NULL){
			list[u] = temp;
		} else {
			(*temp).next = list[u];
			list[u] = temp;
		}
	}
	
	SPFA(0);
	
	//释放内存
	for(int i = 0; i < n; i++){
		ArcNode* temp = list[i];
		while(temp!=NULL){
			list[i] = (*temp).next;
			delete temp;
			temp = list[i];
		}
	}
	// 输出结果
	int shortest[7];
	for(int i = 1; i < n; i++){
		printf("%d\t", dist[i]);
		int k = 0;
		shortest[k] = i;
		while(path[shortest[k]] != 0){
			shortest[k+1] = path[shortest[k]];
			k++;
		}
		k++;
		shortest[k] = 0;
		for(int j = k; j > 0; j--){
			printf("%d→",shortest[j]);
		}
		printf("%d\n",shortest[0]);
	}
	return 0;
}
