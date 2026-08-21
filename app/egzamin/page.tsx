"use client";

import { useEffect, useState } from "react";

export default function Egzamin() {
  const [czas, setCzas] = useState(90 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCzas((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const min = Math.floor(czas / 60);
  const sek = czas % 60;

  return (
    <main style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Egzamin próbny</h1>
      <h2 style={{ color: czas < 600 ? "red" : "green" }}>
        {min}:{sek.toString().padStart(2, "0")}
      </h2>

      <p>To jest wersja z odliczaniem 90 minut.</p>
    </main>
  );
}
