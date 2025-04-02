const BASE_URL = "https://67ec86aeaa794fb3222e0682.mockapi.io/frases/api/v1/user";

export interface Phrase {
    id: number;
    name: string;
    phrase: string;
}

export interface PhraseInput {
    name?: string;
    phrase?: string;
}

export type CreatePhraseParams = Required<Pick<PhraseInput, "name" | "phrase">>;
export type GetPhraseByAuthorParams = Required<Pick<PhraseInput, "name">>;
export type GetPhraseByIdParams = { id: number };
export type UpdatePhraseParams = { id: number } & Required<Pick<PhraseInput, "phrase">>;
export type DeletePhraseParams = { id: number };

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
    path?: string;
    queryParams?: Record<string, string>;
    body?: PhraseInput;
}

export async function makeMockAPIRequest<T>(
    method: HTTPMethod,
    options: RequestOptions = {}
): Promise<T | null> {
    const { path, queryParams, body } = options;
    let url = BASE_URL;

    if (path) url += path;
    if (method === "GET" && queryParams) {
        const query = new URLSearchParams(queryParams).toString();
        url += `?${query}`;
    }

    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    const fetchOptions: RequestInit = {
        method,
        headers,
        body: body && method !== "GET" && method !== "DELETE"
            ? JSON.stringify(body)
            : undefined,
    };

    try {
        const response = await fetch(url, fetchOptions);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        if (method === "DELETE" || response.status === 204) return null;
        return await response.json();
    } catch (err) {
        console.error(`Error on ${method} ${url}:`, err);
        return null;
    }
}
