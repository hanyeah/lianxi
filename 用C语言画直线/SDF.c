#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include "svpng.inc"
#define PI 3.14159265359f
#define W 512
#define H 512
unsigned char img[W * H * 3];

float capsuleSDF(float px, float py, float ax, float ay, float bx, float by, float r) {
    float pax = px - ax, pay = py - ay, bax = bx - ax, bay = by - ay;
    float h = fmaxf(fminf((pax * bax + pay * bay) / (bax * bax + bay * bay), 1.0f), 0.0f);
    float dx = pax - bax * h, dy = pay - bay * h;
    return sqrtf(dx * dx + dy * dy) - r; // 只改变这句及返回类型
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
			s = fmaxf(s, fminf(0.5f - capsuleSDF(x, y, cx + r1 * ct, cy - r1 * st, cx + r2 * ct, cy - r2 * st, r), 1.0f));
			t += 2.0f * PI / 64.0f;
		}
	}
	return s;
}

// 带符号距离场（signed distance field, SDF）
int main(){
	unsigned char *p = img;
	for(int y = 0; y < H; y++){
		for(int x = 0; x < W; x++){
			p[0] = p[1] = p[2] = (unsigned char)((1.0f - sample((float)x, (float)y)) * 255);
			p+=3;
		}
	}
	svpng(fopen("SDF.png", "wb"), W, H, img, 0);
	return 0;
}
