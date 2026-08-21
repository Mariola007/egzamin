"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const examDate = new Date("2026-09-30T08:00:00").getTime();
  const [time, setTime] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  useEffect(() => {
    const i = setInterval(() => {
      const diff = examDate - Date.now();

      setTime({
        d: Math.max(0, Math.floor(diff / 86400000)),
        h: Math.max(0, Math.floor((diff % 86400000) / 3600000)),
        m: Math.max(0, Math.floor((diff % 3600000) / 60000)),
        s: Math.max(0, Math.floor((diff % 60000) / 1000)),
      });
    }, 1000);

    return () => clearInterval(i);
  }, []);

  const card = {
    background: "rgba(13,19,13,.92)",
    border: "1px solid rgba(212,175,55,.18)",
    borderRadius: 24,
    padding: 28,
    transition: ".25s",
    boxShadow: "0 0 30px rgba(212,175,55,.04)",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top,#0d150d 0%,#040704 70%)",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          padding: 40,
        }}
      >
        <div
          style={{
            border: "1px solid rgba(212,175,55,.18)",
            borderRadius: 32,
            padding: 40,
            background: "rgba(6,10,6,.92)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 0 50px rgba(212,175,55,.05)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid rgba(212,175,55,.25)",
              color: "#d4af37",
              marginBottom: 20,
            }}
          >
            ● SYSTEM PRZYGOTOWANIA
          </div>

          <h1
            style={{
              fontSize: 70,
              margin: "0 0 12px",
            }}
          >
            Egzamin Oficerski
          </h1>

          <p style={{ color: "#8f9a82" }}>
            PLAN 2026 • TRYB SZKOLENIOWY • 4 MODUŁY
          </p>

          <div
            style={{
              marginTop: 35,
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: 30,
            }}
          >
            <div
              style={{
                border: "1px solid rgba(212,175,55,.18)",
                borderRadius: 24,
                padding: 25,
              }}
            >
              <div style={{ color: "#8f9a82" }}>Termin egzaminu</div>

              <h2 style={{ marginTop: 8 }}>30 września 2026</h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: 12,
                  marginTop: 25,
                }}
              >
                {[
                  ["DNI", time.d],
                  ["GODZ", time.h],
                  ["MIN", time.m],
                  ["SEK", time.s],
                ].map(([l, v]) => (
                  <div
                    key={String(l)}
                    style={{
                      background: "#111611",
                      borderRadius: 18,
                      padding: 18,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 34,
                        fontWeight: "bold",
                        color: "#d4af37",
                      }}
                    >
                      {String(v).padStart(2, "0")}
                    </div>
                    <div style={{ color: "#7f8a74" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                border: "1px solid rgba(212,175,55,.18)",
                borderRadius: 24,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                  "radial-gradient(circle,#1d1b08 0%,#090d09 70%)",
              }}
            >
              <div
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  border: "2px solid rgba(212,175,55,.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 80,
                  color: "#d4af37",
                }}
              >
                <svg width="120" height="120" viewBox="0 0 120 120">
  <circle cx="60" cy="60" r="55" fill="none" stroke="#d4af37" strokeWidth="2"/>
  <path d="M60 20 L70 40 L60 95 L50 40 Z" fill="#d4af37"/>
  <path d="M38 58 Q60 42 82 58" fill="none" stroke="#d4af37" strokeWidth="3"/>
  <path d="M35 75 Q60 90 85 75" fill="none" stroke="#7b6520" strokeWidth="2"/>
</svg>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 60 }}>
          <div
            style={{
              color: "#8f9a82",
              letterSpacing: 3,
            }}
          >
            ŚCIEŻKA EGZAMINU
          </div>

          <h2
            style={{
              fontSize: 46,
              marginBottom: 35,
            }}
          >
            Wybierz etap
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 24,
            }}
          >
            <div style={card}>
              <div
                style={{
                  fontSize: 46,
                  color: "#d4af37",
                }}
              >
                🧠
              </div>
              <h3>Test wiedzy</h3>
              <p style={{ color: "#8f9a82" }}>
                615 pytań • losowanie 50 • egzamin 90 minut
              </p>

              <Link href="/egzamin">
                <button
                  style={{
                    marginTop: 18,
                    width: "100%",
                    padding: 16,
                    borderRadius: 14,
                    border: "none",
                    background: "#d4af37",
                    color: "#111",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Rozpocznij →
                </button>
              </Link>
            </div>

            <div style={card}>
              <div
                style={{
                  fontSize: 46,
                  color: "#d4af37",
                }}
              >
                📘
              </div>
              <h3>Teoria i praktyka</h3>
              <p style={{ color: "#8f9a82" }}>
                odpowiedzi ustne, checklisty i powtórki
              </p>
            </div>

            <div style={card}>
              <div
                style={{
                  fontSize: 46,
                  color: "#d4af37",
                }}
              >
                🎯
              </div>
              <h3>Musztra</h3>
              <p style={{ color: "#8f9a82" }}>
                22 zagadnienia krok po kroku
              </p>
            </div>

            <div style={card}>
              <div
                style={{
                  fontSize: 46,
                  color: "#d4af37",
                }}
              >
                ⭐
              </div>
              <h3>Pętla taktyczna</h3>
              <p style={{ color: "#8f9a82" }}>
                trening bez podpowiedzi i analiza błędów
              </p>
            </div>
          </div>
        </div>

        <footer
          style={{
            marginTop: 60,
            borderTop: "1px solid rgba(212,175,55,.15)",
            padding: "30px 0",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            textAlign: "center",
            color: "#8f9a82",
          }}
        >
          <div>
            <div
              style={{
                color: "#d4af37",
                fontSize: 28,
                fontWeight: "bold",
              }}
            >
              615+
            </div>
            Pytań
          </div>

          <div>
            <div
              style={{
                color: "#d4af37",
                fontSize: 28,
                fontWeight: "bold",
              }}
            >
              4
            </div>
            Moduły
          </div>

          <div>
            <div
              style={{
                color: "#d4af37",
                fontSize: 28,
                fontWeight: "bold",
              }}
            >
              50
            </div>
            Pytań na egzaminie
          </div>

          <div>
            <div
              style={{
                color: "#d4af37",
                fontSize: 28,
                fontWeight: "bold",
              }}
            >
              90
            </div>
            Minut
          </div>
        </footer>
      </div>
    </main>
  );
}
