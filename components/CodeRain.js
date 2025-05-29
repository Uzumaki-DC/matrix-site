// components/CodeRain.js
import { useRef, useEffect } from "react";

export default function CodeRain({ active = true }) {
  const canvasRef = useRef(null);
  const activeRef = useRef(active);
  const dropsRef = useRef([]);
  const fontSize = 15;
  const chars =
    "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // Keep activeRef in sync
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / fontSize);
      dropsRef.current = Array(cols).fill(1);
    }

    function animate() {
      // Always request next frame
      requestAnimationFrame(animate);
      if (!activeRef.current) return;

      const drops = dropsRef.current;
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, x) => {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const posX = x * fontSize;
        const posY = y * fontSize;

        ctx.fillText(text, posX, posY);
        drops[x] = posY > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    }

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
}
