import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
    }
`;

const fragmentShader = `
    uniform float u_time;
    uniform vec2 u_resolution;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        
        // Colors inspired by the image
        vec3 colorTop = vec3(0.98, 0.98, 0.99); // Almost white at the top
        vec3 colorBottom = vec3(0.5, 0.75, 1.0); // Deeper blue at bottom
        vec3 colorPillarEdge = vec3(0.85, 0.92, 1.0); // Lighter edge color
        
        // --- Creating Distinct Vertical Pillars ---
        
        // Define how many pillars we want across the screen roughly
        float numPillars = 3.0; 
        
        // Scale x coordinate to create repeating domains for pillars
        float scaledX = st.x * numPillars;
        
        // Get the index of the current pillar (0, 1, 2...)
        float pillarIndex = floor(scaledX);
        
        // Get the local x coordinate within the current pillar (0.0 to 1.0)
        float localX = fract(scaledX);
        
        // Add slow horizontal movement to the pillars based on time
        // Offset each pillar slightly differently using its index
        float timeOffset = u_time * 0.05 + snoise(vec2(pillarIndex * 10.0, u_time * 0.02)) * 0.2;
        float movingLocalX = fract(scaledX + timeOffset);
        
        // Create a sharp edge by stepping the local x coordinate
        // This creates the distinct lines seen in the reference image
        // We soften it just a tiny bit to avoid aliasing, but keep it sharp
        float pillarIntensity = smoothstep(0.0, 0.05, movingLocalX) * (1.0 - smoothstep(0.95, 1.0, movingLocalX));
        
        // Create a gradient across each pillar to give it volume
        float pillarGradient = smoothstep(0.0, 1.0, movingLocalX);
        
        // --- Adding Noise for Texture and Variation ---
        
        // Noise that moves slowly upwards
        float noiseVal = snoise(vec2(st.x * 1.5, st.y * 2.0 - u_time * 0.1));
        
        // Modulate the pillar intensity with noise to make it less perfect
        pillarIntensity *= (noiseVal * 0.3 + 0.7);
        
        // --- Combining Elements ---
        
        // Base vertical gradient
        vec3 baseColor = mix(colorBottom, colorTop, st.y * 1.2); // * 1.2 pushes white down slightly
        
        // The color of the pillar itself, mixing between the edge color and the base color
        vec3 pillarColor = mix(baseColor, colorPillarEdge, pillarGradient * 0.5);
        
        // Mix the pillar structure onto the base color
        // The sharp transitions in 'pillarIntensity' will create the lines
        vec3 finalColor = mix(baseColor, pillarColor, pillarIntensity);
        
        // Fade everything to almost white at the very top
        float topFade = smoothstep(0.6, 0.95, st.y);
        finalColor = mix(finalColor, colorTop, topFade);

        // Optional: subtle overall glow near bottom
        float bottomGlow = smoothstep(0.5, 0.0, st.y) * smoothstep(0.0, 0.5, distance(st.x, 0.5));
        finalColor = mix(finalColor, vec3(0.6, 0.8, 1.0), bottomGlow * 0.2);

        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

export function AnimatedBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let camera: THREE.OrthographicCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let uniforms: any;
    let animationFrameId: number;
    let resizeObserver: ResizeObserver;

    const init = () => {
      // Camera setup (orthographic for 2D shader)
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      scene = new THREE.Scene();

      // Geometry setup (full screen quad)
      const geometry = new THREE.PlaneGeometry(2, 2);

      // Uniforms setup for the shader
      uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2() }
      };

      // Material setup using custom shaders
      const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        depthWrite: false,
        depthTest: false
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Renderer setup
      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      
      const width = mountRef.current!.clientWidth || window.innerWidth;
      const height = mountRef.current!.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      uniforms.u_resolution.value.x = width;
      uniforms.u_resolution.value.y = height;
      
      // Make sure the canvas takes up the full space
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';
      
      mountRef.current!.appendChild(renderer.domElement);

      resizeObserver = new ResizeObserver((entries) => {
        if (!entries || entries.length === 0) return;
        const { width, height } = entries[0].contentRect;
        if (width > 0 && height > 0) {
          renderer.setSize(width, height);
          uniforms.u_resolution.value.x = width;
          uniforms.u_resolution.value.y = height;
        }
      });
      
      resizeObserver.observe(mountRef.current!);
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      uniforms.u_time.value += 0.02;
      renderer.render(scene, camera);
    };

    init();
    animate();

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0 overflow-hidden bg-[#f8f9fa]" 
    />
  );
}
