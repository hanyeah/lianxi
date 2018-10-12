#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include "svpng.inc"
#define PI 3.14159265359f
#define W 512
#define H 512
unsigned char img[W * H * 3];

// https://wenku.baidu.com/view/eb1faabab84ae45c3b358cd8.html

void setPixel(int x, int y){
	unsigned char* p = img + (y * W + x) * 3;
	p[0] = p[1] = p[2] = 0;
}

void DDA(int x0, int y0, int x1, int y1){
	int dx = x1 - x0;
	int dy = y1 - y0;
	float xIncrement,yIncrement;
	int steps;
	if(abs(dx) > abs(dy)){
		steps = abs(dx);
	} else {
		steps = abs(dy);
	}
	xIncrement = dx / (float)steps;
	yIncrement = dy / (float)steps;
	setPixel(x0, y0);
	float x = (float)x0;
	float y = (float)y0;
	for(int k = 0; k < steps; k++){
		x += xIncrement;
		y += yIncrement;
		setPixel((int)round(x), (int)round(y));
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
			DDA((int)(cx + r1 * ct), (int)(cy - r1 * st), (int)(cx + r2 * ct), (int)(cy - r2 * st));
			t += 2.0f * PI / 64.0f;
		}
	}
	svpng(fopen("DDA.png", "wb"), W, H, img, 0);
	return 0;
}
