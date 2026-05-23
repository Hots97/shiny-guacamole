import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  "🌍 Qualsiasi lingua", "🇮🇹 Italiano", "🇬🇧 English", "🇫🇷 Français",
  "🇩🇪 Deutsch", "🇪🇸 Español", "🇵🇹 Português", "🇷🇺 Русский",
  "🇯🇵 日本語", "🇨🇳 中文", "🇦🇪 العربية", "🇬🇷 Ελληνικά", "🇱🇦 Latina",
];

function LetterParticle({ letter, delay, x }) {
  return (
    <span style={{
      position: "absolute", left: `${x}%`, top: "-20px",
      fontSize: "10px", color: "rgba(212,175,100,0.15)",
      fontFamily: "'Playfair Display', serif",
      animation: `fall ${3 + Math.random() * 4}s linear ${delay}s infinite`,
      userSelect: "none",
    }}>
      {letter}
    </span>
  );
}

function SectionLabel({ icon, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ fontSize: "14px" }}>{icon}</span>
      <span style={{ fontSize: "10px", letterSpacing: "3px", color: "rgba(212,175,100,0.6)", textTransform: "uppercase", fontFamily: "'Cinzel', serif" }}>{title}</span>
    </div>
  );
}

function ResultCard({ data }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a1008 0%, #2d1e0a 100%)", border: "1px solid rgba(212,175,100,0.3)", borderRadius: "20px 20px 0 0", padding: "24px 24px 20px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at top left, rgba(212,175,100,0.08) 0%, transparent 60%)" }} />
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative" }}>
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#d4af64", marginBottom: "6px", textTransform: "uppercase", fontFamily: "'Cinzel', serif" }}>{data.language}</div>
            <div style={{ fontSize: "36px", fontFamily: "'Playfair Display', serif", color: "#f5e6c8", fontWeight: "700", lineHeight: 1.1 }}>{data.word}</div>
            {data.pronunciation && <div style={{ fontSize: "14px", color: "rgba(212,175,100,0.7)", marginTop: "4px", fontStyle: "italic" }}>{data.pronunciation}</div>}
          </div>
          <div style={{ background: "rgba(212,175,100,0.1)", border: "1px solid rgba(212,175,100,0.3)", borderRadius: "12px", padding: "8px 14px", fontSize: "13px", color: "#d4af64", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>{data.partOfSpeech}</div>
        </div>
      </div>

      {/* Roots */}
      <div style={{ background: "linear-gradient(135deg, #0f0a04 0%, #1a1008 100%)", border: "1px solid rgba(212,175,100,0.2)", borderTop: "none", padding: "20px 24px" }}>
        <SectionLabel icon="⚗️" title="RADICE ETIMOLOGICA" />
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "12px" }}>
          {data.roots?.map((root, i) => (
            <div key={i} style={{ background: "rgba(212,175,100,0.08)", border: "1px solid rgba(212,175,100,0.25)", borderRadius: "10px", padding: "8px 14px", display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ fontSize: "16px", fontFamily: "'Playfair Display', serif", color: "#f5e6c8", fontWeight: "600" }}>{root.form}</span>
              <span style={{ fontSize: "11px", color: "#d4af64", letterSpacing: "1px" }}>{root.language} · {root.meaning}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Etymology */}
      <div style={{ background: "#0a0704", border: "1px solid rgba(212,175,100,0.2)", borderTop: "none", padding: "20px 24px" }}>
        <SectionLabel icon="📜" title="STORIA DELLA PAROLA" />
        <p style={{ fontSize: "15px", lineHeight: 1.75, color: "rgba(245,230,200,0.85)", marginTop: "12px", fontFamily: "'Lora', serif" }}>{data.etymology}</p>
        {data.firstAttested && (
          <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "11px", letterSpacing: "2px", color: "rgba(212,175,100,0.5)", textTransform: "uppercase" }}>Prima attestazione</span>
            <span style={{ fontSize: "13px", color: "#d4af64", fontFamily: "'Cinzel', serif" }}>{data.firstAttested}</span>
          </div>
        )}
      </div>

      {/* Sources */}
      {data.sources?.length > 0 && (
        <div style={{ background: "#0a0704", border: "1px solid rgba(212,175,100,0.2)", borderTop: "none", padding: "14px 24px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "11px", letterSpacing: "2px", color: "rgba(212,175,100,0.5)", textTransform: "uppercase", alignSelf: "center" }}>Fonti</span>
          {data.sources.map((s, i) => (
            <span key={i} style={{ fontSize: "11px", background: "rgba(212,175,100,0.06)", border: "1px solid rgba(212,175,100,0.15)", borderRadius: "6px", padding: "3px 8px", color: "rgba(212,175,100,0.6)" }}>{s}</span>
          ))}
        </div>
      )}

      {/* Examples */}
      <div style={{ background: "#0a0704", border: "1px solid rgba(212,175,100,0.2)", borderTop: "none", borderRadius: "0 0 20px 20px", padding: "20px 24px 28px" }}>
        <SectionLabel icon="✍️" title="ESEMPI ILLUSTRI" />
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "14px" }}>
          {data.examples?.map((ex, i) => (
            <div key={i} style={{ borderLeft: "2px solid rgba(212,175,100,0.4)", paddingLeft: "16px", position: "relative" }}>
              <div style={{ position: "absolute", left: "-5px", top: "0", width: "8px", height: "8px", borderRadius: "50%", background: "#d4af64", opacity: 0.6 }} />
              <p style={{ fontSize: "15px", fontFamily: "'Lora', serif", fontStyle: "italic", color: "rgba(245,230,200,0.9)", lineHeight: 1.6, margin: 0 }}>"{ex.text}"</p>
              <p style={{ fontSize: "12px", color: "rgba(212,175,100,0.65)", marginTop: "6px", letterSpacing: "0.5px" }}>— {ex.source}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [word, setWord] = useState("");
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const inputRef = useRef(null);

  const letters = "ABCDEFGHILMNOPQRSTUVZαβγδεζηθλμξπρστφψω".split("");
  const particles = Array.from({ length: 18 }, (_, i) => ({
    letter: letters[Math.floor(Math.random() * letters.length)],
    delay: Math.random() * 5,
    x: (i / 18) * 100,
  }));

  async function search() {
    const trimmed = word.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/etymology", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: trimmed, language }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Errore sconosciuto");
      setResult(data);
    } catch (e) {
      setError("Parola non trovata o errore nella ricerca. Riprova.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050301", display: "flex", justifyContent: "center", fontFamily: "'Lora', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;600&family=Lora:ital,wght@0,400;1,400&display=swap');
        @keyframes fall { 0%{transform:translateY(-20px) rotate(0deg);opacity:0} 10%{opacity:1} 90%{opacity:0.5} 100%{transform:translateY(100vh) rotate(360deg);opacity:0} }
        @keyframes pulse-ring { 0%{transform:scale(0.95);box-shadow:0 0 0 0 rgba(212,175,100,0.4)} 70%{transform:scale(1);box-shadow:0 0 0 10px rgba(212,175,100,0)} 100%{transform:scale(0.95);box-shadow:0 0 0 0 rgba(212,175,100,0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        input::placeholder{color:rgba(212,175,100,0.3)} input:focus{outline:none}
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#0a0704} ::-webkit-scrollbar-thumb{background:rgba(212,175,100,0.3);border-radius:2px}
      `}</style>

      <div style={{ width: "100%", maxWidth: "480px", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
        {/* Particles */}
        <div style={{ position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)", width: "480px", height: "100vh", pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
          {particles.map((p, i) => <LetterParticle key={i} {...p} />)}
        </div>

        <div style={{ position: "relative", zIndex: 1, paddingBottom: "60px" }}>
          {/* Header */}
          <div style={{ padding: "56px 24px 28px", textAlign: "center" }}>
            <div style={{ width: "56px", height: "56px", margin: "0 auto 16px", borderRadius: "16px", background: "linear-gradient(135deg, #2d1e0a, #1a1008)", border: "1px solid rgba(212,175,100,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", animation: "pulse-ring 3s infinite" }}>📖</div>
            <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "22px", letterSpacing: "5px", color: "#f5e6c8", textTransform: "uppercase", fontWeight: "600" }}>Etymon</h1>
            <p style={{ fontSize: "12px", letterSpacing: "2px", color: "rgba(212,175,100,0.5)", marginTop: "6px", textTransform: "uppercase" }}>Dizionario Etimologico</p>
          </div>

          {/* Search */}
          <div style={{ padding: "0 16px" }}>
            <div style={{ background: "linear-gradient(135deg, #1a1008, #0f0a04)", border: "1px solid rgba(212,175,100,0.25)", borderRadius: "20px", padding: "20px", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
              {/* Lang picker */}
              <div onClick={() => setShowLangPicker(!showLangPicker)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(212,175,100,0.06)", border: "1px solid rgba(212,175,100,0.15)", borderRadius: "12px", padding: "10px 14px", marginBottom: "14px", cursor: "pointer" }}>
                <span style={{ fontSize: "14px", color: "rgba(245,230,200,0.8)" }}>{language}</span>
                <span style={{ color: "rgba(212,175,100,0.5)", fontSize: "12px" }}>▼</span>
              </div>
              {showLangPicker && (
                <div style={{ background: "#1a1008", border: "1px solid rgba(212,175,100,0.2)", borderRadius: "12px", marginBottom: "14px", maxHeight: "200px", overflowY: "auto" }}>
                  {LANGUAGES.map((l) => (
                    <div key={l} onClick={() => { setLanguage(l); setShowLangPicker(false); }} style={{ padding: "10px 14px", fontSize: "14px", color: l === language ? "#d4af64" : "rgba(245,230,200,0.7)", cursor: "pointer", borderBottom: "1px solid rgba(212,175,100,0.08)", background: l === language ? "rgba(212,175,100,0.08)" : "transparent" }}>{l}</div>
                  ))}
                </div>
              )}
              {/* Input */}
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input ref={inputRef} value={word} onChange={e => setWord(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} placeholder="Scrivi una parola…"
                  style={{ width: "100%", background: "rgba(212,175,100,0.05)", border: "1px solid rgba(212,175,100,0.2)", borderRadius: "14px", padding: "14px 56px 14px 18px", fontSize: "18px", fontFamily: "'Playfair Display', serif", color: "#f5e6c8", letterSpacing: "0.5px" }} />
                <button onClick={search} disabled={loading || !word.trim()} style={{ position: "absolute", right: "6px", width: "40px", height: "40px", borderRadius: "10px", background: loading || !word.trim() ? "rgba(212,175,100,0.1)" : "linear-gradient(135deg, #d4af64, #a07830)", border: "none", cursor: loading || !word.trim() ? "not-allowed" : "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                  {loading ? <span style={{ display: "block", width: "16px", height: "16px", border: "2px solid rgba(212,175,100,0.3)", borderTopColor: "#d4af64", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> : "→"}
                </button>
              </div>
            </div>
          </div>

          {loading && (
            <div style={{ padding: "40px 16px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", letterSpacing: "3px", color: "rgba(212,175,100,0.6)", textTransform: "uppercase", fontFamily: "'Cinzel', serif" }}>Consultando i dizionari</div>
              <div style={{ marginTop: "12px", fontSize: "11px", color: "rgba(212,175,100,0.35)", letterSpacing: "2px" }}>OED · DELI · CNRTL · Kluge · Corominas</div>
              <div style={{ marginTop: "20px", fontSize: "24px", animation: "spin 2s linear infinite", display: "inline-block" }}>⚗️</div>
            </div>
          )}

          {error && <div style={{ margin: "20px 16px 0", background: "rgba(180,50,50,0.1)", border: "1px solid rgba(180,50,50,0.3)", borderRadius: "14px", padding: "14px 18px", color: "rgba(255,150,150,0.8)", fontSize: "14px" }}>{error}</div>}

          {result && <div style={{ padding: "20px 16px 0" }}><ResultCard data={result} /></div>}

          {!result && !loading && !error && (
            <div style={{ padding: "40px 16px", textAlign: "center" }}>
              <p style={{ fontSize: "13px", color: "rgba(212,175,100,0.3)", letterSpacing: "1px", lineHeight: 1.8 }}>Digita una parola in qualsiasi lingua<br />per scoprirne l'origine e la storia</p>
              <div style={{ marginTop: "24px", display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
                {["amore", "serendipity", "Weltschmerz", "μνήμη"].map(w => (
                  <span key={w} onClick={() => setWord(w)} style={{ background: "rgba(212,175,100,0.06)", border: "1px solid rgba(212,175,100,0.15)", borderRadius: "20px", padding: "6px 14px", fontSize: "13px", color: "rgba(212,175,100,0.6)", cursor: "pointer", fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>{w}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
