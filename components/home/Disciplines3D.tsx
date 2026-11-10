"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

export type DisciplineCategory = "guitar" | "piano" | "vocals";

export const CATEGORIES: DisciplineCategory[] = ["guitar", "piano", "vocals"];

interface Disciplines3DProps {
  activeCategory: DisciplineCategory;
  onSelectCategory: (cat: DisciplineCategory) => void;
}

export default function Disciplines3D({
  activeCategory,
  onSelectCategory,
}: Disciplines3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const activeCategoryRef = useRef(activeCategory);
  activeCategoryRef.current = activeCategory;

  const onSelectCategoryRef = useRef(onSelectCategory);
  onSelectCategoryRef.current = onSelectCategory;

  const userRotationYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const previousPointerXRef = useRef(0);

  // Reset any manual drag rotation smoothly when instrument changes
  useEffect(() => {
    userRotationYRef.current = 0;
  }, [activeCategory]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDisposed = false;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 560;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.0, 4.6);

    // 3. Renderer with transparent background
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

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.7);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.5);
    fillLight.position.set(-5, 2, 4);
    scene.add(fillLight);

    const bottomBounce = new THREE.DirectionalLight(0xffffff, 1.0);
    bottomBounce.position.set(0, -3, 3);
    scene.add(bottomBounce);

    const rimLight = new THREE.DirectionalLight(0xed1438, 0.85);
    rimLight.position.set(0, 1, -4);
    scene.add(rimLight);

    // Studio Center Spotlight for punchy contrast on active instrument
    const centerSpot = new THREE.SpotLight(0xffffff, 3.4, 14, Math.PI / 3.8, 0.45, 1);
    centerSpot.position.set(0, 4.8, 3.8);
    centerSpot.target.position.set(0, 0, 0);
    scene.add(centerSpot);
    scene.add(centerSpot.target);

    // 5. Contact Shadows for Center, Left, and Right positions
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.22)");
      gradient.addColorStop(0.2, "rgba(0, 0, 0, 0.07)");
      gradient.addColorStop(0.45, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(canvas);
    const shadowMaterial = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });

    // Center shadow - sized and positioned safely within viewport frustum
    const centerShadow = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.2), shadowMaterial);
    centerShadow.rotation.x = -Math.PI / 2;
    centerShadow.position.set(0, -1.18, 0.05);
    scene.add(centerShadow);

    // Left shadow
    const leftShadow = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.0), shadowMaterial.clone());
    (leftShadow.material as THREE.MeshBasicMaterial).opacity = 0.25;
    leftShadow.rotation.x = -Math.PI / 2;
    leftShadow.position.set(-1.65, -1.05, -0.7);
    scene.add(leftShadow);

    // Right shadow
    const rightShadow = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.0), shadowMaterial.clone());
    (rightShadow.material as THREE.MeshBasicMaterial).opacity = 0.25;
    rightShadow.rotation.x = -Math.PI / 2;
    rightShadow.position.set(1.65, -1.05, -0.7);
    scene.add(rightShadow);

    // 6. Model Groups
    const groups: Record<DisciplineCategory, THREE.Group> = {
      guitar: new THREE.Group(),
      piano: new THREE.Group(),
      vocals: new THREE.Group(),
    };

    // Scaled up for imposing hero presentation
    const configs: Record<
      DisciplineCategory,
      {
        path: string;
        targetSize: number;
        preRot: [number, number, number];
        centerRot: [number, number, number];
        leftRot: [number, number, number];
        rightRot: [number, number, number];
        centerOffset: [number, number, number];
      }
    > = {
      guitar: {
        path: "/models/guitar.glb",
        targetSize: 2.35,
        preRot: [Math.PI / 2, 0, 0], // Upright: rotates face from +Y to +Z, neck to +Y
        centerRot: [0, 0, -(50 * Math.PI) / 180], // Rotated clockwise 50 degrees
        leftRot: [0, 0.42, -0.06], // Angled toward center
        rightRot: [0, -0.42, 0.06],
        centerOffset: [0, 0.02, 0],
      },
      piano: {
        path: "/models/electronic_piano_keyboard.glb",
        targetSize: 2.45,
        preRot: [0, 0, 0],
        centerRot: [0.45, 0, 0], // Tilted forward so keys and surface are visible
        leftRot: [0.32, 0.52, -0.12],
        rightRot: [0.32, -0.52, 0.12],
        centerOffset: [0, -0.05, 0],
      },
      vocals: {
        path: "/models/fredsters_microphone.glb",
        targetSize: 2.05,
        preRot: [0, 0, 0],
        centerRot: [-0.22, 0.4, 0.3], // Dynamic studio mic angle pointing up and right
        leftRot: [0.08, 0.72, -0.12], // Facing center
        rightRot: [0.08, -0.72, 0.12],
        centerOffset: [0, 0.04, 0],
      },
    };

    Object.values(groups).forEach((grp) => scene.add(grp));

    const clickableMeshes: { mesh: THREE.Object3D; category: DisciplineCategory }[] = [];

    // 7. Load GLTF Models (meshopt-compressed GLBs with WebP textures)
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    let loadedCount = 0;

    CATEGORIES.forEach((cat) => {
      const cfg = configs[cat];
      loader.load(
        cfg.path,
        (gltf) => {
          if (isDisposed) return;
          const root = gltf.scene;

          // Apply pre-rotation to fix raw model orientation
          root.rotation.set(...cfg.preRot);
          root.updateMatrixWorld(true);

          // Compute bounding box OF THE ROTATED MODEL
          const box = new THREE.Box3().setFromObject(root);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());

          // Scaling based on max dimension
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = cfg.targetSize / (maxDim || 1);
          root.scale.setScalar(scale);

          // Update matrix after scaling to get exact center offset
          root.updateMatrixWorld(true);
          const scaledBox = new THREE.Box3().setFromObject(root);
          const scaledCenter = scaledBox.getCenter(new THREE.Vector3());

          // Put root inside an inner wrapper to center it perfectly at (0, 0, 0)
          const innerWrapper = new THREE.Group();
          innerWrapper.add(root);
          root.position.x = -scaledCenter.x + cfg.centerOffset[0];
          root.position.y = -scaledCenter.y + cfg.centerOffset[1];
          root.position.z = -scaledCenter.z + cfg.centerOffset[2];

          // Set initial transform based on current slot
          const initialSlot = getSlot(cat);
          const isInitialActive = initialSlot === "center";

          if (initialSlot === "center") {
            groups[cat].position.set(0, 0, 0.3);
            groups[cat].scale.setScalar(1.22);
            groups[cat].rotation.set(...cfg.centerRot);
          } else if (initialSlot === "left") {
            groups[cat].position.set(-1.65, -0.05, -0.7);
            groups[cat].scale.setScalar(0.65);
            groups[cat].rotation.set(...cfg.leftRot);
          } else if (initialSlot === "right") {
            groups[cat].position.set(1.65, -0.05, -0.7);
            groups[cat].scale.setScalar(0.65);
            groups[cat].rotation.set(...cfg.rightRot);
          }

          // Collect clickable meshes & setup materials for white color fill transitions
          root.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              clickableMeshes.push({ mesh, category: cat });

              const mats = Array.isArray(mesh.material)
                ? mesh.material
                : [mesh.material];
              mats.forEach((mat) => {
                mat.transparent = true;
                mat.depthWrite = true;
                const stdMat = mat as THREE.MeshStandardMaterial;
                if (stdMat.color) {
                  stdMat.userData.origColor = stdMat.color.clone();
                }
                if (stdMat.emissive) {
                  stdMat.userData.origEmissive = stdMat.emissive.clone();
                }

                // Initialize white fill & opacity based on initial active status
                const initWhite = isInitialActive ? 0.0 : 0.82;
                stdMat.userData.currentWhite = initWhite;
                stdMat.opacity = isInitialActive ? 1.0 : 0.36;

                if (stdMat.emissive) {
                  stdMat.emissive.setRGB(initWhite, initWhite, initWhite);
                }
                if (stdMat.color && stdMat.userData.origColor) {
                  const orig = stdMat.userData.origColor;
                  stdMat.color.r = orig.r + (1.0 - orig.r) * initWhite;
                  stdMat.color.g = orig.g + (1.0 - orig.g) * initWhite;
                  stdMat.color.b = orig.b + (1.0 - orig.b) * initWhite;
                }
              });
            }
          });

          groups[cat].add(innerWrapper);

          loadedCount++;
          if (loadedCount === CATEGORIES.length) {
            setIsLoaded(true);
          }
        },
        undefined,
        (err) => {
          console.error(`Error loading 3D model for ${cat}:`, err);
        }
      );
    });

    // 8. Slot mapping
    const getSlot = (category: DisciplineCategory) => {
      const currentActive = activeCategoryRef.current;
      const activeIdx = CATEGORIES.indexOf(currentActive);
      const catIdx = CATEGORIES.indexOf(category);
      const relIdx = (catIdx - activeIdx + 3) % 3;

      if (relIdx === 0) return "center";
      if (relIdx === 1) return "right";
      return "left";
    };

    // 9. Pointer Controls
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let pointerDownStart = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      pointerDownStart = { x: e.clientX, y: e.clientY };
      previousPointerXRef.current = e.clientX;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousPointerXRef.current;
        previousPointerXRef.current = e.clientX;
        userRotationYRef.current += deltaX * 0.008;
      } else {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(
          clickableMeshes.map((m) => m.mesh)
        );
        if (intersects.length > 0) {
          const hit = clickableMeshes.find((m) => m.mesh === intersects[0].object);
          if (hit && hit.category !== activeCategoryRef.current) {
            container.style.cursor = "pointer";
            return;
          }
        }
        container.style.cursor = isDraggingRef.current ? "grabbing" : "grab";
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;

      const dist = Math.hypot(
        e.clientX - pointerDownStart.x,
        e.clientY - pointerDownStart.y
      );

      if (dist < 6) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(
          clickableMeshes.map((m) => m.mesh)
        );
        if (intersects.length > 0) {
          const hit = clickableMeshes.find((m) => m.mesh === intersects[0].object);
          if (hit && hit.category !== activeCategoryRef.current) {
            userRotationYRef.current = 0;
            onSelectCategoryRef.current(hit.category);
          }
        }
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Track responsive layout scale
    let responsiveSpacingX = 1.65;

    // 10. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const spreadX = responsiveSpacingX;

      CATEGORIES.forEach((cat) => {
        const grp = groups[cat];
        const slot = getSlot(cat);
        const cfg = configs[cat];

        let targetX = 0;
        let targetY = 0;
        let targetZ = 0;
        let targetScale = 1.0;
        const targetRot = new THREE.Euler(...cfg.centerRot);

        if (slot === "center") {
          targetX = 0;
          targetY = Math.sin(elapsedTime * 1.5) * 0.025 + 0.05;
          targetZ = 0.28;
          targetScale = 1.22;
          targetRot.set(
            cfg.centerRot[0],
            cfg.centerRot[1] + userRotationYRef.current,
            cfg.centerRot[2]
          );
        } else if (slot === "left") {
          targetX = -spreadX;
          targetY = -0.05 + Math.sin(elapsedTime * 1.2 + 1) * 0.02;
          targetZ = -0.7;
          targetScale = 0.65;
          targetRot.set(...cfg.leftRot);
        } else if (slot === "right") {
          targetX = spreadX;
          targetY = -0.05 + Math.sin(elapsedTime * 1.2 + 2) * 0.02;
          targetZ = -0.7;
          targetScale = 0.65;
          targetRot.set(...cfg.rightRot);
        }

        // Interpolations - smooth and responsive transitions
        grp.position.x += (targetX - grp.position.x) * 0.08;
        grp.position.y += (targetY - grp.position.y) * 0.08;
        grp.position.z += (targetZ - grp.position.z) * 0.08;

        const currentScale = grp.scale.x;
        const newScale = currentScale + (targetScale - currentScale) * 0.08;
        grp.scale.setScalar(newScale);

        grp.rotation.x += (targetRot.x - grp.rotation.x) * 0.08;
        grp.rotation.y += (targetRot.y - grp.rotation.y) * 0.08;
        grp.rotation.z += (targetRot.z - grp.rotation.z) * 0.08;

        // Smoothly interpolate white fill and reduced opacity for non-active models
        const isActive = slot === "center";
        const targetOpacity = isActive ? 1.0 : 0.36;
        const targetWhiteFill = isActive ? 0.0 : 0.82;

        grp.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const mats = Array.isArray(mesh.material)
              ? mesh.material
              : [mesh.material];
            mats.forEach((mat) => {
              // Smooth opacity transition
              mat.opacity += (targetOpacity - mat.opacity) * 0.08;
              mat.depthWrite = isActive;

              // Smooth white emissive fill
              const stdMat = mat as THREE.MeshStandardMaterial;
              if (stdMat.emissive) {
                if (stdMat.userData.currentWhite === undefined) {
                  stdMat.userData.currentWhite = 0;
                }
                stdMat.userData.currentWhite +=
                  (targetWhiteFill - stdMat.userData.currentWhite) * 0.08;
                const w = stdMat.userData.currentWhite;
                stdMat.emissive.setRGB(w, w, w);
              }

              // Smooth diffuse color tint towards white
              if (stdMat.color && stdMat.userData.origColor) {
                const orig = stdMat.userData.origColor;
                const curW = stdMat.userData.currentWhite ?? 0;
                stdMat.color.r = orig.r + (1.0 - orig.r) * curW;
                stdMat.color.g = orig.g + (1.0 - orig.g) * curW;
                stdMat.color.b = orig.b + (1.0 - orig.b) * curW;
              }
            });
          }
        });
      });

      if (!isDraggingRef.current && Math.abs(userRotationYRef.current) > 0.001) {
        userRotationYRef.current *= 0.985;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Responsive Resize - Preserve exact same composition on all aspect ratios
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;

      // When in portrait/mobile aspect ratio, adapt camera distance so all 3 instruments
      // fit tightly without massive empty white space above and below
      if (newWidth < 480) {
        camera.position.z = 5.6;
        responsiveSpacingX = 1.45;
        leftShadow.position.x = -1.45;
        rightShadow.position.x = 1.45;
      } else if (newWidth < 640) {
        camera.position.z = 5.2;
        responsiveSpacingX = 1.5;
        leftShadow.position.x = -1.5;
        rightShadow.position.x = 1.5;
      } else if (newWidth < 1024) {
        camera.position.z = 4.8;
        responsiveSpacingX = 1.6;
        leftShadow.position.x = -1.6;
        rightShadow.position.x = 1.6;
      } else {
        camera.position.z = 4.6;
        responsiveSpacingX = 1.65;
        leftShadow.position.x = -1.65;
        rightShadow.position.x = 1.65;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // 12. Cleanup
    return () => {
      isDisposed = true;
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[340px] xs:h-[380px] sm:h-[420px] md:h-[480px] lg:h-[500px] flex items-center justify-center select-none overflow-visible">
      {/* Loading Pulse */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-3 text-neutral-400">
            <div className="w-8 h-8 border-2 border-[#ed1438] border-t-transparent rounded-full animate-spin" />
            <span className="font-mono text-xs tracking-widest uppercase">
              // CALIBRATING 3D ACOUSTICS...
            </span>
          </div>
        </div>
      )}

      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700 ease-out will-change-transform ${isLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      />
    </div>
  );
}
