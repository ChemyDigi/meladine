"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function InstrumentScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup (perfectly framed for entire guitar + stand)
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.32, 4.7);

    // 3. Renderer Setup with transparent background
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 4. Orbit Controls (Rotation locked strictly to horizontal X-axis drag)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.32, 0); // Focus on guitar center
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.enableZoom = false; // Prevent hijack of page scroll
    controls.autoRotate = false; // Do not auto-rotate

    // Lock vertical tilt completely to keep guitar strictly upright in plane
    // Only allows rotating horizontally when dragging along screen X-axis
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    // 5. Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    // Key front light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    // Soft fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(-4, 2, 4);
    scene.add(fillLight);

    // Subtle edge rim light
    const rimLight = new THREE.DirectionalLight(0xed1438, 0.8);
    rimLight.position.set(0, -2, -3);
    scene.add(rimLight);

    // 6. Ground Shadow Plane (positioned exactly at the base of the stand)
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.22)");
      gradient.addColorStop(0.35, "rgba(0, 0, 0, 0.08)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(canvas);
    const shadowGeo = new THREE.PlaneGeometry(2.0, 2.0);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.34; // Directly below the tripod feet
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

        // 2. Scale model so total height is 2.4 units for optimal hero framing
        const targetHeight = 2.4;
        const scale = targetHeight / size.y;
        root.scale.setScalar(scale);

        // 3. Center and lift model up by 0.32 units so the full stand and body sit high above the bottom
        const offsetY = 0.32;
        root.position.x = -center.x * scale;
        root.position.y = -center.y * scale + offsetY;
        root.position.z = -center.z * scale;

        // Place shadow plane directly beneath the tripod feet
        shadowPlane.position.y = (-center.y * scale) + offsetY;

        // 4. Planar orientation facing front level (no tilt or tumbling)
        root.rotation.set(0, 0, 0);

        scene.add(root);
        setIsLoaded(true);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const progress = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadingProgress(progress);
        }
      },
      (error) => {
        console.error("Error loading electric guitar 3D model:", error);
      }
    );

    // 8. Render Loop (Stationary in plane, no auto-rotation)
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

    window.addEventListener("resize", handleResize);

    // 10. Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[440px] sm:min-h-[520px] lg:min-h-[580px] flex items-center justify-center select-none">
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-neutral-300 border-t-black rounded-full animate-spin" />
          <div className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
            LOADING 3D GUITAR {loadingProgress > 0 && `${loadingProgress}%`}
          </div>
        </div>
      )}


    </div>
  );
}
