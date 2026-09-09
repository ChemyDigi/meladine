"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function GuitarModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    const yOffset = 0.04;
    camera.position.set(0, yOffset, 4.75);

    // 3. Renderer Setup with transparent background
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 4. Orbit Controls (Locked to single horizontal rotation axis)
    const controls = new OrbitControls(camera, renderer.domElement);
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

    // 6. Ground Shadow Plane
    const targetHeight = 2.65;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.25)");
      gradient.addColorStop(0.35, "rgba(0, 0, 0, 0.09)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(canvas);
    const shadowGeo = new THREE.PlaneGeometry(2.15, 2.15);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -targetHeight / 2 + yOffset - 0.02;
    scene.add(shadowPlane);

    // 7. Load Guitar 3D Model
    const loader = new GLTFLoader();

    loader.load(
      "/models/electric_guitar.glb",
      (gltf) => {
        const root = gltf.scene;

        // 1. Calculate raw bounding box
        const box = new THREE.Box3().setFromObject(root);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // 2. Scale model to 2.10 units
        const scale = targetHeight / size.y;
        root.scale.setScalar(scale);

        // 3. Center the model with yOffset
        root.position.x = -center.x * scale;
        root.position.y = -center.y * scale + yOffset;
        root.position.z = -center.z * scale;
        root.rotation.set(0, 0, 0);

        scene.add(root);
        renderer.render(scene, camera);
        requestAnimationFrame(() => {
          setIsLoaded(true);
        });
      },
      undefined,
      (error) => {
        console.error("Error loading electric guitar 3D model:", error);
      }
    );

    // 8. Render Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    // 10. Pass-through Hit-testing & Click Forwarding for background piano letters
    let pointerDownPos: { x: number; y: number } | null = null;

    const onPointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!pointerDownPos) return;
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      pointerDownPos = null;

      // If it was a click/tap (not an orbit drag)
      if (dist < 6) {
        const elements = document.elementsFromPoint(e.clientX, e.clientY);
        const letterEl = elements.find(
          (el) => el.hasAttribute("data-piano-letter") || el.closest("[data-piano-letter]")
        );
        if (letterEl) {
          const target = (letterEl.closest("[data-piano-letter]") || letterEl) as HTMLElement;
          target.click();
        }
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.buttons > 0) return; // Don't trigger hover during active drag

      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      const letterEl = elements.find(
        (el) => el.hasAttribute("data-piano-letter") || el.closest("[data-piano-letter]")
      );

      const win = window as unknown as { __setMeladineHoveredLetter?: (idx: number | null) => void };

      if (letterEl) {
        const target = (letterEl.closest("[data-piano-letter]") || letterEl) as HTMLElement;
        const letterIdx = parseInt(target.getAttribute("data-piano-letter") || "-1", 10);
        if (letterIdx >= 0 && win.__setMeladineHoveredLetter) {
          win.__setMeladineHoveredLetter(letterIdx);
        }
        if (container) container.style.cursor = "pointer";
      } else {
        if (win.__setMeladineHoveredLetter) {
          win.__setMeladineHoveredLetter(null);
        }
        if (container) container.style.cursor = "grab";
      }
    };

    const onPointerLeave = () => {
      const win = window as unknown as { __setMeladineHoveredLetter?: (idx: number | null) => void };
      if (win.__setMeladineHoveredLetter) {
        win.__setMeladineHoveredLetter(null);
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    // 11. Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

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
