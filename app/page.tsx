"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [czas, setCzas] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const cel = new Date("2026-09-08T00:00:00");
      const teraz = new Date();
      const diff = cel.getTime() - teraz.getTime();

      if (diff <= 0) {
        setCzas("Powodzenia na egzaminie!");
        return;
      }

      const dni = Math.floor(diff / (1000 * 60 * 60 * 24));
      const godz = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const min = Math.floor((diff / (1000 * 60)) % 60);
      const sek = Math.floor((diff / 1000) % 60);

      setCzas(`${dni} dni ${godz} h ${min} min ${sek} s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: 20,
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: 500,
          margin: "0 auto",
          background: "white",
          borderRadius: 20,
          padding: 24,
          boxShadow: "0 8px 24px rgba(0,0,0,.08)",
        }}
      >
        <h1>Egzamin Oficerski</h1>

        <p>Odliczanie do 8 września</p>

        <h2>{czas}</h2>

        <div style={{ display: "grid", gap: 12, marginTop: 30 }}>
          <a href="/nauka">
            <button
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 14,
                border: 0,
                background: "black",
                color: "white",
                fontSize: 18,
              }}
            >
              Rozpocznij naukę
            </button>
          </a>

          <button
            style={{
              width: "100%",
              padding: 16,
              borderRadius: 14,
              background: "white",
              border: "2px solid #ddd",
              fontSize: 18,
            }}
          >
            Symulacja egzaminu
          </button>
        </div>

        <div
          style={{
            marginTop: 30,
            background: "#fafafa",
            padding: 16,
            borderRadius: 16,
          }}
        >
          <h3>Statystyki</h3>
          <p>Opanowane: 0</p>
          <p>Do poprawy: 0</p>
        </div>
      </div>
    </main>
  );
}
