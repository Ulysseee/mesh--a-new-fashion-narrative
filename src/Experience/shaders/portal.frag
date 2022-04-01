/*************************************************************************
* The Aperture Science Excursion Funnel
* A Portal 2 Fan Shader for [SIG15]
* Last Updated: Sun Aug 10 2015 @ 02:30PM EST (11:30AM PST)
* By Alain Galvan (Alain.xyz)
* Please mind the mess. xD
* Sources: iq, nimitz, teh_bear, unity3d, i-saint, ashima, Youself, and way more
**************************************************************************
* Constants
*************************************************************************/
#define PI 3.14159
#define TWO_PI 6.28318
#define PI_OVER_TWO 1.570796
#define ONE_OVER_PI 0.318310
#define GR   1.61803398

#define V_FOWARD vec3(1.,0.,0.)
#define V_UP vec3(0.,1.,0.)

#define SMALL_FLOAT 0.0001
#define BIG_FLOAT 1000000.

#define MAT_GUNWHITE 1.
#define MAT_GUNGRAY  2.
#define MAT_GUNBLACK 3.
#define MAT_FUNNEL   4.
#define MAT_CHAMBER  5.

/*************************************************************************
* Utilities
*************************************************************************/
vec2 opU(vec2 a, vec2 b)
{
	if (a.x < b.x) return a;
	else return b;
}

float opS(float d1, float d2)
{
	return max(-d2, d1);
}

vec3 opCheapBend(vec3 p, vec2 a)
{
	float c = cos(a.x*p.y);
	float s = sin(a.y*p.y);
	mat2  m = mat2(c, -s, s, c);
	return vec3(m*p.xy, p.z);
}

float pow5(float v)
{
	float tmp = v*v;
	return tmp*tmp*v;
}

vec3 opTwist(vec3 p, float a)
{
	float  c = cos(a*p.y + a);
	float  s = sin(a*p.y + a);
	mat2   m = mat2(c, -s, s, c);
	return vec3(m*p.xz, p.y);
}

mat3 makeRotateX(float a)
{
	float  c = cos(a); float  s = sin(a);
	return mat3(1.0, c, -s,
		0.0, s, c,
		0.0, 0.0, 1.0);
}

mat3 makeRotateY(float a)
{
	float  c = cos(a); float  s = sin(a);
	return mat3(c, 0.0, s,
		0.0, 1.0, 0.0,
		-s, 0.0, c);
}

mat3 makeRotateZ(float a)
{
	float  c = cos(a); float  s = sin(a);
	return mat3(c, -s, 0.0,
		s, c, 0.0,
		0.0, 0.0, 1.0);
}

vec2 cartesianToPolar(vec2 p)
{
	float l = length(p);
	return vec2(acos(p.x / l), asin(p.y / l));
}


vec2 cartesianToPolar(vec3 p)
{
	return vec2(PI / 2. - acos(p.y / length(p)), atan(p.z, p.x));
}


vec3 DomainRotateSymmetry(const in vec3 vPos, const in float fSteps)
{
	float angle = atan(vPos.x, vPos.z);

	float fScale = fSteps / (PI * 2.0);
	float steppedAngle = (floor(angle * fScale + 0.5)) / fScale;

	float s = sin(-steppedAngle);
	float c = cos(-steppedAngle);

	vec3 vResult = vec3(c * vPos.x + s * vPos.z,
		vPos.y,
		-s * vPos.x + c * vPos.z);

	return vResult;
}

float lstep(float edge0, float edge1, float x)
{
	return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

float noise(in vec3 x)
{
	vec3 p = floor(x);
	vec3 f = fract(x);
	f = f*f*(3.0 - 2.0*f);
	vec2 uv = (p.xy + vec2(37.0, 17.0)*p.z) + f.xy;
	vec2 rg = texture(iChannel2, (uv + 0.5) / 256.0, -100.0).yx;
	return -1.0 + 2.0*mix(rg.x, rg.y, f.z);
}


// **************************************************************************
// GLOBALS
// **************************************************************************

vec3  g_camPointAt = vec3(0.);
vec3  g_camOrigin = vec3(0.);
vec3  g_ldir = vec3(-.4, 1., -.3);

// **************************************************************************
// CAMERA & GLOBALS
// **************************************************************************
struct CameraData
{
	vec3 origin;
	vec3 dir;
	vec2 st;
	vec3 right;
	vec3 up;
};

CameraData setupCamera(in vec2 fragCoord)
{
	// aspect ratio
	float invar = iResolution.y / iResolution.x;
	vec2 st = fragCoord.xy / iResolution.xy - .5;
	st.y *= invar;

	// Camera Foward Up Right
	vec3 iu = V_UP;
	vec3 iz = normalize(g_camPointAt - g_camOrigin);
	vec3 ix = normalize(cross(iz, iu));
	vec3 iy = cross(ix, iz);
	vec3 dir = normalize(st.x*ix + st.y*iy + .67 * iz);

	return CameraData(g_camOrigin, dir, st, iy, ix);

}

void animate()
{
	//Camera
	g_camOrigin = vec3(0., 1.68, 0.); //1.68

	vec2 click = iMouse.xy / iResolution.xx;
	click = vec2(0.7, 0.25) * click + vec2(0., -0.05);

	float yaw = PI_OVER_TWO * (click.x);
	float pitch = PI_OVER_TWO * ((iResolution.x / iResolution.y) * click.y);

	g_camPointAt = g_camOrigin + vec3(cos(yaw), tan(pitch)*cos(yaw), sin(yaw));
}

/*************************************************************************
* Distance Fields
*************************************************************************/

#define SKYBLUE vec3(0.06, 0.2, .4)
#define SKYORANGE vec3(0.4, 0.5, 0.9)

float sdPlane(vec3 p)
{
	return p.y;
}

float sdPlaneZ(vec3 p)
{
	return p.z;
}

float sdRoundBox(vec3 p, vec3 b, float r)
{
	return length(max(abs(p) - b, 0.0)) - r;
}

float sdBox(vec3 p, vec3 b)
{
	vec3 d = abs(p) - b;
	return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));
}

float sdCylinder(vec3 p, vec2 h)
{
	vec2 d = abs(vec2(length(p.xz), p.y)) - h;
	return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}

float sdSphere(vec3 pos, float r)
{
	return length(pos) - r;
}

float segmentdf(vec3 p, vec3 a, vec3 b, float r)
{

	vec3 ba = b - a;
	float t = dot(ba, (p - a)) / max(SMALL_FLOAT, dot(ba, ba));
	t = clamp(t, 0., 1.);
	return length(ba * t + a - p) - r;
}

float sdExcursionfunnel(vec3 p) {
	p += vec3(0., -1.2, -1.2);
	p += makeRotateX(mod(p.x*0.5 + iTime, 2.*PI)) * vec3(0., 1.2, 1.2);
	vec2 d = abs(vec2(length(p.yz), p.x)) - vec2(.02, p.x);
	float line = length(max(d, 0.0));
	return line;
}

float sdPGunBlaster(vec3 p) {
	//Blaster Radius
	float xx = p.x;
	float radius =
		0.22
		- 0.05 * lstep(1.7, 2.1, xx)
		+ 0.1  * lstep(1.55, 1.65, xx)
		- 0.05 * lstep(1.3, 1.4, xx)
		- 0.1  * lstep(0.8, 0.9, 1.8 - xx)
		+ 0.15  * lstep(1.0, 1.2, 1.75 - xx)
		+ 0.05  * lstep(1.0, 1.2, 1.4 - xx)
		- 0.05  * lstep(1.0, 1.2, 1. - xx)
		;

	vec2 d = abs(vec2(length(p.yz), xx)) - vec2(radius, 2.0);
	return min(max(d.x, d.y), 0.) + length(max(d, .0));
}

vec2 scenedf(vec3 p)
{
	//Map mouse for gun tracking
	vec2 click = iMouse.xy / iResolution.xx;
	click = vec2(0.64, 0.25) * click + vec2(0., -0.05);
	float yaw = PI_OVER_TWO * (click.x);
	float pitch = PI_OVER_TWO * ((iResolution.x / iResolution.y) * click.y);
	vec3 gp = (makeRotateY(-yaw)*makeRotateZ(0.02*PI + pitch) *p + vec3(-1.5*(1.+pitch), -1.1, -.5));

	//Potato Gun
	vec2 obj = vec2(sdPGunBlaster(gp), MAT_GUNGRAY);
	obj = opU(obj, vec2(sdSphere(vec3(.7, 1., 1.)*gp + vec3(0.5, 0., 0.), .35), MAT_GUNWHITE));

	//Apeture Science Excursion Funnel
	obj = opU(obj, vec2(sdExcursionfunnel(p), MAT_FUNNEL));
	obj = opU(obj, vec2(sdExcursionfunnel(p + vec3(8., 0., 0.)), MAT_FUNNEL));
	obj = opU(obj, vec2(sdExcursionfunnel(p + vec3(16., 0., 0.)), MAT_FUNNEL));

	//Chamber Walls
	vec3 mp = mod(p + vec3(iTime, 0., 0.), vec3(2.2, 4.1, 12.2)) - vec3(1.1, 2.05, 6.1);
	obj = opU(obj, vec2(sdBox(mp, vec3(1.0, 2.0, 1.0)), MAT_CHAMBER));
	obj = opU(obj, vec2(sdPlaneZ(p + vec3(0., 0., 5.15)), MAT_GUNGRAY));
	obj = opU(obj, vec2(sdPlaneZ((-p + vec3(0., 0., 5.15))), MAT_GUNWHITE));

	return obj;
}
// *************************************************************************
// RENDERING
// **************************************************************************
#define DISTMARCH_STEPS 256
#define DISTMARCH_MAXDIST 50.

vec2 distmarch(vec3 ro, vec3 rd, float maxd)
{

	float epsilon = 0.0001;
	float dist = 10. * epsilon;
	float t = 0.;
	float material = 0.;
	for (int i = 0; i < DISTMARCH_STEPS; i++)
	{
		if (abs(dist) < epsilon || t > maxd) break;
		// advance the distance of the last lookup
		t += dist;
		vec2 dfresult = scenedf(ro + t * rd);
		dist = dfresult.x;
		material = dfresult.y;
	}

	if (t > maxd) material = -1.0;
	return vec2(t, material);
}

// SHADOWING & NORMALS
#define SOFTSHADOW_STEPS 40
#define SOFTSHADOW_STEPSIZE .1

float calcSoftShadow(vec3 ro, vec3 rd, float mint, float maxt, float k)
{
	float shadow = 1.0;
	float t = mint;

	for (int i = 0; i < SOFTSHADOW_STEPS; i++)
	{
		if (t < maxt)
		{
			float h = scenedf(ro + rd * t).x;
			shadow = min(shadow, k * h / t);
			t += SOFTSHADOW_STEPSIZE;
		}
	}
	return clamp(shadow, 0.0, 1.0);

}

#define AO_NUMSAMPLES 6
#define AO_STEPSIZE .1
#define AO_STEPSCALE .4

float calcAO(vec3 p, vec3 n)
{
	float ao = 0.0;
	float aoscale = 1.0;

	for (int aoi = 0; aoi < AO_NUMSAMPLES; aoi++)
	{
		float stepp = 0.01 + AO_STEPSIZE * float(aoi);
		vec3 aop = n * stepp + p;

		float d = scenedf(aop).x;
		ao += -(d - stepp)*aoscale;
		aoscale *= AO_STEPSCALE;
	}

	return clamp(ao, 0.0, 1.0);
}
// SHADING

struct SurfaceData
{
	vec3 point;
	vec3 normal;
	vec3 basecolor;
	float roughness;
	float metallic;
};

#define INITSURF(p, n) SurfaceData(p, n, vec3(0.), 0., 0.)

vec3 calcNormal(vec3 p)
{
	vec3 epsilon = vec3(0.001, 0.0, 0.0);
	vec3 n = vec3(
		scenedf(p + epsilon.xyy).x - scenedf(p - epsilon.xyy).x,
		scenedf(p + epsilon.yxy).x - scenedf(p - epsilon.yxy).x,
		scenedf(p + epsilon.yyx).x - scenedf(p - epsilon.yyx).x);
	return normalize(n);
}

void material(float surfid, inout SurfaceData surf)
{
	if (surfid - .5 < MAT_GUNWHITE)
	{
		surf.basecolor = vec3(.94);
		surf.roughness = .85;
		surf.metallic = .4;
	}
	else if (surfid - .5 < MAT_GUNGRAY)
	{
		surf.basecolor = vec3(0.1);
		surf.roughness = 6.;
		surf.metallic = .3;
	}
	else if (surfid - .5 < MAT_GUNBLACK)
	{
		surf.basecolor = vec3(.05);
		surf.roughness = .6;
		surf.metallic = .4;
	}
	else if (surfid - .5 < MAT_FUNNEL)
	{
		surf.basecolor = -vec3(.1, .3, .9);
		surf.roughness = 1.;
		surf.metallic = 0.;
	}
	else if (surfid - .5 < MAT_CHAMBER)
	{
		surf.basecolor = vec3(6.5);
		surf.roughness = 0.89;
		surf.metallic = 0.2;
	}
}

vec3 integrateDirLight(vec3 ldir, vec3 lcolor, SurfaceData surf)
{
	vec3 vdir = normalize(g_camOrigin - surf.point);
	vec3 hdir = normalize(ldir + vdir);

	float costh = max(-SMALL_FLOAT, dot(surf.normal, hdir));
	float costd = max(-SMALL_FLOAT, dot(ldir, hdir));
	float costl = max(-SMALL_FLOAT, dot(surf.normal, ldir));
	float costv = max(-SMALL_FLOAT, dot(surf.normal, vdir));

	float ndl = clamp(costl, 0., 1.);

	vec3 cout = vec3(0.);

	if (ndl > 0.)
	{
		float frk = .5 + 2.* costd*costd * surf.roughness;
		vec3 diff = surf.basecolor * ONE_OVER_PI * (1. + (frk - 1.)*pow5(1. - costl)) * (1. + (frk - 1.) * pow5(1. - costv));

		float r = max(0.05, surf.roughness);
		float alpha = r * r;
		float denom = costh*costh * (alpha*alpha - 1.) + 1.;
		float D = (alpha*alpha) / (PI * denom*denom);

		float k = ((r + 1.) * (r + 1.)) / 8.;
		float Gl = costv / (costv * (1. - k) + k);
		float Gv = costl / (costl * (1. - k) + k);
		float G = Gl * Gv;

		vec3 F0 = mix(vec3(.5), surf.basecolor, surf.metallic);
		vec3 F = F0 + (1. - F0) * pow5(1. - costd);

		vec3 spec = D * F * G / (4. * costl * costv);
		float shd = 1.0;
		calcSoftShadow(surf.point, ldir, 0.1, 20., 5.);

		cout += diff * ndl * shd * lcolor;
		cout += spec * ndl * shd * lcolor;
		//Rim Light
		//cout += clamp(pow(dot(vdir, -surf.normal) + 1.5, 3.5) * 0.05, 0.0, 1.0);
	}

	return cout;
}

vec3 sampleEnvLight(vec3 ldir, vec3 lcolor, SurfaceData surf)
{

	vec3 vdir = normalize(g_camOrigin - surf.point);
	vec3 hdir = normalize(ldir + vdir);
	float costh = dot(surf.normal, hdir);
	float costd = dot(ldir, hdir);
	float costl = dot(surf.normal, ldir);
	float costv = dot(surf.normal, vdir);

	float ndl = clamp(costl, 0., 1.);
	vec3 cout = vec3(0.);
	if (ndl > 0.)
	{
		float r = surf.roughness;
		float k = r*r / 2.;
		float Gl = costv / (costv * (1. - k) + k);
		float Gv = costl / (costl * (1. - k) + k);
		float G = Gl * Gv;

		vec3 F0 = mix(vec3(.5), surf.basecolor, surf.metallic);
		vec3 F = F0 + (1. - F0) * pow5(1. - costd);
		vec3 spec = lcolor * G * F * costd / (costh * costv);
		float shd = calcSoftShadow(surf.point, ldir, 0.02, 20., 7.);
		cout = spec * shd * lcolor;
	}

	return cout;
}

vec3 integrateEnvLight(SurfaceData surf)
{
	vec3 vdir = normalize(surf.point - g_camOrigin);
	vec3 envdir = reflect(vdir, surf.normal);
	vec4 specolor = vec4(.4) * mix(texture(iChannel0, envdir), texture(iChannel1, envdir), surf.roughness);

	vec3 envspec = sampleEnvLight(envdir, specolor.rgb, surf);
	return envspec;
}

vec3 shadeSurface(SurfaceData surf)
{

	vec3 amb = surf.basecolor * .01;
	float ao = calcAO(surf.point, surf.normal);

	vec3 centerldir = normalize(-surf.point);

	vec3 cout = vec3(0.);
	if (dot(surf.basecolor, vec3(-1.)) > SMALL_FLOAT) //Excursion Funnel
	{
		cout = -surf.basecolor * surf.point.x;// + (0.2 * surf.normal);

	}
	else
		if (dot(surf.basecolor, vec3(1.)) > SMALL_FLOAT)
		{
			vec3  dir1 = normalize(vec3(0.0, 0.9, 0.1));
			vec3  col1 = vec3(0.3, 0.5, .9);
			vec3  dir2 = normalize(vec3(0.1, -.1, 0.));
			vec3  col2 = vec3(0.94, 0.5, 0.2);
			cout += integrateDirLight(dir1, col1, surf);
			cout += integrateDirLight(dir2, .0*col2, surf);
			cout += integrateDirLight(g_ldir, vec3(0.4), surf);
			cout += integrateEnvLight(surf);
			cout *= (1. - (3.5 * ao));
		}
	return cout;

}
// **************************************************************************
// POSTPROCESSING
// **************************************************************************

vec3 vignette(vec3 texel, vec2 vUv, float darkness, float offset) {
	vec2 uv = (vUv - vec2(0.5)) * vec2(offset);
	return mix(texel.rgb, vec3(1.0 - darkness), dot(uv, uv));
}

vec3 overlay(vec3 inColor, vec3 overlay)
{
	vec3 outColor = vec3(0.);
	outColor.r = (inColor.r > 0.5) ? (1.0 - (1.0 - 2.0 * (inColor.r - 0.5)) * (1.0 - overlay.r)) : ((2.0 * inColor.r) * overlay.r);
	outColor.g = (inColor.g > 0.5) ? (1.0 - (1.0 - 2.0 * (inColor.g - 0.5)) * (1.0 - overlay.g)) : ((2.0 * inColor.g) * overlay.g);
	outColor.b = (inColor.b > 0.5) ? (1.0 - (1.0 - 2.0 * (inColor.b - 0.5)) * (1.0 - overlay.b)) : ((2.0 * inColor.b) * overlay.b);
	return outColor;
}

// **************************************************************************
// MAIN
// **************************************************************************

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
	// Animate globals
	animate();

	// Setup Camera
	CameraData cam = setupCamera(fragCoord);

	// ----------------------------------------------------------------------
	// SCENE MARCHING

	vec2 scenemarch = distmarch(cam.origin, cam.dir, DISTMARCH_MAXDIST);

	// ----------------------------------------------------------------------
	// SHADING

	vec3 scenecol = vec3(0.);
	if (scenemarch.y > SMALL_FLOAT)
	{
		vec3 mp = cam.origin + scenemarch.x * cam.dir;
		vec3 mn = calcNormal(mp);

		SurfaceData currSurf = INITSURF(mp, mn);

		material(scenemarch.y, currSurf);
		scenecol = shadeSurface(currSurf);
	}

	// distance fog
    vec2 nuv = (fragCoord.xy / iResolution.yy) * (iResolution.y/iResolution.x);
	vec2 vig = nuv - vec2(0.5, 0.36);
	float dvig = dot(vig, vig);
	scenecol = mix(scenecol, SKYORANGE, smoothstep(0., 10., scenemarch.y));
	scenecol = mix(scenecol, SKYBLUE, smoothstep(0., 15., scenemarch.x));
    scenecol += .87 - pow(dvig, 0.3);

	// Postprocessing

	scenecol = vignette(scenecol, nuv, 1.3, 0.9);
	scenecol += 0.5*vec3(nuv.y);
	fragColor.rgb = scenecol;
	fragColor.a = 1.;
}
