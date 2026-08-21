"use client";

import { useEffect, useState } from "react";
import questions from "../../data/questions.json";

export default function Nauka() {
  const [nr, setNr] = useState(0);
  const [wybrana, setWybrana] = useState<number | null>(null);

  const pyt = questions[nr];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: 25,
        fontFamily: "Arial"
      }}
    >
      <h1>📘 Tryb nauki</h1>

      <p>
        Pytanie {nr + 1} z {questions.length}
      </p>

      <div
        style={{
          background: "#1e293b",
          padding: 20,
          borderRadius: 16,
          marginTop: 20
        }}
      >
        <h2>{pyt.question}</h2>

        <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
          {pyt.choices.map((odp: any, i: number) => (
            <button
              key={i}
              onClick={() => setWybrana(i)}
              style={{
                padding: 14,
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                background:
                  wybrana === null
                    ? "#334155"
                    : i === pyt.correct
                    ? "#16a34a"
                    : i === wybrana
                    ? "#dc2626"
                    : "#334155",
                color: "white"
              }}
            >
              {odp}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            if (nr < questions.length - 1) {
              setNr(nr + 1);
              setWybrana(null);
            }
          }}
          style={{
            marginTop: 25,
            padding: "14px 24px",
            borderRadius: 12,
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer"
          }}
        >
          Następne pytanie →
        </button>
      </div>
    </main>
  );
}
