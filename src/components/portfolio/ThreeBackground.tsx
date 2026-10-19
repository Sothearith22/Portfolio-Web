import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/hooks/use-theme";

// Helper to generate a soft, circular glowing particle sprite texture
function createParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.2, "rgba(56, 189, 248, 0.85)");
    gradient.addColorStop(0.5, "rgba(168, 85, 247, 0.4)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      1,
      1000
    );
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const isDark = theme === "dark";
    const particleTexture = createParticleTexture();

    // 2. Interactive 3D Cosmic Constellation Nodes
    const particleCount = window.innerWidth < 768 ? 120 : 220;
    const maxDistance = window.innerWidth < 768 ? 12 : 15;

    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(isDark ? 0x38bdf8 : 0x0284c7);
    const purpleColor = new THREE.Color(isDark ? 0xa855f7 : 0x7c3aed);
    const pinkColor = new THREE.Color(isDark ? 0xec4899 : 0x4f46e5);

    for (let i = 0; i < particleCount; i++) {
      // Confine X, Y, Z so particles never clip into the camera lens
      const x = (Math.random() - 0.5) * 85;
      const y = (Math.random() - 0.5) * 65;
      const z = -10 - Math.random() * 45; // Safe distance behind content

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.04,
        y: (Math.random() - 0.5) * 0.04,
        z: (Math.random() - 0.5) * 0.02,
      });

      const mixRatio = Math.random();
      const col = mixRatio < 0.5 
        ? cyanColor.clone().lerp(purpleColor, mixRatio * 2) 
        : purpleColor.clone().lerp(pinkColor, (mixRatio - 0.5) * 2);

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Points Material: Round glowing texture with clamped size
    const particleMaterial = new THREE.PointsMaterial({
      size: window.innerWidth < 768 ? 1.8 : 2.4,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.75 : 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 3. Constellation Dynamic Line Segments
    const maxLines = (particleCount * (particleCount - 1)) / 2;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    linesGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.28 : 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(linesMesh);

    // 4. Elegant 3D Celestial Orbital Gyroscope Rings (Clean, non-obtrusive geometry)
    const ringGroup = new THREE.Group();

    // Ring 1 (Cyan neon)
    const ring1Geo = new THREE.TorusGeometry(10, 0.04, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0ea5e9,
      transparent: true,
      opacity: isDark ? 0.35 : 0.2,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 4;
    ringGroup.add(ring1);

    // Ring 2 (Purple neon)
    const ring2Geo = new THREE.TorusGeometry(12.5, 0.035, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: isDark ? 0xa855f7 : 0x8b5cf6,
      transparent: true,
      opacity: isDark ? 0.25 : 0.15,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    ringGroup.add(ring2);

    ringGroup.position.set(13, 0, -18);
    scene.add(ringGroup);

    // 5. Mouse Parallax Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetMouseX = (event.clientX / innerWidth - 0.5) * 2;
      targetMouseY = (event.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 6. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Adjust rings for mobile vs desktop
      if (width < 1024) {
        ringGroup.position.set(0, 6, -22);
        ringGroup.scale.set(0.7, 0.7, 0.7);
      } else {
        ringGroup.position.set(14, 0, -18);
        ringGroup.scale.set(1, 1, 1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      if (!prefersReducedMotion) {
        // Rotate celestial orbital rings
        ring1.rotation.z += delta * 0.2;
        ring1.rotation.x += delta * 0.1;
        ring2.rotation.y += delta * 0.18;
        ring2.rotation.z -= delta * 0.12;

        ringGroup.rotation.y = currentMouseX * 0.3;
        ringGroup.rotation.x = -currentMouseY * 0.25;

        // Animate particles & dynamic constellation lines
        const posAttr = particleGeometry.getAttribute("position") as THREE.BufferAttribute;
        const positionsArr = posAttr.array as Float32Array;

        let lineVertexCount = 0;

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;

          // Update position with velocity
          positionsArr[idx] += particleVelocities[i].x;
          positionsArr[idx + 1] += particleVelocities[i].y;
          positionsArr[idx + 2] += particleVelocities[i].z;

          // Bounds bounce
          if (positionsArr[idx] < -45 || positionsArr[idx] > 45) particleVelocities[i].x *= -1;
          if (positionsArr[idx + 1] < -35 || positionsArr[idx + 1] > 35) particleVelocities[i].y *= -1;
          if (positionsArr[idx + 2] < -55 || positionsArr[idx + 2] > -10) particleVelocities[i].z *= -1;

          // Connect nearby particles with subtle glowing lines
          for (let j = i + 1; j < particleCount; j++) {
            const jdx = j * 3;
            const dx = positionsArr[idx] - positionsArr[jdx];
            const dy = positionsArr[idx + 1] - positionsArr[jdx + 1];
            const dz = positionsArr[idx + 2] - positionsArr[jdx + 2];
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < maxDistance * maxDistance) {
              const alpha = 1.0 - Math.sqrt(distSq) / maxDistance;

              linePositions[lineVertexCount * 3] = positionsArr[idx];
              linePositions[lineVertexCount * 3 + 1] = positionsArr[idx + 1];
              linePositions[lineVertexCount * 3 + 2] = positionsArr[idx + 2];

              lineColors[lineVertexCount * 3] = colors[idx] * alpha;
              lineColors[lineVertexCount * 3 + 1] = colors[idx + 1] * alpha;
              lineColors[lineVertexCount * 3 + 2] = colors[idx + 2] * alpha;

              linePositions[(lineVertexCount + 1) * 3] = positionsArr[jdx];
              linePositions[(lineVertexCount + 1) * 3 + 1] = positionsArr[jdx + 1];
              linePositions[(lineVertexCount + 1) * 3 + 2] = positionsArr[jdx + 2];

              lineColors[(lineVertexCount + 1) * 3] = colors[jdx] * alpha;
              lineColors[(lineVertexCount + 1) * 3 + 1] = colors[jdx + 1] * alpha;
              lineColors[(lineVertexCount + 1) * 3 + 2] = colors[jdx + 2] * alpha;

              lineVertexCount += 2;
            }
          }
        }

        posAttr.needsUpdate = true;

        linesGeometry.setDrawRange(0, lineVertexCount);
        (linesGeometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
        (linesGeometry.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true;

        // Subtle camera float
        camera.position.x = currentMouseX * 2.5;
        camera.position.y = -currentMouseY * 2;
        camera.lookAt(0, 0, -25);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      linesGeometry.dispose();
      lineMaterial.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
};
