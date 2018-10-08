#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include "svpng.inc"
#define PI 3.14159265359f
#define W 512
#define H 512
unsigned char img[W * H * 3];

// https://zhuanlan.zhihu.com/p/30553006
// https://zh.wikipedia.org/wiki/%E5%B8%83%E9%9B%B7%E6%A3%AE%E6%BC%A2%E5%A7%86%E7%9B%B4%E7%B7%9A%E6%BC%94%E7%AE%97%E6%B3%95

void setPixel(int x, int y){
	unsigned char* p = img + (y * W + x) * 3;
	p[0] = p[1] = p[2] = 0;
}

void bresenham(int x0, int y0, int x1, int y1){
	int dx = abs(x1 - x0);
	int sx = x0 < x1 ? 1 : -1;
	int dy = abs(y1 - y0);
	int sy = y0 < y1 ? 1 : -1;
	int err = (dx > dy ? dx : -dy) / 2;
	setPixel(x0, y0);
	while(x0 != x1 || y0 != y1){
		setPixel(x0, y0);
		int e2 = err;
		if(e2 > -dx){
			err -= dy;
			x0 += sx;
		}
		if(e2 < dy){
			err += dx;
			y0 += sy;
		}
	}
}

int main(){
	memset(img, 255, sizeof(img));
	float cx = W * 0.5f - 0.5f;
	float cy = H * 0.5f - 0.5f;
	for(int j = 0; j < 5; j ++){
		float r1 = fminf(W, H) * (j + 0.5f) * 0.085f;
		float r2 = fminf(W, H) * (j + 1.5f) * 0.085f;
		float t = j * PI / 64.0f;
		for(int i = 1; i <= 64; i++){
			float ct = cosf(t);
			float st = sinf(t);
			bresenham((int)(cx + r1 * ct), (int)(cy - r1 * st), (int)(cx + r2 * ct), (int)(cy - r2 * st));
			t += 2.0f * PI / 64.0f;
		}
	}
	svpng(fopen("line_bresenham.png", "wb"), W, H, img, 0);
	return 0;
}
