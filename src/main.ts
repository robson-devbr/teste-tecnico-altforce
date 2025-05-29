import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get('/', (_, res) => {
    res.send('Api is running')
});

app.listen(PORT, () => {
    console.log(`🌐 Server started successfully at http://localhost:${PORT} `);
});

console.log('🟢 main.ts Ok');
