"use client";

import { useEffect, useRef, useState } from "react";

const VERT = `#version 300 es
layout(location=0) in vec2 pos;
void main(){ gl_Position = vec4(pos, 0.0, 1.0); }
`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
out vec4 O;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1.,0.)), u.x),
             mix(hash(i+vec2(0.,1.)), hash(i+vec2(1.,1.)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i=0;i<4;i++){ v += a*noise(p); p *= 2.03; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*u_res) / u_res.y;
  vec2 m = (u_mouse - 0.5) * 0.35;
  float t = u_time * 0.05;
  vec2 p = uv*1.6 + m;
  vec2 q = vec2(fbm(p+t), fbm(p+vec2(5.2,1.3)-t));
  float f = fbm(p + 2.5*q);
  vec3 lime = vec3(0.839, 0.992, 0.361);
  vec3 amber = vec3(1.0, 0.85, 0.55);
  float glow = smoothstep(0.35, 0.95, f);
  float vig = smoothstep(1.1, 0.25, length(uv));
  vec3 col = lime * (glow*0.14*vig) + amber * (pow(glow,3.0)*0.05*vig);
  O = vec4(col, clamp(glow*vig, 0.0, 1.0) * 0.9);
}
`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error("shader compile failed");
  return sh;
}

/**
 * Domain-warped noise backdrop in the brand palette, gently pushed
 * around by the cursor. Transparent canvas over the page background;
 * static gradient when WebGL is unavailable or motion is reduced.
 */
export default function ShaderBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGL2RenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl2", { alpha: true, antialias: false, depth: false });
      if (!gl) {
        setFailed(true);
        return;
      }
      const prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link failed");
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      const uRes = gl.getUniformLocation(prog, "u_res");
      const uTime = gl.getUniformLocation(prog, "u_time");
      const uMouse = gl.getUniformLocation(prog, "u_mouse");

      const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
      const onMove = (e: PointerEvent) => {
        mouse.tx = e.clientX / window.innerWidth;
        mouse.ty = 1 - e.clientY / window.innerHeight;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
        canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
        gl!.viewport(0, 0, canvas.width, canvas.height);
      };
      resize();
      window.addEventListener("resize", resize);

      let raf = 0;
      let visible = true;
      let running = true;
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && running) tick();
      });
      io.observe(canvas);
      const onVis = () => {
        running = document.visibilityState === "visible";
        if (running && visible) tick();
      };
      document.addEventListener("visibilitychange", onVis);

      const t0 = performance.now();
      const tick = () => {
        if (!running || !visible || !gl) return;
        mouse.x += (mouse.tx - mouse.x) * 0.04;
        mouse.y += (mouse.ty - mouse.y) * 0.04;
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, (performance.now() - t0) / 1000);
        gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        raf = requestAnimationFrame(tick);
      };
      tick();

      return () => {
        cancelAnimationFrame(raf);
        running = false;
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onMove);
        gl?.getExtension("WEBGL_lose_context")?.loseContext();
      };
    } catch {
      setFailed(true);
    }
  }, []);

  if (failed) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(214,253,92,0.07), transparent 70%)" }}
      />
    );
  }

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
