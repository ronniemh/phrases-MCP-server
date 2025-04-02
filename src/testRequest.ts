/**
 * For testing, change compilerOptions from tsconfig.json to:
 *   "compilerOptions": {
 *     "target": "ES2020",
 *     "module": "NodeNext",
 *     "moduleResolution": "NodeNext",
 *     "esModuleInterop": true,
 *     "outDir": "build",
 *     "strict": true
 *   },
 */

import {makeMockAPIRequest, Phrase} from "./helpers/makeMockAPIRequest.js";

async function test() {
    // 1. CREATE
    const newPhrase = await makeMockAPIRequest<Phrase>("POST", {
        body: {
            name: "Ronnie",
            phrase: "Esto es una prueba desde Node",
        },
    });
    console.log("✅ Created:", newPhrase);

    // 2. GET BY NAME
    const phrasesByRonnie = await makeMockAPIRequest<Phrase[]>("GET", {
        queryParams: { author: "Ronnie" },
    });
    console.log("🔍 Phrases by Ronnie:", phrasesByRonnie);

    // 3. GET ALL
    const all = await makeMockAPIRequest<Phrase[]>("GET");
    console.log("📚 All phrases:", all);

    // 4. GET BY ID
    if (newPhrase?.id) {
        const byId = await makeMockAPIRequest<Phrase>("GET", {
            path: `/${newPhrase.id}`,
        });
        console.log("🆔 Phrase by ID:", byId);

        // 5. UPDATE
        const updated = await makeMockAPIRequest<Phrase>("PATCH", {
            path: `/${newPhrase.id}`,
            body: { phrase: "Frase modificada 💪🏼" },
        });
        console.log("✏️ Updated:", updated);

        // 6. DELETE
        const deleted = await makeMockAPIRequest<null>("DELETE", {
            path: `/${newPhrase.id}`,
        });
        console.log("🗑️ Deleted:", deleted);
    }
}

test();
