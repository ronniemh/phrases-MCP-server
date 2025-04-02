import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { makeMockAPIRequest, Phrase, GetPhraseByIdParams, GetPhraseByAuthorParams, CreatePhraseParams, UpdatePhraseParams, DeletePhraseParams } from "./helpers/makeMockAPIRequest.js";

// Create server instance
const server = new McpServer({
    name: "phrases",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});

// Get All Phrases Tool
server.tool(
    "get-all-phrases",
    "Returns a list of all phrases.",
    {},
    async () => {
        const phrases = await makeMockAPIRequest<Phrase[]>("GET");
        let resultText = "";

        if (!phrases || phrases.length === 0) {
            resultText = "No phrases found.";
        } else {
            const formatted = phrases.map(
                (p) => `${p.phrase}: "${p.name}"`
            ).join("\n");
            resultText = `Here are all the phrases:\n\n${formatted}`;
        }

        return {
            content: [
                {
                    type: "text",
                    text: resultText
                }
            ]
        }
    }
);

// Get Phrase By ID Tool
server.tool(
    "get-phrase-by-id",
    "Returns a phrase by its ID.",
    {
        id: z.number().min(0).describe("Phrase ID"),
    },
    async ({id}) => {
        const result = await makeMockAPIRequest<Phrase>("GET", {
            path: `/${id}`,
        });

        const resultText = result
            ? `Phrase from ${result.name}: "${result.phrase}"`
            : `No phrase found with ID ${id}.`;

        return {
            content: [
                {
                    type: "text",
                    text: resultText
                }
            ]
        }
    }
);

// Get Phrase By Name Tool
server.tool(
    "get-phrase-by-name",
    "Returns a phrase by author name.",
    {
        name: z.string().max(20).describe("Author name"),
    },
    async ({name}) => {
        const result = await makeMockAPIRequest<Phrase[]>("GET", {
            queryParams: { name },
        });

        const resultText = result && result[0]
            ? `Phrase from ${name}: "${result[0].phrase}" (ID: ${result[0].id})`
            : `No phrase found for ${name}.`;

        return {
            content: [
                {
                    type: "text",
                    text: resultText
                }
            ]
        }
    }
);

// Create Phrase Tool
server.tool(
    "create-phrase",
    "Creates a new phrase for an author.",
    {
        name: z.string().max(50).describe("Author name"),
        phrase: z.string().max(200).describe("Phrase text")
    },
    async ({name, phrase}) => {
        const created = await makeMockAPIRequest<Phrase>("POST", {
            body: { name, phrase },
        });

        const resultText = created
            ? `Created phrase for ${created.name}: "${created.phrase}" (ID: ${created.id})`
            : "Failed to create the phrase.";

        return {
            content: [
                {
                    type: "text",
                    text: resultText
                }
            ]
        }
    }
);

// Update Phrase Tool
server.tool(
    "update-phrase",
    "Updates the text of a phrase by its ID.",
    {
        id: z.number().min(0).describe("Phrase ID"),
        phrase: z.string().max(200).describe("New phrase text")
    },
    async ({id, phrase}) => {
        const result = await makeMockAPIRequest<Phrase>("PATCH", {
            path: `/${id}`,
            body: { phrase },
        });

        const resultText = result
            ? `Updated phrase for ${result.name}: "${result.phrase}"`
            : `Failed to update phrase with ID ${id}.`;

        return {
            content: [
                {
                    type: "text",
                    text: resultText
                }
            ]
        }
    }
);

// Delete Phrase Tool
server.tool(
    "delete-phrase",
    "Deletes a phrase by its ID.",
    {
        id: z.number().min(0).describe("Phrase ID to delete")
    },
    async ({id}) => {
        const result = await makeMockAPIRequest<null>("DELETE", {
            path: `/${id}`,
        });

        const resultText = result === null
            ? `Phrase with ID ${id} was successfully deleted.`
            : `Failed to delete phrase with ID ${id}.`;

        return {
            content: [
                {
                    type: "text",
                    text: resultText
                }
            ]
        }
    }
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Phrases MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});