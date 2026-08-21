'use client'
import {useEffect,useState} from 'react';
export default function Page(){
 const target=new Date('2026-09-08T00:00:00');
 const [t,setT]=useState('');
 useEffect(()=>{const i=setInterval(()=>{const d=target.getTime()-Date.now();const days=Math.max(0,Math.floor(d/86400000));const h=Math.floor(d/3600000)%24;const m=Math.floor(d/60000)%60;const s=Math.floor(d/1000)%60;setT(`${days} dni ${h}h ${m}m ${s}s`);},1000);return()=>clearInterval(i);},[]);
 return <main><h1>Egzamin Oficerski</h1><p>Odliczanie do 8 września: {t}</p><a href='/nauka' style={{color:'#c8d1b0'}}>Przejdź do Etapu I</a></main>}
