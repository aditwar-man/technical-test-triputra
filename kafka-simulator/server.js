const express = require("express");
const { Kafka } = require("kafkajs");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" },
});

const kafka = new Kafka({ clientId: "kafka-app", brokers: ["localhost:9092"] });

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "test-group" });

app.use(cors());
app.use(express.json());

io.on("connection", async (socket) => {
  console.log("Client connected");

  socket.on("sendMessage", async (data) => {
    await producer.send({
      topic: "test-topic",
      messages: [{ key: data.key, value: data.value }],
    });
    console.log(`Sent: ${data.key}: ${data.value}`);
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      io.emit("receiveMessage", {
        key: message.key.toString(),
        value: message.value.toString(),
      });
    },
  });
};

const startServer = async () => {
  await producer.connect();
  await runConsumer();
  server.listen(5000, () => console.log("Server running on port 5000"));
};

startServer().catch(console.error);
