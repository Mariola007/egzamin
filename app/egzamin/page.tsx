"use client";

import { useMemo, useState } from "react";
import pytania from "../../data/questions.json";

export default function Egzamin() {
  const lista = useMemo(() => [...(pytania as any[])].slice(0, 615), []);
  const [nr, setNr] = useState(0);
  const [odp, setOdp] = useState<{ [k: number]: string }>({});
  const [koniec, setKoniec] = useState(false);

  const pyt = lista[nr];

  const wynik = lista.reduce(
    (s, p, i) => s + (odp[i] === p.correctKey ? 1 : 0),
    0
  );

  if (koniec) {
    return (
      <main style={{ padding: 20, fontFamily: "Arial" }}>
        <h1>Wynik egzaminu</h1>
        <h2>{wynik} / {lista.length}</h2>
        <p>{wynik >= 430 ? "✅ ZALICZONE" : "❌ NIEZALICZONE"}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 20, fontFamily: "Arial", maxWidth: 900 }}>
      <h1>Egzamin Oficerski</h1>

      <p>Pytanie {nr + 1} z {lista.length}</p>

      <div style={{ background: "#f4f4f4", padding: 20, borderRadius: 12 }}>
        <h2>{pyt.question}</h2>

        <div style={{ display: "grid", gap: 12 }}>
          {pyt.choices.map((o: any) => (
            <button
              key={o.key}
              onClick={() =>
                setOdp({ ...odp, [nr]: o.key })
              }
              style={{
                padding: 14,
                textAlign: "left",
                borderRadius: 8,
                border: "1px solid #ccc",
                background:
                  odp[nr] === o.key ? "#2563eb" : "white",
                color: odp[nr] === o.key ? "white" : "black",
                cursor: "pointer",
              }}
            >
              {o.key}. {o.text}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button disabled={nr === 0} onClick={() => setNr(nr - 1)}>
          Poprzednie
        </button>

        {nr < lista.length - 1 ? (
          <button onClick={() => setNr(nr + 1)}>Następne</button>
        ) : (
          <button onClick={() => setKoniec(true)}>Zakończ egzamin</button>
        )}
      </div>
    </main>
  );
}
