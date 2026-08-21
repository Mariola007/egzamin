
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
      <main style={{
        minHeight:"100vh",
        background:"#050805",
        color:"white",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontFamily:"Arial"
      }}>
        <div style={{
          width:420,
          background:"#0b110b",
          border:"1px solid #384528",
          borderRadius:24,
          padding:40,
          textAlign:"center"
        }}>
          <h1 style={{fontSize:42}}>Wynik</h1>
          <h2 style={{fontSize:60,color:"#d4af37"}}>
            {wynik}/{lista.length}
          </h2>
          <p style={{fontSize:22}}>
            {wynik>=430?"✅ Zaliczone":"❌ Niezaliczone"}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={{
      minHeight:"100vh",
      background:"#050805",
      color:"white",
      padding:"40px 20px",
      fontFamily:"Arial"
    }}>
      <div style={{maxWidth:900,margin:"0 auto"}}>

        <div style={{
          border:"1px solid #364328",
          borderRadius:22,
          padding:28,
          background:"#0a100a"
        }}>

          <div style={{
            display:"flex",
            justifyContent:"space-between",
            marginBottom:18,
            color:"#a7b08d"
          }}>
            <span>EGZAMIN OFICERSKI</span>
            <span>{nr+1}/615</span>
          </div>

          <div style={{
            height:8,
            background:"#1a2418",
            borderRadius:20,
            overflow:"hidden",
            marginBottom:30
          }}>
            <div style={{
              width:`${((nr+1)/615)*100}%`,
              height:"100%",
              background:"#d4af37"
            }}/>
          </div>

          <h2 style={{
            fontSize:34,
            marginBottom:30,
            lineHeight:1.3
          }}>
            {pyt.question}
          </h2>

          <div style={{display:"grid",gap:16}}>
            {pyt.choices.map((o:any)=>(
              <button
                key={o.key}
                onClick={()=>setOdp({...odp,[nr]:o.key})}
                style={{
                  padding:"18px 20px",
                  borderRadius:16,
                  border:odp[nr]===o.key
                    ?"1px solid #d4af37"
                    :"1px solid #2b3525",
                  background:odp[nr]===o.key
                    ?"rgba(212,175,55,.15)"
                    :"#0d130d",
                  color:"white",
                  cursor:"pointer",
                  textAlign:"left",
                  fontSize:18
                }}
              >
                <strong>{o.key}</strong> — {o.text}
              </button>
            ))}
          </div>

          <div style={{
            display:"flex",
            justifyContent:"space-between",
            marginTop:35
          }}>
            <button
              disabled={nr===0}
              onClick={()=>setNr(nr-1)}
              style={{
                padding:"14px 24px",
                borderRadius:14,
                border:"1px solid #364328",
                background:"#111611",
                color:"white"
              }}
            >
              ← Poprzednie
            </button>

            {nr<614?(
              <button
                onClick={()=>setNr(nr+1)}
                style={{
                  padding:"14px 24px",
                  borderRadius:14,
                  border:"none",
                  background:"#d4af37",
                  color:"#111",
                  fontWeight:"bold"
                }}
              >
                Następne →
              </button>
            ):(
              <button
                onClick={()=>setKoniec(true)}
                style={{
                  padding:"14px 24px",
                  borderRadius:14,
                  border:"none",
                  background:"#d4af37",
                  color:"#111",
                  fontWeight:"bold"
                }}
              >
                Zakończ egzamin
              </button>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
