import * as THREE from "three";

/**
 * Checks whether WebGL or WebGL2 is supported and currently allowed by the browser.
 * Returns false if hardware acceleration is disabled, GPU drivers are blocked,
 * or the origin previously triggered WebGL context loss.
 */
export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    return Boolean(
      gl &&
        ((window.WebGLRenderingContext && gl instanceof WebGLRenderingContext) ||
          (window.WebGL2RenderingContext && gl instanceof WebGL2RenderingContext))
    );
  } catch {
    return false;
  }
}

/**
 * Safely creates a THREE.WebGLRenderer without throwing fatal runtime errors
 * or triggering Next.js dev server "Console Error" overlay modal dialogs when
 * WebGL context creation fails or is disabled in the browser.
 */
export function createSafeWebGLRenderer(
  parameters: THREE.WebGLRendererParameters = {}
): THREE.WebGLRenderer | null {
  if (!isWebGLAvailable()) {
    return null;
  }

  const originalConsoleError = console.error;
  let renderer: THREE.WebGLRenderer | null = null;

  try {
    // Intercept three.js internal console.error during WebGL context probe
    console.error = (...args: unknown[]) => {
      const first = typeof args[0] === "string" ? args[0] : "";
      if (first.includes("THREE.WebGLRenderer") || first.includes("WebGL")) {
        return;
      }
      originalConsoleError.apply(console, args);
    };

    // 1. Try preferred high-performance renderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        ...parameters,
      });
    } catch {
      // 2. Fallback to default low-spec renderer
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: false,
          alpha: true,
          powerPreference: "default",
          ...parameters,
        });
      } catch {
        renderer = null;
      }
    }
  } finally {
    console.error = originalConsoleError;
  }

  return renderer;
}

