#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include "svpng.inc"
#define PI 3.14159265359f
#define W 512
#define H 512
unsigned char img[W * H * 3];

void setPixel(int x, int y){
	if(x >= 0 && x < W && y >=0 && y < H){
		unsigned char* p = img + (y * W + x) * 3;
		p[0] = p[1] = p[2] = 0;
	}
}

// https://www.cnblogs.com/gamesky/archive/2012/09/03/2668932.html
void bresenhamCircle(int x0, int y0, int r){
	int x = 0;
	int y = r;
	int d = 1 - r;
	while(y > x){
		setPixel(x0 + x, y0 + y);
		setPixel(x0 - x, y0 + y);
		setPixel(x0 - x, y0 - y);
		setPixel(x0 + x, y0 - y);
		
		setPixel(x0 + y, y0 + x);
		setPixel(x0 - y, y0 + x);
		setPixel(x0 - y, y0 - x);
		setPixel(x0 + y, y0 - x);
		
		if(d < 0){
			d = d + 2 * x + 3;
		} else {
			d = d + 2 * (x - y) + 5;
			y--;
		}
		x++;
	}
}

int main(){
	memset(img, 255, sizeof(img));
	for(int i = 0; i < 36; i++){
		bresenhamCircle(256, 256, 10 * i);
	}
	
	svpng(fopen("circle_bresenham.png", "wb"), W, H, img, 0);
	return 0;
}
