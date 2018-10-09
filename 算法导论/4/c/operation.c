#include <stdio.h>
#include <time.h>
#include <math.h>
#define n 10000000
#define v 121313
#define k 10

void f1(){
	int m = v;
	for(int i = 0; i < n; i++){
		m += k;
	}
}

void f2(){
	int m = v;
	for(int i = 0; i < n; i++){
		m *= k;
	}
}

void f3(){
	int m = v;
	for(int i = 0; i < n; i++){
		m /= k;
	}
}

void f4(){
	double m = v;
	for(int i = 0; i < n; i++){
		m = pow(v, k);
	}
}

void printTime(void (*f)()){
	clock_t t1,t2;
	t1 = clock();
	f();
	t2 = clock();
	float diff = (float)(t2 - t1) / CLOCKS_PER_SEC;
	printf("%f\n", diff);
}

int main(){
	printTime(f1);
	printTime(f2);
	printTime(f3);
	printTime(f4);
	return 0;
}
