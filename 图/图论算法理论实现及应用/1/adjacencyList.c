#include <stdio.h>
#include <stdlib.h>
#define MAXN 100

//边节点
struct ArcNode{
	int adjvex; // 有向边的另一个邻接点的序号
	ArcNode *nextarc; // 指向下一个边节点的指针
};

// 顶点
struct VNode{
	int data; // 顶点信息
	ArcNode *head1; // 出边表的表头指针
	ArcNode *head2; // 入边表的表头指针
};

// 图的邻接表存储结构
struct LGraph{
	VNode vertexs[MAXN]; // 顶点数组
	int vexnum,arcnum; // 顶点数和边数
};

void createLG(LGraph lg, int vexnum, int arcnum, int* v){
	lg.vexnum = vexnum;
	lg.arcnum = arcnum;
	for(int i = 0; i < lg.vexnum; i++){
		lg.vertexs[i].head1 = NULL;
		lg.vertexs[i].head2 = NULL;
	}
	int v1,v2;
	for(int i = 0; i < lg.arcnum; i++){
		v1 = *(v + 2 * i);
		v2 = *(v + 2 * i + 1);
		// 
		ArcNode arc;
		arc.adjvex = v2;
		arc.nextarc = lg.vertexs[v1].head1;
		lg.vertexs[v1].head1 = (ArcNode *)&arc;
		//
		ArcNode arc2;
		arc2.adjvex = v1;
		arc2.nextarc = lg.vertexs[v2].head2;
		lg.vertexs[v2].head2 = (ArcNode *)&arc2;
		//printf("%d::%d,%d,%d,%d\n",i, v1, v2, arc.adjvex, arc2.adjvex);
	}
}

void deleteLG(LGraph lg){
	ArcNode* pi;
	for(int i = 0; i < lg.vexnum; i ++){
		pi = lg.vertexs[i].head1;
		while(pi != NULL){
			lg.vertexs[i].head1 = pi->nextarc;
			delete pi;
			pi = lg.vertexs[i].head1;
		}
		pi = lg.vertexs[i].head2;
		while(pi != NULL){
			lg.vertexs[i].head2 = pi->nextarc;
			delete pi;
			pi = lg.vertexs[i].head2;
		}
	}
}

int od(LGraph lg, int i){
	int d = 0;
	ArcNode* pi = lg.vertexs[i].head1;
	while(pi != NULL){
		d++;
		pi = pi->nextarc;
	}
	return d;
}

int id(LGraph lg, int i){
	int d = 0;
	ArcNode* pi = lg.vertexs[i].head2;
	while(pi != NULL){
		d++;
		pi = pi->nextarc;
	}
	return d;
}

int main(){
	LGraph lg;
	int vexnum = 8;
	int arcnum = 18;
	int v[36] = {1, 2, 2, 3, 2, 5, 2, 6, 3, 5, 4, 3, 5, 2, 5, 4, 6, 7, 4, 7, 1, 4,
	2, 1, 2, 2, 2, 3, 2, 3, 4, 2, 4, 3, 0, 0};
	
	createLG(lg, vexnum, arcnum, (int *)v);
	for(int i = 0; i < vexnum; i++){
		printf("%d的出度:%d\n",i, od(lg, i));
		//printf("%d的入度:%d\n",i, id(lg, i));
	}
	// deleteLG(lg);
	return 0;
}
