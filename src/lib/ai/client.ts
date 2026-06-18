const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const MODEL = "deepseek-chat";
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000;

interface DeepSeekMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface DeepSeekRequest {
  model: string;
  messages: DeepSeekMessage[];
  temperature: number;
  max_tokens: number;
  response_format: { type: "json_object" };
}

interface DeepSeekResponse {
  id: string;
  choices: Array<{
    message: {
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class DeepSeekError extends Error {
  constructor(
    message: string,
    public status?: number,
    public retryable: boolean = false,
  ) {
    super(message);
    this.name = "DeepSeekError";
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function callDeepSeek(
  systemPrompt: string,
  userPrompt: string,
): Promise<{ content: string; tokensUsed: number }> {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey || apiKey === "placeholder-deepseek-key") {
    throw new DeepSeekError(
      "DeepSeek API key is not configured. Set DEEPSEEK_API_KEY in your environment.",
      0,
      false,
    );
  }

  const body: DeepSeekRequest = {
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.3,
    max_tokens: 2048,
    response_format: { type: "json_object" },
  };

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(DEEPSEEK_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const isRetryable = response.status >= 500 || response.status === 429;
        throw new DeepSeekError(
          `DeepSeek API returned ${response.status}: ${response.statusText}`,
          response.status,
          isRetryable,
        );
      }

      const data: DeepSeekResponse = await response.json();

      if (!data.choices?.[0]?.message?.content) {
        throw new DeepSeekError("Empty response from DeepSeek API", 0, true);
      }

      return {
        content: data.choices[0].message.content,
        tokensUsed: data.usage?.total_tokens ?? 0,
      };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      if (err instanceof DeepSeekError && !err.retryable) {
        throw err;
      }

      if (attempt < MAX_RETRIES - 1) {
        const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, attempt);
        console.warn(
          `DeepSeek API attempt ${attempt + 1} failed. Retrying in ${retryDelay}ms...`,
        );
        await delay(retryDelay);
      }
    }
  }

  throw lastError ?? new DeepSeekError("Failed to call DeepSeek API after retries", 0, false);
}
