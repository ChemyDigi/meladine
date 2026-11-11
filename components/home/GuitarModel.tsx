"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { createSafeWebGLRenderer } from "@/lib/threeSafeRenderer";

export default function GuitarModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDisposed = false;
    let animationFrameId: number;
    let controls: OrbitControls | null = null;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. Safe WebGL Renderer Setup (prevents unhandled context loss crashes and Next.js dev overlays)
    const renderer = createSafeWebGLRenderer();
    if (!renderer) {
      setHasWebGLError(true);
      return;
    }

    // 2. Scene Setup
    const scene = new THREE.Scene();

    // 3. Camera Setup
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    const yOffset = 0.04;
    camera.position.set(0, yOffset, 4.75);

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Prevent browser from blocking page if context loss occurs
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn("GuitarModel WebGL context lost; prevented browser block.");
    };
    renderer.domElement.addEventListener("webglcontextlost", handleContextLost, false);

    // 4. Orbit Controls (Locked to single horizontal rotation axis)
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, yOffset, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.enableZoom = false; // Prevent hijack of page scroll
    controls.autoRotate = false;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    // 5. Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.9);
    scene.add(ambientLight);

    // Key front light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    // Soft fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.3);
    fillLight.position.set(-4, 2, 4);
    scene.add(fillLight);

    // Subtle edge rim light (signature red accent)
    const rimLight = new THREE.DirectionalLight(0xed1438, 0.9);
    rimLight.position.set(0, -2, -3);
    scene.add(rimLight);

    // 6. Ground Shadow Plane (Reduced spread and opacity)
    const targetHeight = 2.65;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.20)");
      gradient.addColorStop(0.25, "rgba(0, 0, 0, 0.05)");
      gradient.addColorStop(0.6, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(canvas);
    const shadowGeo = new THREE.PlaneGeometry(1.25, 1.25);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -targetHeight / 2 + yOffset - 0.02;
    scene.add(shadowPlane);

    // 7. Load Guitar 3D Model (meshopt-compressed GLB with WebP textures)
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    loader.load(
      "/models/electric_guitar.glb",
      (gltf) => {
        if (isDisposed) return;
        const root = gltf.scene;

        // 1. Calculate raw bounding box
        const box = new THREE.Box3().setFromObject(root);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // 2. Scale model to targetHeight units
        const scale = targetHeight / (size.y || 1);
        root.scale.setScalar(scale);

        // 3. Center the model with yOffset
        root.position.x = -center.x * scale;
        root.position.y = -center.y * scale + yOffset;
        root.position.z = -center.z * scale;
        root.rotation.set(0, 0, 0);

        scene.add(root);
        renderer.render(scene, camera);
        requestAnimationFrame(() => {
          if (!isDisposed) setIsLoaded(true);
        });
      },
      undefined,
      (error) => {
        console.warn("Could not load electric guitar 3D model, falling back to 2D:", error);
        if (!isDisposed) setHasWebGLError(true);
      }
    );

    // 8. Render Loop
    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);
      controls?.update();
      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handler with responsive camera distance for mobile portrait
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;

      // Adjust camera distance for narrower viewports
      if (newWidth < 480) {
        camera.position.z = 5.6;
      } else if (newWidth < 768) {
        camera.position.z = 5.1;
      } else {
        camera.position.z = 4.75;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    window.addEventListener("resize", handleResize);

    // Initial camera distance sync
    handleResize();

    // 10. Pointer Interactions: Coordinate with Hero Letters
    let isInteracting = false;
    let startX = 0;

    const onPointerDown = (e: PointerEvent) => {
      isInteracting = true;
      startX = e.clientX;
    };

    const onPointerUp = () => {
      isInteracting = false;
      const win = window as unknown as { __setMeladineHoveredLetter?: (l: string | null) => void };
      if (typeof win.__setMeladineHoveredLetter === "function") {
        win.__setMeladineHoveredLetter(null);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isInteracting) return;
      const dx = e.clientX - startX;
      const letters = ["M", "E", "L", "A", "D", "I", "N", "E"];
      const step = 28;
      const index = Math.min(
        letters.length - 1,
        Math.max(0, Math.floor((dx + 112) / step))
      );
      const win = window as unknown as { __setMeladineHoveredLetter?: (l: string | null) => void };
      if (typeof win.__setMeladineHoveredLetter === "function") {
        win.__setMeladineHoveredLetter(letters[index]);
      }
    };

    const onPointerLeave = () => {
      const win = window as unknown as { __setMeladineHoveredLetter?: (l: string | null) => void };
      if (typeof win.__setMeladineHoveredLetter === "function") {
        win.__setMeladineHoveredLetter(null);
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    // 11. Cleanup
    return () => {
      isDisposed = true;
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(animationFrameId);

      if (controls) {
        controls.dispose();
      }

      if (renderer) {
        renderer.domElement.removeEventListener("webglcontextlost", handleContextLost);
        try {
          renderer.dispose();
          renderer.forceContextLoss();
        } catch {}
        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }

      // Deep dispose scene geometries & materials
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();
    };
  }, []);

  if (hasWebGLError) {
    return (
      <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
        <div className="relative w-full h-full max-h-[500px] flex items-center justify-center">
          <Image
            src="/images/3d/electric-guitar.png"
            alt="Meladine Guitar"
            fill
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 460px, 600px"
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Three.js Canvas Container with Smooth Pop-Up Entrance */}
      <div
        ref={containerRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          isLoaded
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-[0.84] translate-y-12 pointer-events-none"
        }`}
      />
    </div>
  );
}
