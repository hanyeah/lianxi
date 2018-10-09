#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include "svpng.inc"
#define PI 3.14159265359f
#define W 512
#define H 512
unsigned char img[W * H * 3];

// https://www.cnblogs.com/yym2013/category/707569.html
// https://blog.csdn.net/orbit/article/details/7496008
void setPixel(int x, int y){
	if(x >= 0 && x < W && y >=0 && y < H){
		unsigned char* p = img + (y * W + x) * 3;
		p[0] = p[1] = p[2] = 0;
	}
}

void bresenhamEllipse(int x0, int y0, int a, int b){
	int sqa = a * a;
	int sqb = b * b;
	int x = 0;
	int y = b;
	int d = 2 * sqb - 2 * b * sqa + sqa;
	int px = (int)round((double)sqa / sqrt((double)(sqa+sqb)));
	
	while(x <= px){
		setPixel(x0 + x, y0 + y);
		setPixel(x0 - x, y0 + y);
		setPixel(x0 - x, y0 - y);
		setPixel(x0 + x, y0 - y);
		if(d < 0){
			d = d + 2 * sqb * (2 * x + 3);
		} else {
			d = d + 2 * sqb * (2 * x + 3) - 4 * sqa * (y - 1);
			y--;
		}
		x++;
	}
	
	d = sqb * (x * x + x) + sqa * (y * y - y) - sqa * sqb;
	while(y >= 0){
		setPixel(x0 + x, y0 + y);
		setPixel(x0 - x, y0 + y);
		setPixel(x0 - x, y0 - y);
		setPixel(x0 + x, y0 - y);
		y--;
		if(d < 0){
			x++;
			d = d - 2 * sqa * y - sqa + 2 * sqb * x + 2 * sqb;
		} else {
			d = d - 2 * sqa * y - sqa;
		}
	}
}

int main(){
	memset(img, 255, sizeof(img));
	for(int i = 0; i < 51; i++){
		bresenhamEllipse(256, 256, 10 * i, 7 * i);
	}
	
	svpng(fopen("ellipse_bresenham.png", "wb"), W, H, img, 0);
	return 0;
}
