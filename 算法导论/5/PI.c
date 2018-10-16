#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>
#include <limits.h>

double nb_rand(double a, double b){
	return a + (double)rand() / RAND_MAX * (b - a);
}

void test01(){
	srand((unsigned int)time(NULL));
	long long s1 = 0;
	long long s2 = 0;
	while(1){
		s2++;
		double x = nb_rand(-0.5, 0.5);
		double y = nb_rand(-0.5, 0.5);
		double dis = sqrt(x * x + y * y);
		if(dis < 0.5){
			s1++;
		}
		//printf("x:%f, y: %f, dis: %f\n",x,y,dis);
		//if(s2 > 10){break;}
		if(s2 % 100000 == 0){
			printf("PI = %.20f\n",(double)(s1 * 4) / s2);
		}
	}
}

void test02(){
	srand((unsigned int)time(NULL));
	long long s1 = 0;
	long long s2 = 0;
	unsigned long long r2 = RAND_MAX * RAND_MAX;
	printf("size of max rand: %d\n",sizeof(RAND_MAX));
	while(1){
		s2++;
		unsigned long long x = rand();
		unsigned long long y = rand();
		unsigned long long dis = x * x + y * y;
		if(dis < r2){
			s1++;
		}
		if(s2 % 100000 == 0){
			printf("PI = %.20f\n",(double)(s1 * 4) / s2);
		}
	}
	
}

int main(){
	test01();
	//test02();
	return 0;
}
