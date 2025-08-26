import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
const prisma = new PrismaClient();

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true);
      await handler(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  // Socket.io setup
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:3000"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-room", (room) => {
      socket.join(room);
      console.log(`Client ${socket.id} joined room ${room}`);
    });

    socket.on("ai-request", async (data) => {
      try {
        // Handle AI requests
        const { type, prompt, room } = data;
        
        // Emit processing status
        socket.to(room).emit("ai-processing", { status: "processing" });

        // Process AI request (placeholder - integrate with actual AI service)
        const response = await processAIRequest(type, prompt);

        // Emit response
        socket.to(room).emit("ai-response", { response, type });
      } catch (error) {
        console.error("AI request error:", error);
        socket.emit("ai-error", { error: "Failed to process AI request" });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

async function processAIRequest(type: string, prompt: string) {
  // Placeholder for AI processing
  // Integrate with Z-AI SDK or other AI services here
  switch (type) {
    case "research":
      return { result: `Research results for: ${prompt}`, confidence: 0.95 };
    case "analytics":
      return { data: "Analytics data processed", insights: ["Insight 1", "Insight 2"] };
    case "image-generation":
      return { imageUrl: "generated-image-url", prompt: prompt };
    default:
      return { result: `Processed: ${prompt}` };
  }
}