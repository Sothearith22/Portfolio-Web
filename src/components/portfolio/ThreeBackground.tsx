import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/hooks/use-theme";

interface TechIconConfig {
  label: string;
  color: string;
  secondaryColor?: string;
  sub?: string;
}

const PROGRAMMING_ICONS: TechIconConfig[] = [
  { label: "</>", color: "#38bdf8", sub: "Code" },
  { label: "⚛ React", color: "#00d8ff" },
  { label: "{ }", color: "#f59e0b", sub: "JSON" },
  { label: "TS", color: "#3178c6", sub: "TypeScript" },
  { label: "Python", color: "#60a5fa" },
  { label: "Spring", color: "#10b981", sub: "Boot" },
  { label: "Odoo", color: "#c084fc", sub: "ERP" },
  { label: "SQL", color: "#818cf8", sub: "Postgres" },
  { label: ">_ run", color: "#34d399", sub: "CLI" },
  { label: "API", color: "#f472b6", sub: "REST" },
  { label: "git", color: "#fb923c", sub: "Branch" },
  { label: "Laravel", color: "#fb7185" },
  { label: "Docker", color: "#38bdf8" },
  { label: "Tailwind", color: "#22d3ee" },
  { label: "/* */", color: "#94a3b8", sub: "Comment" },
  { label: "Node.js", color: "#4ade80" },
  { label: "Java", color: "#f87171" },
  { label: "HTML5", color: "#fb923c" },
];

// Helper to create a crisp 2D canvas texture for a 3D programming icon badge
function createCodeIconTexture(icon: TechIconConfig, isDark: boolean): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 100;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // 1. Draw Glass Pill Background
    const x = 12;
    const y = 12;
    const w = 232;
    const h = 76;
    const radius = 22;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    // Glass fill
    ctx.fillStyle = isDark ? "rgba(13, 20, 36, 0.85)" : "rgba(245, 248, 255, 0.9)";
    ctx.fill();

    // Glowing Neon Border
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = icon.color;
    ctx.shadowColor = icon.color;
    ctx.shadowBlur = 14;
    ctx.stroke();
    ctx.restore();

    // 2. Main Icon / Text Label
    ctx.save();
    ctx.font = "bold 30px 'JetBrains Mono', Consolas, monospace";
    ctx.fillStyle = isDark ? "#ffffff" : "#0f172a";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (icon.sub) {
      // Main text slightly up
      ctx.fillText(icon.label, 128, 44);

      // Subtitle tag
      ctx.font = "bold 16px 'JetBrains Mono', Consolas, monospace";
      ctx.fillStyle = icon.color;
      ctx.fillText(icon.sub, 128, 66);
    } else {
      ctx.fillText(icon.label, 128, 50);
    }

    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Helper to generate a soft glowing star dust texture
function createStarTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.2, "rgba(56, 189, 248, 0.85)");
    gradient.addColorStop(0.6, "rgba(168, 85, 247, 0.35)");
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

    // 2. Floating 3D Programming Icons (Three.js Sprites in 3D Space)
    const iconSprites: {
      sprite: THREE.Sprite;
      initialX: number;
      initialY: number;
      initialZ: number;
      speedX: number;
      speedY: number;
      phase: number;
    }[] = [];

    const activeIcons = window.innerWidth < 768 ? PROGRAMMING_ICONS.slice(0, 10) : PROGRAMMING_ICONS;

    activeIcons.forEach((iconDef, idx) => {
      const texture = createCodeIconTexture(iconDef, isDark);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: isDark ? 0.72 : 0.6,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(spriteMaterial);

      // Distribute randomly across 3D coordinates
      // Ensure we keep clearance away from central face / text
      let posX = (Math.random() - 0.5) * 80;
      let posY = (Math.random() - 0.5) * 60;
      const posZ = -12 - Math.random() * 32; // Depth plane

      // Keep face area clear: portrait is around x: 12, y: 0
      if (posX > 4 && posX < 22 && posY > -14 && posY < 14) {
        posX = posX < 13 ? -18 - Math.random() * 15 : 28 + Math.random() * 15;
      }

      // Sprite size in 3D space
      const scaleX = window.innerWidth < 768 ? 5.2 : 6.4;
      const scaleY = scaleX * (100 / 256);
      sprite.scale.set(scaleX, scaleY, 1);
      sprite.position.set(posX, posY, posZ);

      scene.add(sprite);

      iconSprites.push({
        sprite,
        initialX: posX,
        initialY: posY,
        initialZ: posZ,
        speedX: 0.25 + Math.random() * 0.35,
        speedY: 0.3 + Math.random() * 0.45,
        phase: (idx / activeIcons.length) * Math.PI * 2,
      });
    });

    // 3. Subtle Ambient 3D Star Dust Background
    const starCount = window.innerWidth < 768 ? 90 : 180;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starTexture = createStarTexture();

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 85;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 65;
      starPositions[i * 3 + 2] = -15 - Math.random() * 40;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: window.innerWidth < 768 ? 1.4 : 1.8,
      map: starTexture,
      transparent: true,
      opacity: isDark ? 0.5 : 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starParticles = new THREE.Points(starGeometry, starMaterial);
    scene.add(starParticles);

    // 4. Subtle Orbital Ring Accentuating Avatar in 3D Space
    const ringGeo = new THREE.TorusGeometry(11, 0.035, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0ea5e9,
      transparent: true,
      opacity: isDark ? 0.3 : 0.15,
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing.position.set(13, 0, -20);
    orbitalRing.rotation.x = Math.PI / 3;
    scene.add(orbitalRing);

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

    // 6. Handle Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (width < 1024) {
        orbitalRing.position.set(0, 6, -22);
      } else {
        orbitalRing.position.set(13, 0, -20);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      if (!prefersReducedMotion) {
        // Animate each 3D Programming Icon Badge
        iconSprites.forEach((item) => {
          // Floating harmonic oscillation
          const floatY = Math.sin(elapsedTime * item.speedY + item.phase) * 1.6;
          const floatX = Math.cos(elapsedTime * item.speedX + item.phase) * 1.2;

          // Parallax displacement based on depth Z
          const depthFactor = (item.initialZ + 50) / 40;
          const parallaxX = currentMouseX * 3.5 * depthFactor;
          const parallaxY = -currentMouseY * 3 * depthFactor;

          item.sprite.position.x = item.initialX + floatX + parallaxX;
          item.sprite.position.y = item.initialY + floatY + parallaxY;

          // Gentle tilt oscillation
          item.sprite.material.rotation = Math.sin(elapsedTime * 0.4 + item.phase) * 0.06;
        });

        // Rotate ambient star particles & ring
        starParticles.rotation.y = elapsedTime * 0.02 + currentMouseX * 0.1;
        starParticles.rotation.x = elapsedTime * 0.01 - currentMouseY * 0.08;

        orbitalRing.rotation.z += 0.003;
        orbitalRing.rotation.y = currentMouseX * 0.2;

        // Camera float
        camera.position.x = currentMouseX * 2;
        camera.position.y = -currentMouseY * 1.8;
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

      iconSprites.forEach((item) => {
        item.sprite.material.map?.dispose();
        item.sprite.material.dispose();
      });

      starGeometry.dispose();
      starMaterial.dispose();
      starTexture.dispose();
      ringGeo.dispose();
      ringMat.dispose();
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
