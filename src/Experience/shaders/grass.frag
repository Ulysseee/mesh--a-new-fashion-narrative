varying vec2 vUv;

void main() {
	vec3 baseColor = vec3( 0.259,0.812,0.345 );
	float clarity = ( vUv.y * 0.875 ) + 0.125;
	gl_FragColor = vec4( baseColor * clarity, 1 );
}
