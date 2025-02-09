# Kafka Simulator

Kafka Simulator adalah aplikasi berbasis **Node.js** dan **React.js** yang digunakan untuk mensimulasikan **Producer** dan **Consumer** Kafka secara real-time menggunakan **KafkaJS** dan **Socket.io**.

## 📌 Fitur

- **Producer**: Mengirim pesan ke Kafka.
- **Consumer**: Menerima pesan secara real-time.
- **WebSocket**: Menggunakan **Socket.io** untuk komunikasi real-time.

## 🛠 Instalasi dan Setup

### **1. Instalasi Dependensi**

```sh
 npm install
```

### **2. Setup Apache Kafka**

Karena saya disini menggunakan docker untuk menjalankan Apache Kafka nya, maka dibutuhkan menjalankan command dibawah ini

```sh
 docker compose up -d
```

### **4. Menjalankan Backend**

```sh
 node server.js
```

### **5. Menjalankan Frontend**

```sh
 npm start
```

## 🚀 Teknologi yang Digunakan

- **Node.js** (Express, KafkaJS, Socket.io)
- **React.js** (Frontend untuk simulasi)
- **Apache Kafka** (Messaging System)

## 📝 Cara Kerja

1. **Producer** mengirim pesan ke **Kafka** melalui WebSocket.
2. **Kafka Consumer** mengambil pesan dari Kafka dan meneruskannya ke **Client**.
3. **Socket.io** menangani komunikasi real-time antara **Backend & Frontend**.

## 🎯 Hasil yang Diharapkan

✅ **Producer** dapat mengirim pesan ke Kafka dengan **key & value**.
✅ **Consumer** dapat menerima pesan secara **real-time**.
✅ **Web UI** untuk mengontrol pengiriman dan penerimaan pesan.

## 🔗 Referensi

- [KafkaJS](https://kafkajs.io/)
- [Socket.io](https://socket.io/)
- [React.js](https://react.dev/)

✨ **Selamat Mencoba!** 🚀
