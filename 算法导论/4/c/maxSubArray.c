#include <stdio.h>

int main(){
	int ary[] = {13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7};
	int len = sizeof(ary) / sizeof(int);
	int indexMin = 0;
	int indexMax = 0;
	int maxValue = 0;
	for(int i = 1; i < len; i++){
		// 长度是i的子串
		for(int j = 0; j < len - i; j++){
			// 子串起始位置
			int tempValue = 0;
			// 计算子串的和
			for(int k = 0; k < i; k++){
				tempValue += ary[j + k];
			}
			// 判断
			if(tempValue > maxValue){
				maxValue = tempValue;
				indexMin = j;
				indexMax = j + i;
			}
		}
	}
	printf("最大数组从第%d到第%d个\n",indexMin, indexMax - 1);
	int sum = 0;
	for(int i = indexMin; i < indexMax; i++){
		printf("%d ",ary[i]);
		sum += ary[i];
	}
	printf("\n最大数组的和为：%d\n",sum);
	return 0;
}
