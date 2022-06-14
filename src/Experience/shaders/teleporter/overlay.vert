varying vec2 vUv;
uniform float uTime;

void main() {
	vUv = uv;
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(uTime + modelPosition.x * 100.0) * 0.09;
	vec4 viewPosition = viewMatrix * modelPosition;
	vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;


}

