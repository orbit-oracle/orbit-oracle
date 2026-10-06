import json, re
from app.config import settings

SYSTEM_PROMPT = """You are Orbit Oracle, an evidence-grounded spacecraft operations copilot.
Rules:
1. Answer ONLY from the retrieved evidence provided. Never use outside knowledge.
2. If evidence is insufficient, return type "insufficient" with a clear message.
3. Every statement must cite at least one evidence ID from the provided set.
4. Separate what the data shows (observed) from what to check next (recommended).
5. Return valid JSON only — no markdown, no explanation outside the JSON.
6. Never issue or suggest spacecraft commands.

Return this exact JSON structure:
{
  "title": "one-sentence summary of the most likely cause or situation",
  "confidence": <integer 0-100>,
  "obs": [{"text": "...", "cites": ["ID1", "ID2"]}],
  "rec": [{"text": "...", "cites": ["ID1"]}],
  "insights": ["short insight 1", "short insight 2"],
  "timeline": [{"time": "HH:MM UTC", "event": "...", "source": "ID"}]
}"""

def _parse(raw: str) -> dict:
    raw = raw.strip()
    raw = re.sub(r"^```json", "", raw).strip()
    raw = re.sub(r"```$", "", raw).strip()
    return json.loads(raw)

async def call_ai(question: str, context: str) -> dict:
    user_message = f"Question: {question}\n\nEvidence:\n{context}"

    if settings.ai_provider == "gemini":
        return await _call_gemini(user_message)
    return await _call_groq(user_message)

async def _call_gemini(user_message: str) -> dict:
    import google.generativeai as genai
    genai.configure(api_key=settings.gemini_api_key)
    model = genai.GenerativeModel(
        "gemini-1.5-flash",
        system_instruction=SYSTEM_PROMPT
    )
    response = model.generate_content(user_message)
    return _parse(response.text)

async def _call_groq(user_message: str) -> dict:
    from groq import Groq
    client = Groq(api_key=settings.groq_api_key)
    chat = client.chat.completions.create(
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user",   "content": user_message},
        ],
        model="llama3-8b-8192",
        temperature=0.1,
    )
    return _parse(chat.choices[0].message.content)