"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import pytania from "../../data/questions.json";

const EXAM_TIME = 90 * 60;
const EXAM_SIZE = 50;

export default function EgzaminPage() {
  const examQuestions = useMemo(() => {
   return [...(pytania as any[])].sort(() => Math.random() - 0.5).slice(0, EXAM_SIZE);
  }, []);

const [current, setCurrent] = useState(0);

const [answers, setAnswers] = useState<(string | null)[]>(
  Array(EXAM_SIZE).fill(null)
);

const [started, setStarted] = useState(false);

const [marked, setMarked] = useState<number[]>([]);
const [time, setTime] = useState(EXAM_TIME);
const [finished, setFinished] = useState(false);
const pyt = examQuestions[current];

  useEffect(() => {
    if (finished) return;
    const t = setInterval(() => {
      setTime((v) => {
        if (v <= 1) {
          setFinished(true);
          return 0;
        }
        return v - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [finished]);

  const q = examQuestions[current];

  const h = String(Math.floor(time / 3600)).padStart(2, "0");
  const m = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
  const s = String(time % 60).padStart(2, "0");

  function finishExam() {
    const empty = answers.filter((a) => a === null).length;
    if (
      empty > 0 &&
      !confirm(`Pozostało ${empty} pytań bez odpowiedzi. Zakończyć egzamin?`)
    )
      return;

    setFinished(true);
  }

  const score = answers.reduce((sum, ans, i) => {
    return sum + (ans === examQuestions[i].correctKey ? 1 : 0);
  }, 0);
if (!started) {
  return (
    <main style={{
      background:"#050805",
      color:"white",
      minHeight:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      padding:20
    }}>
      <div style={{
        width:"100%",
        maxWidth:900,
        border:"1px solid #2a3324",
        borderRadius:24,
        padding:30
      }}>
        <div style={{
          display:"inline-block",
          border:"1px solid #3b4a34",
          borderRadius:999,
          padding:"8px 16px",
          marginBottom:20
        }}>
          ● TRYB EGZAMINACYJNY
        </div>

        <h1 style={{fontSize:56}}>Egzamin Oficerski</h1>

        <p style={{color:"#9ca38f"}}>
          Oficjalna symulacja egzaminu.
          <br/>
          50 pytań • 90 minut.
        </p>

<div
  style={{
    display: "grid",
    gap: 16,
    marginTop: 30,
  }}
>
  <button
    onClick={() => setStarted(true)}
    style={{
      width: "100%",
      padding: 22,
      borderRadius: 18,
      border: "none",
      background: "#d6dbc2",
      color: "#111",
      fontSize: 22,
      fontWeight: 700,
      cursor: "pointer",
    }}
  >
    📝 Egzamin (50 pytań / 90 min)
  </button>

  <Link href="/nauka" style={{ textDecoration: "none" }}>
    <div
      style={{
        padding: 22,
        borderRadius: 18,
        border: "1px solid #2a3324",
        color: "white",
        background: "#0d120c",
        fontSize: 22,
        fontWeight: 700,
        textAlign: "center",
      }}
    >
      📚 Tryb nauki
    </div>
  </Link>

  <Link href="/nauka?mode=image" style={{ textDecoration: "none" }}>
    <div
      style={{
        padding: 22,
        borderRadius: 18,
        border: "1px solid #2a3324",
        color: "white",
        background: "#0d120c",
        fontSize: 22,
        fontWeight: 700,
        textAlign: "center",
      }}
    >
      🖼️ Pytania obrazkowe
    </div>
  </Link>
</div>
      </div>
    </main>
  );
}
  if (finished) {
    return (
      <main style={{ padding: 30, color: "white", background: "#050805", minHeight: "100vh" }}>
        <h1>Wynik egzaminu</h1>

        <h2>{score}/50</h2>
        <p>{Math.round((score / 50) * 100)}%</p>

        <p>Poprawne: {score}</p>
        <p>Błędne: {50 - score - answers.filter((a) => a === null).length}</p>
        <p>Bez odpowiedzi: {answers.filter((a) => a === null).length}</p>

        <hr style={{ margin: "30px 0" }} />

        <h2>Analiza błędów</h2>

        {examQuestions.map((qq, i) => {
          if (answers[i] === qq.correctKey) return null;

          return (
            <div
              key={i}
              style={{
                border: "1px solid #2a3324",
                borderRadius: 14,
                padding: 20,
                marginBottom: 20,
              }}
            >
              <p>
                <b>{i + 1}. {qq.question}</b>
              </p>

              {qq.image && (
                <img
                  src={qq.image}
                  alt=""
                  style={{ maxWidth: "100%", borderRadius: 10 }}
                />
              )}

              <p>❌ Twoja odpowiedź: {answers[i] ?? "Brak odpowiedzi"}</p>
              <p>✅ Poprawna odpowiedź: {qq.correctKey}</p>
            </div>
          );
        })}
      </main>
    );
  }

  return (
    <main
      style={{
        background: "#050805",
        color: "white",
        minHeight: "100vh",
        padding: 20,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div>Pytanie {current + 1}/50</div>
        <div>{h}:{m}:{s}</div>
      </div>

      <div
        style={{
          height: 6,
          background: "#20281b",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 30,
        }}
      >
        <div
          style={{
            width: `${((current + 1) / 50) * 100}%`,
            background: "#90ff90",
            height: "100%",
          }}
        />
      </div>

<h2>{pyt.question}</h2>
      {pyt.image && (
  <div style={{ margin: "20px 0" }}>
    <Image
      src={pyt.image}
      alt="Pytanie"
      width={700}
      height={400}
      style={{
        width: "100%",
        height: "auto",
        borderRadius: 14,
        border: "1px solid #334155"
      }}
    />
  </div>
)}
      {q.image && (
        <img
          src={q.image}
          alt=""
          style={{
            maxWidth: "100%",
            borderRadius: 12,
            margin: "20px 0",
            cursor: "zoom-in",
          }}
          onClick={() => window.open(q.image)}
        />
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {q.choices.map((c: any) => (
          <button
            key={c.key}
            onClick={() => {
              const copy = [...answers];
              copy[current] = c.key;
              setAnswers(copy);
            }}
            style={{
              padding: 16,
              borderRadius: 12,
              border:
                answers[current] === c.key
                  ? "2px solid #90ff90"
                  : "1px solid #2a3324",
              background:
                answers[current] === c.key ? "#19351a" : "#11150f",
              color: "white",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            {c.key}. {c.text}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 30,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
        >
          ← Poprzednie
        </button>

        <button
          onClick={() => setCurrent(Math.min(49, current + 1))}
          disabled={current === 49}
        >
          Następne →
        </button>

        <button
          onClick={() =>
            setMarked((m) =>
              m.includes(current)
                ? m.filter((x) => x !== current)
                : [...m, current]
            )
          }
        >
          {marked.includes(current) ? "★ Oznaczone" : "☆ Oznacz"}
        </button>

        <button
          onClick={finishExam}
          style={{ marginLeft: "auto", background: "#a32222", color: "white" }}
        >
          Zakończ egzamin
        </button>
      </div>
    </main>
  );
}
