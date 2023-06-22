const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// 建立 MySQL 連接
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "sample",
  port: 8889,
});

// 連接到資料庫
connection.connect();

// 接收前端發送的資料
app.post("/submit", (req, res) => {
  const { username, userage } = req.body;

  // 將資料存儲到 MySQL 資料庫
  connection.query(
    "INSERT INTO users (name, age) VALUES (?, ?)",
    [username, userage],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred" });
      } else {
        res.json({ message: "資料已儲存" });
      }
    }
  );
});

app.get("/get-data", (req, res) => {
  connection.query("SELECT * FROM users", (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred" });
    } else {
      res.json(results);
    }
  });
});

app.get("/delete-all", (req, res) => {
  connection.query("DELETE FROM users", (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred" });
    } else {
      res.json({ message: "資料已清空" });
    }
  });
});

// 啟動伺服器
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
