#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include "svpng.inc"
#define PI 3.14159265359f
#define W 512
#define H 512
unsigned char img[W * H * 3];

// 判断一点 (px, py) 是否在胶囊体（两端为(ax, ay)、(bx, by)，半径 r）之中
int capsule(float px, float py, float ax, float ay, float bx, float by, float r){
	float pax = px - ax;
	float pay = py - ay;
	float bax = bx - ax;
	float bay = by - ay;
	float h = fmaxf(fminf((pax * bax + pay * bay) / (bax * bax + bay * bay), 1.0f), 0.0f);
    float dx = pax - bax * h, dy = pay - bay * h;
    return dx * dx + dy * dy < r * r;
}

// 对坐标 (x, y) 进行采样
float sample(float x, float y){
	float s = 0.0f;
	float cx = W * 0.5f;
	float cy = H * 0.5f;
	for(int j = 0; j < 5; j ++){
		float r1 = fminf(W, H) * (j + 0.5f) * 0.085f;
		float r2 = fminf(W, H) * (j + 1.5f) * 0.085f;
		float t = j * PI / 64.0f, r = (j + 1) * 0.5f;
		for(int i = 1; i <= 64; i++){
			float ct = cosf(t);
			float st = sinf(t);
			s = fmaxf(s, capsule(x, y, cx + r1 * ct, cy - r1 * st, cx + r2 * ct, cy - r2 * st, r) ? 1.0f : 0.0f);
			t += 2.0f * PI / 64.0f;
		}
	}
	return s;
}

// 采样
int main(){
	unsigned char *p = img;
	for(int y = 0; y < H; y++){
		for(int x = 0; x < W; x++){
			p[0] = p[1] = p[2] = (unsigned char)((1.0f - sample((float)x, (float)y)) * 255);
			p+=3;
		}
	}
	svpng(fopen("sampling.png", "wb"), W, H, img, 0);
	return 0;
}
