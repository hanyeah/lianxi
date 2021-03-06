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
// https://zhuanlan.zhihu.com/p/30961545
unsigned char img[W*H*3];
typedef struct {
	float sd, emissive;
} Result;

void reflect(float ix, float iy, float nx, float ny, float* rx, float* ry){
	float idotn2 = (ix * nx + iy * ny) * 2.0f;
	*rx = ix - idotn2 * nx;
	*ry = iy - idotn2 * ny;
}

Result unionOp(Result a, Result b){
	return a.sd < b.sd ? a : b;
}

Result intersectOp(Result a, Result b){
	Result r = a.sd > b.sd ? b : a;
	r.sd = a.sd > b.sd ? a.sd : b.sd;
	return r;
}

Result subtractOp(Result a, Result b){
	Result r = a;
	r.sd = (a.sd > -b.sd) ? a.sd : -b.sd;
	return r;
}

float circleSDF(float x, float y, float cx, float cy, float r){
	float ux = x - cx;
	float uy = y - cy;
	return sqrtf(ux * ux + uy * uy) - r;
}

float planeSDF(float x, float y, float px, float py, float nx, float ny){
	return (x - px) * nx + (y - py) * ny;
}

float segmentSDF(float x, float y, float ax, float ay, float bx, float by) {
    float vx = x - ax, vy = y - ay, ux = bx - ax, uy = by - ay;
    float t = fmaxf(fminf((vx * ux + vy * uy) / (ux * ux + uy * uy), 1.0f), 0.0f);
    float dx = vx - ux * t, dy = vy - uy * t;
    return sqrtf(dx * dx + dy * dy);
}

float capsuleSDF(float x, float y, float ax, float ay, float bx, float by, float r) {
    return segmentSDF(x, y, ax, ay, bx, by) - r;
}

float boxSDF(float x, float y, float cx, float cy, float theta, float sx, float sy) {
    float costheta = cosf(theta), sintheta = sinf(theta);
    float dx = fabs((x - cx) * costheta + (y - cy) * sintheta) - sx;
    float dy = fabs((y - cy) * costheta - (x - cx) * sintheta) - sy;
    float ax = fmaxf(dx, 0.0f), ay = fmaxf(dy, 0.0f);
    return fminf(fmaxf(dx, dy), 0.0f) + sqrtf(ax * ax + ay * ay);
}

float triangleSDF(float x, float y, float ax, float ay, float bx, float by, float cx, float cy) {
    float d = fminf(fminf(
        segmentSDF(x, y, ax, ay, bx, by),
        segmentSDF(x, y, bx, by, cx, cy)),
        segmentSDF(x, y, cx, cy, ax, ay));
    return (bx - ax) * (y - ay) > (by - ay) * (x - ax) && 
           (cx - bx) * (y - by) > (cy - by) * (x - bx) && 
           (ax - cx) * (y - cy) > (ay - cy) * (x - cx) ? -d : d;
}

Result scene(float x, float y) {
    Result a = {  circleSDF(x, y, 0.4f,  0.2f, 0.1f), 2.0f };
    Result b = {     boxSDF(x, y, 0.5f,  0.8f, TWO_PI / 16.0f, 0.1f, 0.1f), 0.0f };
    Result c = {     boxSDF(x, y, 0.8f,  0.5f, TWO_PI / 16.0f, 0.1f, 0.1f), 0.0f };
    return unionOp(unionOp(a, b), c);
}

void gradient(float x, float y, float* nx, float* ny){
	*nx = (scene(x + EPSILON, y).sd - scene(x - EPSILON, y).sd) * (0.5f / EPSILON);
	*ny = (scene(x, y + EPSILON).sd - scene(x, y - EPSILON).sd) * (0.5f / EPSILON);
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
			float nx, ny;
			gradient((float)x / W, (float)y / H, &nx, &ny);
			p[0] = (int)((fmaxf(fminf(nx, 1.0f), -1.0f) * 0.5f + 0.5f) * 255.0f);
			p[1] = (int)((fmaxf(fminf(ny, 1.0f), -1.0f) * 0.5f + 0.5f) * 255.0f);
			p[2] = 0;
			p += 3;
		}
	}
	svpng(fopen("gradient.png","wb"), W,H,img,0);
	return 0;
}
