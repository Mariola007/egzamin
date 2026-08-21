"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import pytania from "../data/questions.json";

import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Ładowanie...</div>}>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const search = useSearchParams();
  const imageMode = search.get("mode") === "image";

  const lista = useMemo(() => {
    const all = [...(pytania as any[])];

    if (imageMode) {
      return all.filter((q) => q.image && q.image !== "");
    }

    return all;
  }, [imageMode]);

  const [nr, setNr] = useState(0);
  const [wybrana, setWybrana] = useState<string | null>(null);

  const q = lista[nr];

  if (!q) {
    return (
      <main style={{padding:30,color:"white",background:"#050805",minHeight:"100vh"}}>
        <h1>Brak pytań obrazkowych.</h1>
      </main>
    );
  }

  return (
    <main
      style={{
        background:"#050805",
        color:"white",
        minHeight:"100vh",
        padding:20,
        maxWidth:900,
        margin:"0 auto"
      }}
    >
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
        <div>{imageMode ? "🖼️ Pytania obrazkowe" : "📚 Tryb nauki"}</div>
        <div>{nr+1}/{lista.length}</div>
      </div>

      <h2>{q.question}</h2>

      {q.image && (
        <div style={{margin:"20px 0"}}>
          <Image
            src={q.image}
            alt="Pytanie"
            width={700}
            height={400}
            style={{
              width:"100%",
              height:"auto",
              borderRadius:14,
              border:"1px solid #334155"
            }}
          />
        </div>
      )}

      <div style={{display:"grid",gap:12}}>
        {q.choices.map((c:any)=>(
          <button
            key={c.key}
            onClick={()=>setWybrana(c.key)}
            style={{
              padding:16,
              borderRadius:12,
              border:"1px solid #2a3324",
              background:
                wybrana===null
                  ? "#11150f"
                  : c.key===q.correctKey
                    ? "#163a34"
                    : c.key===wybrana
                      ? "#5b1f1f"
                      : "#11150f",
              color:"white",
              textAlign:"left",
              cursor:"pointer"
            }}
          >
            {c.key}. {c.text}
          </button>
        ))}
      </div>

      {wybrana && (
        <div
          style={{
            marginTop:20,
            border:"1px solid #2a3324",
            borderRadius:14,
            padding:18,
            background:"#0b100a"
          }}
        >
          <h3>Poprawna odpowiedź: {q.correctKey}</h3>

          {q.why_correct_short && <p>{q.why_correct_short}</p>}
          {q.why_correct_long && <p>{q.why_correct_long}</p>}
        </div>
      )}

      <div style={{display:"flex",gap:10,marginTop:30}}>
        <button
          onClick={()=>{
            setNr(Math.max(0,nr-1));
            setWybrana(null);
          }}
          disabled={nr===0}
        >
          ← Poprzednie
        </button>

        <button
          onClick={()=>{
            setNr(Math.min(lista.length-1,nr+1));
            setWybrana(null);
          }}
          disabled={nr===lista.length-1}
        >
          Następne →
        </button>
      </div>
    </main>
  );
}
