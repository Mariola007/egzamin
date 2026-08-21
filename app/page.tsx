"use client";

import { useEffect, useMemo, useState } from "react";

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

      const dni = Math.floor(diff / 86400000);
      const godz = Math.floor((diff / 3600000) % 24);
      const min = Math.floor((diff / 60000) % 60);
      const sek = Math.floor((diff / 1000) % 60);

      setCzas(`${dni} dni ${godz} h ${min} min ${sek} s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats = useMemo(() => {
    if (typeof window === "undefined")
      return { mastered: 0, wrong: 0 };

    const s = JSON.parse(localStorage.getItem("stats") || "{}");
    return {
      mastered: s.mastered || 0,
      wrong: s.wrong || 0,
    };
  }, []);

  return (
    <main
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        padding: 18,
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          display: "grid",
          gap: 18,
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: 22,
            padding: 24,
          }}
        >
          <h1 style={{ marginTop: 0 }}>Egzamin Oficerski</h1>

          <p style={{ color: "#666" }}>
            Odliczanie do 8 września
          </p>

          <h2>{czas}</h2>

          <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
            <a href="/nauka">
              <button
                style={btnPrimary}
              >
                Rozpocznij naukę
              </button>
            </a>

            <a href="/egzamin">
              <button style={btnSecondary}>
                Symulacja egzaminu
              </button>
            </a>
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: 22,
            padding: 22,
          }}
        >
          <h3>Statystyki</h3>

          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 12,
            }}
          >
            <Stat label="Opanowane" value={stats.mastered} />
            <Stat label="Do poprawy" value={stats.wrong} />
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: 22,
            padding: 22,
          }}
        >
          <row justify=between align=center>
            <h3 style={{ margin: 0 }}>
              Top 20 do poprawy
            </h3>
            <badge label="0" />
          </row>

          <p style={{ color: "#777" }}>
            Tu pojawią się najczęściej
            błędnie zaznaczane pytania.
          </p>
        </div>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div
      style={{
        flex: 1,
        border: "1px solid #eee",
        borderRadius: 18,
        padding: 16,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
        }}
      >
        {value}
      </div>

      <div style={{ color: "#666" }}>
        {label}
      </div>
    </div>
  );
}

const btnPrimary = {
  width: "100%",
  padding: 16,
  borderRadius: 16,
  background: "black",
  color: "white",
  border: 0,
  fontSize: 18,
};

const btnSecondary = {
  width: "100%",
  padding: 16,
  borderRadius: 16,
  background: "white",
  border: "2px solid #ddd",
  fontSize: 18,
};
