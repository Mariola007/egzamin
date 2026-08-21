"use client";

import Link from "next/link";

export default function EgzaminStart() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#060906",
        color: "#eef2e8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          border: "1px solid #243224",
          borderRadius: 24,
          background: "rgba(10,14,10,.9)",
          padding: 40,
        }}
      >
        <div
          style={{
            display: "inline-block",
            border: "1px solid #4d6a45",
            borderRadius: 999,
            padding: "8px 18px",
            color: "#b6c7a8",
            fontSize: 13,
            marginBottom: 20,
          }}
        >
          ● TRYB EGZAMINACYJNY
        </div>

        <h1 style={{ fontSize: 54, margin: "0 0 15px" }}>
          Egzamin Oficerski
        </h1>

        <p style={{ color: "#9fa89a", lineHeight: 1.7 }}>
          Oficjalna symulacja egzaminu.
          <br />
          Masz dokładnie 50 pytań oraz 90 minut.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 16,
            marginTop: 35,
          }}
        >
          {[
            ["50", "PYTAŃ"],
            ["90", "MINUT"],
            ["70%", "PRÓG"],
          ].map(([v, l]) => (
            <div
              key={l}
              style={{
                border: "1px solid #223222",
                borderRadius: 18,
                padding: 24,
                textAlign: "center",
                background: "#0a100a",
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 700 }}>{v}</div>
              <div style={{ color: "#7f8d7f", marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 35,
            border: "1px solid #2b3b2b",
            borderRadius: 18,
            padding: 22,
            background: "#081008",
          }}
        >
          <div style={{ color: "#b8c7b1", marginBottom: 10 }}>
            Zasady egzaminu
          </div>

          <ul style={{ lineHeight: 1.8, color: "#93a08f" }}>
            <li>50 losowych pytań.</li>
            <li>Jedna odpowiedź.</li>
            <li>90 minut.</li>
            <li>Po zakończeniu otrzymasz raport.</li>
          </ul>
        </div>

        <Link href="/egzamin/sesja">
          <button
            style={{
              width: "100%",
              marginTop: 35,
              padding: 20,
              borderRadius: 18,
              border: "none",
              background: "#d8e0c8",
              color: "#111",
              fontSize: 18,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Rozpocznij egzamin →
          </button>
        </Link>
      </div>
    </main>
  );
}
