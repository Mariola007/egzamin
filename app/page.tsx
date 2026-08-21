
'use client';
import {useEffect,useState} from 'react';
export default function Page(){
 const target=new Date('2026-09-08T00:00:00');
 const [t,setT]=useState('');
 useEffect(()=>{const i=setInterval(()=>{const d=target.getTime()-Date.now();const dd=Math.max(0,Math.floor(d/86400000));const h=Math.floor(d%86400000/3600000);const m=Math.floor(d%3600000/60000);const s=Math.floor(d%60000/1000);setT(`${dd} dni ${h} godz ${m} min ${s} sek`)},1000);return()=>clearInterval(i)},[]);
 return <main style={{maxWidth:900,margin:'0 auto',padding:24}}>
 <div style={{border:'1px solid #304b2b',borderRadius:28,padding:24,background:'#081008'}}>
 <div style={{color:'#93a87f'}}>● SYSTEM PRZYGOTOWANIA</div>
 <h1 style={{fontSize:56,margin:'12px 0'}}>Egzamin Oficerski</h1>
 <div style={{border:'1px solid #2b3d2a',borderRadius:20,padding:20}}>
 <div>Termin egzaminu: <b>8 września 2026</b></div>
 <div style={{fontSize:28,marginTop:12}}>{t}</div></div>
 <p style={{lineHeight:1.6,opacity:.9}}>Wersja 1.0 – Etap I. Kolejne etapy zostaną dodane w następnych aktualizacjach.</p>
 <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:16}}>
 {['I Test wiedzy','II Teoria i praktyka','III Musztra','IV Pętla taktyczna'].map((x,i)=><div key={i} style={{border:'1px solid #2b3d2a',borderRadius:18,padding:20,minHeight:120}}>{x}</div>)}
 </div>
 <div style={{marginTop:28,padding:20,border:'1px solid #2b3d2a',borderRadius:18}}>
 <h2>Etap I</h2>
 <p>✔ Nauka (50 pytań) • ✔ Egzamin (90 minut) • ✔ Pasek postępu • ✔ Top 20 do poprawy (kolejna aktualizacja).</p>
 <button style={{padding:'14px 24px',borderRadius:14,border:'none',background:'#fff',color:'#000',fontWeight:700}}>Rozpocznij naukę</button>
 </div></div></main>}
