export default async function handler(req, res) {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { word, language } = req.body;
  if (!word) return res.status(400).json({ error: "Missing word" });

  const langHint =
    !language || language.includes("Qualsiasi")
      ? "nella sua lingua originale"
      : `in ${language.replace(/^[\p{Emoji}\s]+/u, "").trim()}`;

  const prompt = `Sei un linguista esperto di etimologia. Per la parola "${word}" (${langHint}), fornisci un'analisi etimologica dettagliata consultando mentalmente le principali fonti: OED (Oxford English Dictionary), DELI (Dizionario Etimologico della Lingua Italiana), CNRTL francese, Kluge tedesco, Corominas spagnolo, DuCange per il latino medievale, e altre fonti rilevanti.

Rispondi SOLO con un oggetto JSON valido (nessun testo prima o dopo, nessun markdown), con questa struttura:
{
  "word": "parola esatta",
  "language": "lingua (es: Italiano, Latin, Ancient Greek)",
  "pronunciation": "trascrizione IPA se disponibile",
  "partOfSpeech": "sostantivo / verbo / aggettivo / etc.",
  "roots": [
    {"form": "radice", "language": "lingua origine", "meaning": "significato della radice"}
  ],
  "etymology": "Storia dettagliata della parola in 3-4 frasi: origine, evoluzione nel tempo, cambiamenti di significato. Cita le famiglie linguistiche e le trasformazioni fonetiche.",
  "firstAttested": "secolo o anno della prima attestazione scritta conosciuta",
  "sources": ["OED", "DELI", "altra fonte usata"],
  "examples": [
    {"text": "frase o citazione con la parola", "source": "Autore, Opera, Anno"},
    {"text": "seconda citazione", "source": "Autore, Opera, Anno"},
    {"text": "terza citazione", "source": "Autore, Opera, Anno"}
  ]
}

Per gli esempi: preferisci SEMPRE citazioni da opere letterarie famose, testi sacri, filosofi, poeti classici o scrittori rinomati. Se la parola è italiana usa Dante, Petrarca, Leopardi, Manzoni, Calvino etc. Se inglese usa Shakespeare, Milton, Keats, Orwell etc. Se latina usa Virgilio, Cicerone, Ovidio etc.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || "Anthropic API error" });
    }

    const text = data.content?.map((b) => b.text || "").join("") || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: "Errore interno: " + err.message });
  }
}
