export default function Home() {
  const egzamin = new Date("2026-09-08T09:00:00");
  const teraz = new Date();
  const diff = egzamin.getTime() - teraz.getTime();

  const dni = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const godziny = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
  const minuty = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
  const sekundy = Math.max(0, Math.floor((diff / 1000) % 60));

  return (
    <main
      style={{
        background: "#0f172a",
        color: "white",
        minHeight: "100vh",
        padding: 30,
        fontFamily: "Arial"
      }}
    >
      <h1>Egzamin Oficerski</h1>

      <p>
        Odliczanie do 8 września:
        {" "}
        {dni} dni {godziny} h {minuty} min {sekundy} s
      </p>

      <div style={{ display: "flex", gap: 15, marginTop: 30 }}>
        <a
          href="/nauka"
          style={{
            background: "#2563eb",
            color: "white",
            padding: "14px 22px",
            borderRadius: 12,
            textDecoration: "none"
          }}
        >
          Nauka
        </a>

        <a
          href="/egzamin"
          style={{
            background: "#dc2626",
            color: "white",
            padding: "14px 22px",
            borderRadius: 12,
            textDecoration: "none"
          }}
        >
          Egzamin 90 min
        </a>
      </div>
    </main>
  );
}
