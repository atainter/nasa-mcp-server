import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import axios from "axios";

const NASA_API_KEY = process.env.NASA_API_KEY;

export async function fetchNasaPicOfDay(
  date: string | undefined,
  apiKey: string
) {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}${
        date ? `&date=${date}` : ""
      }`
    );
    return {
      title: response.data.title,
      explanation: response.data.explanation,
      url: response.data.url,
      date: response.data.date,
      copyright: response.data.copyright || "Public Domain",
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch NASA picture of the day: ${error.message}`
      );
    }
    throw new Error("Failed to fetch NASA picture of the day");
  }
}

export const nasaPicOfDayTool = createTool({
  id: "NASA Picture of the Day Tool",
  description: "Fetches the NASA picture of the day for a given date",
  inputSchema: z.object({
    date: z
      .string()
      .optional()
      .describe(
        "The date to fetch the picture of the day for, in YYYY-MM-DD format"
      ),
  }),
  execute: async ({ context: { date } }) => {
    if (!NASA_API_KEY) {
      throw new Error("NASA API key is not set");
    }
    return fetchNasaPicOfDay(date, NASA_API_KEY);
  },
});
