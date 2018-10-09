#include <stdio.h>

void maxSubArray(int *ary, int len){
	int sum = -1000;
	int current = 0;
	int indexA = 0;
	int indexB = 0;
	int indexC = 0;
	for(int i = 0; i < len ;i++){
		if(current == 0){
			indexA = i;
		}
		current += ary[i];
		if(current > sum){
			sum = current;
			indexC = indexA;
			indexB = i;
		}
		if(current < 0){
			current = 0;
		}
	}
	printf("最大数组从第%d到第%d个\n",indexC, indexB);
	for(int i = indexC; i <= indexB; i++){
		printf("%d ",ary[i]);
	}
	printf("\n最大数组的和为：%d\n\n",sum);
}

int main(){
	int ary0[] = {13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7};
	int ary1[] = {-1, -2, -1, 0};
	int ary2[] = {-1, 1, -2, -3};
	maxSubArray((int *)ary0, sizeof(ary0) / sizeof(int));
	maxSubArray((int *)ary1, sizeof(ary1) / sizeof(int));
	maxSubArray((int *)ary2, sizeof(ary2) / sizeof(int));
	return 0;
}
