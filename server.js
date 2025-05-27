const express = require("express");
const cors = require("cors");
const app = express();

// CORS 설정 추가
app.use(
  cors({
    origin: "http://localhost:3001", // 프론트엔드 주소
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// ... existing code ...
