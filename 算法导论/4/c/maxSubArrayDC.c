#include <stdio.h>
#define INT_MIN 0x80000000

struct SubAryData{
	int startIndex;
	int endIndex;
	int sum;
};

SubAryData findMaxCrossingSubArray(int *ary, int start, int mid, int end){
	int leftSum = INT_MIN;
	int maxLeft = start;
	int rightSum = INT_MIN;
	int maxRight = end;
	int sum = 0;
	for(int i = mid; i >= start; i--){
		sum += ary[i];
		if(sum > leftSum){
			leftSum = sum;
			maxLeft = i;
		}
	}
	sum = 0;
	for(int i = mid + 1; i <= end; i++){
		sum += ary[i];
		if(sum > rightSum){
			rightSum = sum;
			maxRight = i;
		}
	}
	if(leftSum == INT_MIN){
		leftSum = 0;
	}
	if(rightSum == INT_MIN){
		rightSum = 0;
	}
	//printf("%d-%d-%d:%d_%d,%d_%d\n", start, mid, end,maxLeft, leftSum,maxRight, rightSum);
	SubAryData data;
	data.startIndex = maxLeft;
	data.endIndex = maxRight;
	data.sum = leftSum + rightSum;
	return data;
}

SubAryData findMaxSubArray(int *ary, int start, int end){
	SubAryData data;
	if(start == end){
		data.startIndex = start;
		data.endIndex = end;
		data.sum = ary[start];
		return data;
	}
	int mid = (start + end) >> 1;
	SubAryData left = findMaxSubArray(ary, start, mid);
	SubAryData right = findMaxSubArray(ary, mid + 1, end);
	SubAryData cross = findMaxCrossingSubArray(ary, start, mid, end);
	// printf("left:%d,%d,%d\n", left.startIndex, left.endIndex, left.sum);
	// printf("right:%d,%d,%d\n", right.startIndex, right.endIndex, right.sum);
	// printf("cross:%d,%d,%d\n", cross.startIndex, cross.endIndex, cross.sum);
	if(left.sum >= right.sum && left.sum >= cross.sum){
		return left;
	}
	if(right.sum >= left.sum && right.sum >= cross.sum){
		return right;
	}
	return cross;
}

int main(){
	int ary[] = {13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7};
	int len = sizeof(ary) / sizeof(int);
	int start = 0;
	int end = len - 1;
	SubAryData data = findMaxSubArray(ary, start, end);
	printf("最大数组从第%d到第%d个\n",data.startIndex, data.endIndex);
	for(int i = data.startIndex; i <= data.endIndex; i++){
		printf("%d ",ary[i]);
	}
	printf("\n最大数组的和为：%d\n",data.sum);
	return 0;
}
