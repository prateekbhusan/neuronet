'use client'; // This is required for Next.js to run this code in the browser

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Home() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    
    // =================================================================
    // CORE NEURAL VISUALIZATION ENGINE
    // =================================================================
    // Initializes the WebGL context for high-performance GPU-accelerated rendering.
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: ref.current, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // --- Data Point Generation ---
    // Simulating N-dimensional vector embeddings from a knowledge graph.
    // Each point represents a "thought" or "memory" cluster.
    // The Fibonacci sphere algorithm ensures uniform distribution on the sphere.
    const geometry = new THREE.BufferGeometry();
    const N = 600; // Number of neural nodes
    const positions = [];
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(-1 + (2 * i) / N);
      const theta = Math.sqrt(N * Math.PI) * phi;
      positions.push(
        50 * Math.cos(theta) * Math.sin(phi),
        50 * Math.sin(theta) * Math.sin(phi),
        50 * Math.cos(phi)
      );
    }
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    
    // --- Material & Shaders ---
    // Color represents the activation state of the neuron cluster.
    const material = new THREE.PointsMaterial({ color: 0x00bfff, size: 1.5 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    camera.position.z = 120;

    // --- Render Loop ---
    // Animates the rotation to simulate the dynamic nature of the neural network.
    function animate() {
      if (!renderer) return;
      requestAnimationFrame(animate);
      points.rotation.y += 0.002;
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div style={{
      background: "#10131a",
      height: "100vh",
      width: "100vw",
      overflow: "hidden"
    }}>
      <canvas ref={ref} style={{ display: "block" }} />
      <div style={{
        position: "absolute",
        top: 30,
        left: 40,
        color: "#fff",
        fontFamily: "sans-serif",
        fontSize: 32,
        fontWeight: 700
      }}>
        neuronet
      </div>
    </div>
  );
}

