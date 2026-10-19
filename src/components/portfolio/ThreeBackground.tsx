import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/hooks/use-theme";

export const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. 3D Particle Starfield
    const particleCount = window.innerWidth < 768 ? 450 : 850;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const isDark = theme === "dark";
    const colorA = new THREE.Color(isDark ? 0x38bdf8 : 0x0284c7); // Cyan / Sky
    const colorB = new THREE.Color(isDark ? 0xa855f7 : 0x7c3aed); // Purple
    const colorC = new THREE.Color(isDark ? 0xec4899 : 0x6366f1); // Pink / Indigo

    for (let i = 0; i < particleCount; i++) {
      // Spread across 3D space
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      // Random color gradient between cyan, purple, and pink
      const mixRatio = Math.random();
      const pointColor = mixRatio < 0.5 ? colorA.clone().lerp(colorB, mixRatio * 2) : colorB.clone().lerp(colorC, (mixRatio - 0.5) * 2);

      colors[i * 3] = pointColor.r;
      colors[i * 3 + 1] = pointColor.g;
      colors[i * 3 + 2] = pointColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const particleMaterial = new THREE.PointsMaterial({
      size: window.innerWidth < 768 ? 1.4 : 1.8,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.75 : 0.55,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // 3. Floating 3D Geometric Wireframe Ring/Icosahedron (Hero cosmic artifact)
    const icosaGeometry = new THREE.IcosahedronGeometry(7.5, 1);
    const icosaMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.22 : 0.15,
    });
    const icosahedron = new THREE.Mesh(icosaGeometry, icosaMaterial);
    icosahedron.position.set(12, 2, -5);
    scene.add(icosahedron);

    // Outer orbital ring
    const ringGeometry = new THREE.TorusGeometry(11, 0.08, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0xa855f7 : 0x6366f1,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
    });
    const orbitalRing = new THREE.Mesh(ringGeometry, ringMaterial);
    orbitalRing.position.set(12, 2, -5);
    orbitalRing.rotation.x = Math.PI / 3;
    scene.add(orbitalRing);

    // 4. Mouse movement parallax tracking
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

    // 5. Handle Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Adjust 3D artifact position for mobile vs desktop
      if (width < 1024) {
        icosahedron.position.set(0, 5, -8);
        orbitalRing.position.set(0, 5, -8);
      } else {
        icosahedron.position.set(13, 1, -5);
        orbitalRing.position.set(13, 1, -5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      if (!prefersReducedMotion) {
        // Rotate particle starfield slowly
        particles.rotation.y = elapsedTime * 0.03 + currentMouseX * 0.2;
        particles.rotation.x = elapsedTime * 0.015 - currentMouseY * 0.15;

        // Rotate 3D icosahedron artifact
        icosahedron.rotation.x = elapsedTime * 0.15;
        icosahedron.rotation.y = elapsedTime * 0.2;

        // Rotate orbital ring
        orbitalRing.rotation.z = elapsedTime * 0.25;
        orbitalRing.rotation.x = Math.PI / 3 + currentMouseY * 0.2;
        orbitalRing.rotation.y = currentMouseX * 0.2;

        // Subtle camera float
        camera.position.x = currentMouseX * 3;
        camera.position.y = -currentMouseY * 3;
        camera.lookAt(scene.position);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      particleMaterial.dispose();
      icosaGeometry.dispose();
      icosaMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none -z-1 overflow-hidden"
      aria-hidden="true"
    />
  );
};
