
"use client";

import { useEffect, useMemo, useState } from "react";
import pytania from "../../data/questions.json";

export default function Egzamin() {
  const lista = useMemo(() => {
    const kopia = [...(pytania as any[])];
    kopia.sort(() => Math.random() - 0.5);
    return kopia.slice(0, 50);
  }, []);

  const [nr, setNr] = useState(0);
  const [odp, setOdp] = useState<{[k:number]:string}>({});
  const [czas, setCzas] = useState(90 * 60);
  const [koniec, setKoniec] = useState(false);

  useEffect(() => {
    if (koniec) return;
    const t = setInterval(() => {
      setCzas((c) => {
        if (c <= 1) {
          clearInterval(t);
          setKoniec(true);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [koniec]);

  const pyt = lista[nr];

  const wynik = lista.reduce(
    (s, p, i) => s + (odp[i] === p.correctKey ? 1 : 0),
    0
  );

  const min = String(Math.floor(czas / 60)).padStart(2, "0");
  const sek = String(czas % 60).padStart(2, "0");

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
          width:450,
          background:"#0b110b",
          border:"1px solid #3a4a2a",
          borderRadius:24,
          padding:40,
          textAlign:"center"
        }}>
          <h1>Egzamin zakończony</h1>
          <h2 style={{fontSize:60,color:"#d4af37"}}>{wynik}/50</h2>
          <p>{Math.round((wynik/50)*100)}%</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{
      minHeight:"100vh",
      background:"#050805",
      color:"white",
      padding:24,
      fontFamily:"Arial"
    }}>
      <div style={{maxWidth:900,margin:"0 auto"}}>

        <div style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          marginBottom:20
        }}>
          <div>
            <div style={{color:"#a6b08d",fontSize:13}}>
              EGZAMIN OFICERSKI
            </div>
            <h1 style={{margin:0}}>Pytanie {nr+1}/50</h1>
          </div>

          <div style={{
            border:"1px solid #6a5a1c",
            borderRadius:14,
            padding:"10px 16px",
            color:"#d4af37",
            fontWeight:"bold",
            fontSize:24
          }}>
            {min}:{sek}
          </div>
        </div>

        <div style={{
          height:8,
          background:"#182018",
          borderRadius:10,
          overflow:"hidden",
          marginBottom:25
        }}>
          <div style={{
            width:`${((nr+1)/50)*100}%`,
            height:"100%",
            background:"#d4af37"
          }}/>
        </div>

        <div style={{
          background:"#0b100b",
          border:"1px solid #2e3925",
          borderRadius:22,
          padding:28
        }}>

          <h2 style={{
            fontSize:30,
            lineHeight:1.35,
            marginBottom:30
          }}>
            {pyt.question}
          </h2>

          <div style={{display:"grid",gap:16}}>
            {pyt.choices.map((o:any)=>(
              <button
                key={o.key}
                onClick={()=>setOdp({...odp,[nr]:o.key})}
                style={{
                  padding:18,
                  borderRadius:16,
                  border:odp[nr]===o.key
                    ?"1px solid #d4af37"
                    :"1px solid #2a3523",
                  background:odp[nr]===o.key
                    ?"rgba(212,175,55,.15)"
                    :"#111611",
                  color:"white",
                  textAlign:"left",
                  cursor:"pointer",
                  fontSize:17
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
                padding:"14px 22px",
                borderRadius:14,
                background:"#121712",
                color:"white",
                border:"1px solid #364328"
              }}
            >
              ← Poprzednie
            </button>

            {nr<49?(
              <button
                onClick={()=>setNr(nr+1)}
                style={{
                  padding:"14px 22px",
                  borderRadius:14,
                  background:"#d4af37",
                  color:"#111",
                  border:"none",
                  fontWeight:"bold"
                }}
              >
                Następne →
              </button>
            ):(
              <button
                onClick={()=>setKoniec(true)}
                style={{
                  padding:"14px 22px",
                  borderRadius:14,
                  background:"#d4af37",
                  color:"#111",
                  border:"none",
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
