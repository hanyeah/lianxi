#include "svpng.inc"
#include <math.h>
#include <stdlib.h>
#define W 512
#define H 512
#define TWO_PI 6.28318530718f
#define N 64

#define MAX_STEP 10
#define MAX_DISTANCE 2.0f
#define EPSILON 1e-6f
//https://zhuanlan.zhihu.com/p/30748318
unsigned char img[W*H*3];
typedef struct {
	float sd, emissive;
} Result;

Result unionOp(Result a, Result b){
	return a.sd < b.sd ? a : b;
}

float circleSDF(float x, float y, float cx, float cy, float r){
	float ux = x - cx;
	float uy = y - cy;
	return sqrtf(ux * ux + uy * uy) - r;
}

Result scene(float x, float y){
	Result r1 = {circleSDF(x, y, 0.3f, 0.3f, 0.1f), 2.0f};
	Result r2 = {circleSDF(x, y, 0.3f, 0.7f, 0.05f), 0.8f};
	Result r3 = {circleSDF(x, y, 0.7f, 0.5f, 0.1f), 0.0f};
	return unionOp(unionOp(r1, r2), r3);
}

float trace(float ox, float oy, float dx, float dy){
	float t = 0.0f;
	for(int i = 0; i < MAX_STEP && t < MAX_DISTANCE; i++){
		Result r = scene(ox + dx * t, oy + dy * t);
		if(r.sd < EPSILON){
			return r.emissive;
		}
		t += r.sd;
	}
	return 0.0f;
}

float sample(float x, float y){
	float sum = 0.0f;
	for(int i = 0; i < N; i++){
		float a = TWO_PI * (i + (float)rand() / RAND_MAX) / N;
		sum += trace(x, y, cosf(a), sinf(a));
	}
	return sum / N;
}

int main(){
	unsigned char* p = img;
	for(int y = 0; y < H; y++){
		for(int x = 0; x < W; x++){
			p[0] = p[1] = p[2] = (int)(fminf(sample((float)x / W, (float)y / H) * 255.0f, 255.0f));
			p += 3;
		}
	}
	svpng(fopen("scene01.png","wb"), W,H,img,0);
	return 0;
}
