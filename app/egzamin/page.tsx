"use client";

import { useEffect, useState } from "react";

export default function Egzamin() {
  const [czas, setCzas] = useState(90 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCzas((c) => (c > 0 ? c - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const min = Math.floor(czas / 60);
  const sek = czas % 60;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        padding: 30,
        fontFamily: "Arial"
      }}
    >
      <h1>Egzamin próbny</h1>

      <div
        style={{
          fontSize: 56,
          fontWeight: "bold",
          color: czas < 300 ? "#ef4444" : "white",
          margin: "30px 0"
        }}
      >
        {String(min).padStart(2, "0")}:{String(sek).padStart(2, "0")}
      </div>

      <p>Czas egzaminu: 90 minut.</p>

      <a href="/" style={{ color: "#60a5fa" }}>
        ← Powrót
      </a>
    </main>
  );
}
