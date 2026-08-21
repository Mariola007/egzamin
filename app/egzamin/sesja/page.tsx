"use client";

import { useEffect, useMemo, useState } from "react";
import pytania from "../../../data/questions.json";

const LIMIT = 50;
const CZAS = 90 * 60;

export default function SesjaEgzamin() {
  const lista = useMemo(() => {
    const kopia = [...(pytania as any[])];
    kopia.sort(() => Math.random() - 0.5);
    return kopia.slice(0, LIMIT);
  }, []);

  const [nr, setNr] = useState(0);
  const [odpowiedzi, setOdpowiedzi] = useState<Record<number, string>>({});
  const [czas, setCzas] = useState(CZAS);

  useEffect(() => {
    const t = setInterval(() => {
      setCzas((c) => {
        if (c <= 1) {
          clearInterval(t);
          window.location.href = "/egzamin/wynik";
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, []);

  const pyt = lista[nr];

  const min = String(Math.floor(czas / 60)).padStart(2, "0");
  const sek = String(czas % 60).padStart(2, "0");

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050805",
        color: "#eef2e8",
        fontFamily: "Arial",
        padding: 30,
      }}
    >
      <div style={{ maxWidth: 900, margin: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 25,
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ color: "#95a18f", fontSize: 13 }}>
              EGZAMIN OFICERSKI
            </div>
            <h1 style={{ margin: 0 }}>
              Pytanie {nr + 1}/{LIMIT}
            </h1>
          </div>

          <div
            style={{
              padding: "12px 22px",
              border: "1px solid #445544",
              borderRadius: 16,
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {min}:{sek}
          </div>
        </div>

        <div
          style={{
            height: 8,
            background: "#152015",
            borderRadius: 999,
            overflow: "hidden",
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: `${((nr + 1) / LIMIT) * 100}%`,
              height: "100%",
              background: "#c9d4b8",
            }}
          />
        </div>

        <div
          style={{
            border: "1px solid #243224",
            borderRadius: 24,
            padding: 30,
            background: "#081008",
          }}
        >
          <div style={{ color: "#8c9988", marginBottom: 10 }}>
            ID {pyt.id}
          </div>

          <h2 style={{ lineHeight: 1.5 }}>{pyt.question}</h2>

          <div
            style={{
              display: "grid",
              gap: 16,
              marginTop: 30,
            }}
          >
            {pyt.choices.map((odp: any) => {
              const wybrana = odpowiedzi[nr] === odp.key;

              return (
                <button
                  key={odp.key}
                  onClick={() =>
                    setOdpowiedzi({ ...odpowiedzi, [nr]: odp.key })
                  }
                  style={{
                    padding: 20,
                    textAlign: "left",
                    borderRadius: 18,
                    border: wybrana
                      ? "2px solid #d8e0c8"
                      : "1px solid #2c3a2c",
                    background: wybrana ? "#253325" : "#111811",
                    color: "white",
                    cursor: "pointer",
                    fontSize: 17,
                  }}
                >
                  <strong>{odp.key}.</strong> {odp.text}
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <button
            disabled={nr === 0}
            onClick={() => setNr(nr - 1)}
            style={{
              padding: "14px 24px",
              borderRadius: 16,
              border: "1px solid #2c3a2c",
              background: "#111811",
              color: "white",
            }}
          >
            ← Poprzednie
          </button>

          {nr === LIMIT - 1 ? (
            <button
              onClick={() => (window.location.href = "/egzamin/wynik")}
              style={{
                padding: "14px 30px",
                borderRadius: 16,
                border: "none",
                background: "#d8e0c8",
                color: "#111",
                fontWeight: 700,
              }}
            >
              Zakończ egzamin
            </button>
          ) : (
            <button
              onClick={() => setNr(nr + 1)}
              style={{
                padding: "14px 30px",
                borderRadius: 16,
                border: "none",
                background: "#d8e0c8",
                color: "#111",
                fontWeight: 700,
              }}
            >
              Następne →
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
