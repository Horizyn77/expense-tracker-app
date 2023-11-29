import express from "express";
import { engine } from "express-handlebars";
import 'dotenv/config';
import pgPromise from 'pg-promise';

const app = express();
const pgp = pgPromise({});

const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString)

const PORT = process.env.PORT || 3000;

app.use(express.static("public"))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Hello")
})

app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`));