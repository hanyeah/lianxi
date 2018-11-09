#include <stdio.h>
#define M 100000

int list[M];
int stack[M*10];
char ans[M*10];
int s,a;

void search(int v, int m){
	int w;
	while(list[v] < 10){
		w = v * 10 + list[v];
		list[v]++;
		stack[s++] = w;
		v = w % m;
	}
}

int pow(int m, int n){
	int p = 1;
	while(n--){
		p*=m;
	}
	return p;
}

int main(){
	int n,m,v;
	//n = 3;
	printf("please input n：");
	scanf("%d", &n);
	
	s = 0;
	a = 0;
	v = 0;
	
	if(n == 1){
		printf("0123456789\n");
		return 0;
	}
	
	m = pow(10, n-1);
	// printf("%d\n",m);
	for(int i = 0; i < m; i++){
		list[i] = 0;
	}
	
	search(v, m);
	
	while(s){
		v = stack[--s];
		ans[a++] = v % 10 + '0';
		v /= 10;
		search(v, m);
	}
	
	for(int i = 0; i < n; i++){
		printf("0");
	}
	while(a){
		printf("%c",ans[--a]);
	}
	printf("\n");
	
	return 0;
}
