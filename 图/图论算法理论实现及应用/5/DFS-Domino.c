#include <stdio.h>

struct EdgeNode{
	int adjVex; // 边的另一个邻接点的序号
	int edgeNo; // 边的序号
	int flag; // 标记：1-正向，-1-反向
	EdgeNode* nextEdge;// 指向下一个表节点
	int u,v;
};
/*
const int n = 6;
const int m = 5;
const int m2 = 10;
int v[m2] = {
	1, 2,
	2, 4,
	2, 4,
	6, 4,
	2, 1
};
*/

const int n = 6;
const int m = 12;
const int m2 = 24;
int v[m2] = {
	6, 1,
	3, 4,
	4, 6,
	1, 3,
	5, 4,
	2, 5,
	1, 2,
	6, 1,
	1, 2,
	2, 6,
	4, 1,
	1, 2
};


EdgeNode* edgeLink[7];
int visited[m+1];// 边的访问标志
int path[m+1];// 
int pi;

void traceList(){
	EdgeNode *pi;
	for(int i = 1; i <= n; i++){
		pi = edgeLink[i];
		while(pi!=NULL){
			printf("%d(%d,%d) ",(*pi).flag, (*pi).u, (*pi).v);
			pi = (*pi).nextEdge;
		}
		printf("\n");
	}
	printf("\n");
}

void createLG(){
	EdgeNode *p1, *p2;
	int v1, v2;
	for(int i = 1; i <= m; i++){
		visited[i] = 0;
		path[i] = 0;
	}
	for(int i = 1; i <= n; i++){
		edgeLink[i] = NULL;
	}
	int num = 1;
	for(int i = 0; i < m2; i+=2){
		v1 = v[i];
		v2 = v[i+1];
		
		p1 = new EdgeNode;
		(*p1).adjVex = v2;
		(*p1).edgeNo = num;
		(*p1).flag = 1;
		(*p1).nextEdge = edgeLink[v1];
		edgeLink[v1] = p1;
		(*p1).u = v1;
		(*p1).v = v2;
		
		p2 = new EdgeNode;
		(*p2).adjVex = v1;
		(*p2).edgeNo = num;
		(*p2).flag = -1;
		(*p2).nextEdge = edgeLink[v2];
		edgeLink[v2] = p2;
		(*p2).u = v1;
		(*p2).v = v2;
		
		num++;
	}
	// traceList();
}

void DFSL(int start){
	while(pi <= m){
		EdgeNode*p;
		p = edgeLink[start];
		while(p!=NULL){
			if(!visited[(*p).edgeNo]){// 第p->edgeNo条边未访问过
				visited[(*p).edgeNo] = 1;
				if((*p).flag>0){
					path[pi] = (*p).edgeNo;
				} else {
					path[pi] = -(*p).edgeNo;
				}
				pi++;
				DFSL((*p).adjVex);
			} else{
				p = (*p).nextEdge;
			}
		}
	}
}

void Domino(){
	int JDNum = 0;// 奇数点个数
	int start1, start2;// 搜索的起始顶点
	EdgeNode* p;
	for(int i = 1; i <= n; i++){
		int DNUm = 0;
		p = edgeLink[i];
		while(p!=NULL){
			DNUm++;
			p = (*p).nextEdge;
		}
		if(DNUm%2!=0){
			start1 = i;
			JDNum++;
		}
		if(DNUm!=0){
			start2 = i;
		}
	}
	if(JDNum!=0 && JDNum!=2){
		// 不存在欧拉回路
		printf("No Solution!\n");
		return;
	}
	pi = 1;
	if(JDNum==2){
		DFSL(start1);
	} else{
		DFSL(start2);
	}
	
	char flag1 = '+', flag2 = '-';
	for(int i = 1; i <= m; i++){
		if(path[i]>0){
			printf("%d%c\n",path[i],flag1);
		} else {
			printf("%d%c\n",-path[i],flag2);
		}
	}
}

void deleteLG(){
	EdgeNode *pi;
	for(int i = 0; i < n; i++){
		pi = edgeLink[i];
		while(pi!=NULL){
			edgeLink[i] = (*pi).nextEdge;
			delete pi;
			pi = edgeLink[i];
		}
	}
}

int main(){
	createLG();// 创建邻接表
	Domino();// 求解
	deleteLG();// 释放链表
	
	return 0;
}
