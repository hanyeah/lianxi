#include "svpng.inc"
#include <math.h> // fabsf(), fminf(), fmaxf(), sinf(), cosf(), sqrt()
#include <stdlib.h> // rand(), RAND_MAX

#define TWO_PI 6.28318530718f
#define W 512
#define H 512
#define N 64
#define MAX_STEP 64
#define MAX_DISTANCE 5.0f
#define EPSILON 1e-6f
#define BIAS 1e-4f
#define MAX_DEPTH 3

// https://zhuanlan.zhihu.com/p/31901449

typedef struct { float sd, emissive, reflectivity, eta, absorption; } Result;

unsigned char img[W * H * 3];

float beerLambert(float a, float d){
	return expf(-a * d);
}

float schlick(float cosi, float cost, float etai, float etat){
	float r0 = (etai - etat) / (etai + etat);
	r0 *= r0;
	float a = 1.0f - (etai < etat ? cosi : cost);
	float aa = a * a;
	return  r0 + (1.0f - r0) * aa * aa * a;
}

float fresnel(float cosi, float cost, float etai, float etat){
	float rs = (etat * cosi - etai * cost) / (etat * cosi + etai * cost);
	float rp = (etai * cosi - etat * cost) / (etai * cosi + etat * cost);
	return (rs * rs + rp * rp) * 0.5f;
}

float circleSDF(float x, float y, float cx, float cy, float r) {
    float ux = x - cx, uy = y - cy;
    return sqrtf(ux * ux + uy * uy) - r;
}

float boxSDF(float x, float y, float cx, float cy, float theta, float sx, float sy) {
    float costheta = cosf(theta), sintheta = sinf(theta);
    float dx = fabs((x - cx) * costheta + (y - cy) * sintheta) - sx;
    float dy = fabs((y - cy) * costheta - (x - cx) * sintheta) - sy;
    float ax = fmaxf(dx, 0.0f), ay = fmaxf(dy, 0.0f);
    return fminf(fmaxf(dx, dy), 0.0f) + sqrtf(ax * ax + ay * ay);
}

float planeSDF(float x, float y, float px, float py, float nx, float ny) {
    return (x - px) * nx + (y - py) * ny;
}

Result unionOp(Result a, Result b) {
    return a.sd < b.sd ? a : b;
}

Result intersectOp(Result a, Result b) {
    return a.sd > b.sd ? a : b;
}

Result subtractOp(Result a, Result b) {
    Result r = a;
    r.sd = (a.sd > -b.sd) ? a.sd : -b.sd;
    return r;
}

Result scene(float x, float y) {
	Result a = { circleSDF(x, y, -0.2f, -0.2f, 0.1f), 10.0f, 0.0f, 0.0f, 0.0f };
    Result b = {    boxSDF(x, y, 0.5f, 0.5f, 0.0f, 0.3, 0.2f), 0.0f, 0.2f, 1.5f, 4.0f };
    return unionOp(a, b);
}

void gradient(float x, float y, float* nx, float* ny) {
    *nx = (scene(x + EPSILON, y).sd - scene(x - EPSILON, y).sd) * (0.5f / EPSILON);
    *ny = (scene(x, y + EPSILON).sd - scene(x, y - EPSILON).sd) * (0.5f / EPSILON);
}

void reflect(float ix, float iy, float nx, float ny, float* rx, float* ry) {
    float idotn2 = (ix * nx + iy * ny) * 2.0f;
    *rx = ix - idotn2 * nx;
    *ry = iy - idotn2 * ny;
}

int refract(float ix, float iy, float nx, float ny, float eta, float* rx, float* ry){
	float idotn = ix * nx + iy * ny;
	float k = 1.0f - eta * eta * (1.0f - idotn * idotn);
	if(k < 0.0f){
		// 全反射
		return 0;
	}
	float a = eta * idotn + sqrtf(k);
	*rx = eta * ix - a * nx;
	*ry = eta * iy - a * ny;
	return 1;
}

float trace(float ox, float oy, float dx, float dy, int depth) {
    float t = 0.0f;
	float sign = scene(ox, oy).sd > 0.0f ? 1.0f : -1.0f;// 内还是外
    for (int i = 0; i < MAX_STEP && t < MAX_DISTANCE; i++) {
        float x = ox + dx * t, y = oy + dy * t;
        Result r = scene(x, y);
        if (r.sd * sign < EPSILON) {
            float sum = r.emissive;
            if (depth < MAX_DEPTH && (r.reflectivity > 0.0f || r.eta > 0.0f) ) {
                float nx, ny, rx, ry, refl = r.reflectivity;
                gradient(x, y, &nx, &ny);
				nx *= sign;
				ny *= sign;
				if(r.eta > 0.0f){
					if(refract(dx, dy, nx, ny, sign < 0.0f ? r.eta : 1.0 / r.eta, &rx, &ry)){
						float cosi = -(dx * nx + dy * ny);
						float cost = -(rx * nx + ry * ny);
						refl = sign < 0.0f ? schlick(cosi, cost, r.eta, 1.0f) : schlick(cosi, cost, 1.0f, r.eta);
						sum +=  (1 - refl) * trace(x - nx * BIAS, y - ny * BIAS, rx, ry, depth + 1);
					} else {
						refl = 1.0f;// 全内反射
					}
				}
				if(refl > 0.0f){
					reflect(dx, dy, nx, ny, &rx, &ry);
					sum += refl * trace(x + nx * BIAS, y + ny * BIAS, rx, ry, depth + 1);
				}
            }
            return sum * beerLambert(r.absorption, t);
        }
        t += r.sd * sign;
    }
    return 0.0f;
}

float sample(float x, float y) {
    float sum = 0.0f;
    for (int i = 0; i < N; i++) {
        float a = TWO_PI * (i + (float)rand() / RAND_MAX) / N;
        sum += trace(x, y, cosf(a), sinf(a), 0);
    }
    return sum / N;
}

int main() {
	unsigned char* p = img;
	for (int y = 0; y < H; y++){
		for (int x = 0; x < W; x++, p += 3) {
           p[0] = p[1] = p[2] = (int)(fminf(sample((float)x / W, (float)y / H) * 255.0f, 255.0f));
		}
	}
	svpng(fopen("beerLambert.png", "wb"), W, H, img, 0);
}
