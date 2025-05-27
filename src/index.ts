#!/usr/bin/env node
import { MCPServer } from "@mastra/mcp";
import { nasaPicOfDayTool } from "./tools/nasaPicOfDay";
import { getCurrentDateTool } from "./tools/getCurrentDate";

const server = new MCPServer({
  name: "nasa-mcp-server",
  version: "1.0.0",
  tools: { nasaPicOfDayTool, getCurrentDateTool },
});

server.startStdio().catch((error) => {
  console.error("Error running MCP server:", error);
  process.exit(1);
});
