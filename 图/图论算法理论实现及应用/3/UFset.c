#include <stdio.h>
#define parent(set, x) (*((*set).parent + x))
struct UFSet{
	int n;
	int* parent;
};

void trace(UFSet* set){
	for(int i = 1; i <= (*set).n; i++){
		printf("%d:%d, ", i, parent(set, i));
	}
	printf("\n");
}

void initUFSet(UFSet* set){
	int m[100];
	(*set).parent = (int *)m;
	for(int i = 1; i <= (*set).n; i++){
		parent(set, i) = -1;
	}
}

int Find(UFSet* set, int x){
	int s = x;
	while(parent(set, s)>=0){
		s = parent(set, s);
	}
	while(s!=x){
		int tmp = parent(set, x);
		parent(set, x) = s;
		x = tmp;
	}
	return s;
}

void Union(UFSet* set, int R1, int R2){
	int r1 = Find(set, R1);
	int r2 = Find(set, R2);
	int tmp = parent(set, r1) + parent(set, r2);
	if(parent(set, r1) > parent(set, r2)){
		parent(set, r1) = r2;
		parent(set, r2) = tmp;
	} else {
		parent(set, r2) = r1;
		parent(set, r1) = tmp;
	}
}
