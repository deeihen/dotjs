"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// One fixed WebGL canvas behind the page. The cube flies between sections that carry
// data-cube="x,y,scale" (x/y as fractions of the half-viewport, scale 0 hides it);
// data-cube-m overrides on phones.

type Pose = { x: number; y: number; s: number };

function faceTexture(label: string, logo = false) {
  const c = document.createElement("canvas");
  c.width = c.height = 512;
  const g = c.getContext("2d")!;
  g.fillStyle = "#f7df1e";
  g.fillRect(0, 0, 512, 512);
  g.fillStyle = "#111";
  g.font = `600 ${logo ? 230 : 170}px ${getComputedStyle(document.body).fontFamily}`;
  g.textAlign = logo ? "right" : "center";
  g.textBaseline = "alphabetic";
  g.fillText(label, logo ? 470 : 256, logo ? 460 : 316);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function glyphSprite(text: string, color: string) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 128;
  const g = c.getContext("2d")!;
  g.fillStyle = color;
  g.font = `500 64px ${getComputedStyle(document.body).getPropertyValue("--font-geist-mono") || "monospace"}`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(text, 128, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false }));
  s.scale.set(1.1, 0.55, 1);
  return s;
}

function readPose(el: Element, mobile: boolean): Pose {
  const raw = (mobile && el.getAttribute("data-cube-m")) || el.getAttribute("data-cube") || "0,0,1";
  const [x, y, s] = raw.split(",").map(Number);
  return { x, y, s };
}

const smooth = (t: number) => t * t * (3 - 2 * t);

export default function Scene3D() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL: the page reads fine without the scene.
    }
    // Full-screen WebGL at 2x+ DPR is the biggest GPU cost; 1.5 is visually close.
    renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 768 ? 1.25 : 1.5));
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.55;

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 10;

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(4, 6, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0xffb020, 30, 20);
    rim.position.set(-4, -2, 3);
    scene.add(rim);

    // The cube: JS on the front, other faces carry syntax.
    const labels = ["{ }", "=>", "( )", "let", "JS", "</>"];
    const mats = labels.map(
      (l) =>
        new THREE.MeshPhysicalMaterial({
          map: faceTexture(l, l === "JS"),
          roughness: 0.28,
          metalness: 0.15,
          clearcoat: 1,
          clearcoatRoughness: 0.12,
        }),
    );
    const cube = new THREE.Mesh(new RoundedBoxGeometry(2, 2, 2, 5, 0.22), mats);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.25, 0.025, 16, 160),
      new THREE.MeshStandardMaterial({ color: 0xf7df1e, emissive: 0xf7df1e, emissiveIntensity: 0.6, metalness: 0.6, roughness: 0.3 }),
    );
    ring.rotation.x = Math.PI * 0.42;

    const orbit = new THREE.Group();
    ["const", "=>", "{ }", "let", "()", "if", "for", "===", "``", "[ ]"].forEach((g, i) => {
      const s = glyphSprite(g, i % 3 === 0 ? "#f7df1e" : "#d8d8de");
      const a = (i / 10) * Math.PI * 2;
      const r = 2.9 + (i % 3) * 0.35;
      s.position.set(Math.cos(a) * r, (i % 4) * 0.45 - 0.7, Math.sin(a) * r);
      s.material.opacity = 0.6;
      orbit.add(s);
    });
    const beads = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const b = new THREE.Mesh(
        new THREE.SphereGeometry(0.09 + (i % 3) * 0.05, 16, 16),
        new THREE.MeshStandardMaterial({ color: i % 2 ? 0xffffff : 0xf7df1e, roughness: 0.1, metalness: 0.2 }),
      );
      const a = (i / 6) * Math.PI * 2;
      b.position.set(Math.cos(a) * 2.25, 0, Math.sin(a) * 2.25);
      beads.add(b);
    }
    beads.rotation.x = ring.rotation.x - Math.PI / 2;

    const hero = new THREE.Group();
    hero.add(cube, ring, beads, orbit);
    scene.add(hero);

    // Dust for depth; drifts against the scroll.
    const count = innerWidth < 768 ? 350 : 900;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 4;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({ color: 0xf7df1e, size: 0.035, transparent: true, opacity: 0.55, depthWrite: false }),
    );
    scene.add(dust);

    let w = 0, h = 0, mobile = false;
    const resize = () => {
      w = innerWidth;
      h = innerHeight;
      mobile = w < 768;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    addEventListener("resize", resize);

    const mouse = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / w) * 2 - 1;
      mouse.y = (e.clientY / h) * 2 - 1;
    };
    addEventListener("pointermove", onMove);

    // Anchor positions in page coordinates, measured only when the layout changes,
    // so the frame loop never forces a layout read.
    let anchors: { top: number; bottom: number; c: number; p: Pose }[] = [];
    let maxScroll = 1;
    const measure = () => {
      anchors = [...document.querySelectorAll("[data-cube]")].map((el) => {
        const r = el.getBoundingClientRect();
        const top = r.top + scrollY;
        return { top, bottom: top + r.height, c: top + r.height / 2, p: readPose(el, mobile) };
      });
      maxScroll = Math.max(document.documentElement.scrollHeight - h, 1);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    measure();

    const current: Pose = { x: 0.45, y: 0, s: 0 };
    const target = (): Pose => {
      if (!anchors.length) return { x: 0, y: 0, s: 0 };
      const mid = h / 2;
      const pts = anchors.map((a) => ({ ...a, c: a.c - scrollY, top: a.top - scrollY, bottom: a.bottom - scrollY }));
      // Inside a section the cube holds its pose; between centres it travels.
      const inside = pts.find((p) => p.top <= mid && p.bottom >= mid && p.bottom - p.top > h * 1.5);
      if (inside) return inside.p;
      if (mid <= pts[0].c) return pts[0].p;
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i], b = pts[i + 1];
        if (mid >= a.c && mid <= b.c) {
          const t = smooth((mid - a.c) / (b.c - a.c));
          return { x: a.p.x + (b.p.x - a.p.x) * t, y: a.p.y + (b.p.y - a.p.y) * t, s: a.p.s + (b.p.s - a.p.s) * t };
        }
      }
      return pts[pts.length - 1].p;
    };

    const clock = new THREE.Clock();
    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      const goal = target();
      const k = reduce ? 1 : 1 - Math.pow(0.0025, dt);
      current.x += (goal.x - current.x) * k;
      current.y += (goal.y - current.y) * k;
      current.s += (goal.s - current.s) * k;

      const halfH = Math.tan(THREE.MathUtils.degToRad(17.5)) * camera.position.z;
      const halfW = halfH * camera.aspect;
      hero.position.set(current.x * halfW, -current.y * halfH, 0);
      const base = mobile ? 0.62 : 1;
      hero.scale.setScalar(Math.max(current.s * base, 0.0001));
      hero.visible = current.s > 0.01;

      const scroll = scrollY / maxScroll;
      if (!reduce) {
        cube.rotation.y = t * 0.35 + scroll * Math.PI * 6 + mouse.x * 0.35;
        cube.rotation.x = Math.sin(t * 0.6) * 0.15 + scroll * Math.PI * 2 + mouse.y * 0.25;
        orbit.rotation.y = -t * 0.25;
        beads.rotation.z = t * 0.5;
        ring.rotation.z = t * 0.2;
        hero.position.y += Math.sin(t * 1.2) * 0.08;
        dust.rotation.y = t * 0.01;
      } else {
        cube.rotation.set(-0.35, -0.6, 0);
      }
      dust.position.y = scroll * 14;
      camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y * 0.3 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    frame();
    canvas.dataset.ready = "1";

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        (Array.isArray(m.material) ? m.material : m.material ? [m.material] : []).forEach((mat) => {
          (mat as THREE.MeshStandardMaterial).map?.dispose();
          mat.dispose();
        });
      });
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-svh w-full" />;
}
