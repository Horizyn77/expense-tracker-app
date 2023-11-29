//importing neccessary dependencies
import express from "express";
import { engine } from "express-handlebars";
import 'dotenv/config';
import pgPromise from 'pg-promise';
//importing routes and services
import ExpenseTrackerService from "./services/expense-tracker-service.js";
import ExpenseTrackerRoutes from "./routes/expense-tracker-routes.js";
//creating an instance of express and pg-promise
const app = express();
const pgp = pgPromise({});
//setting up up the connection strings and database
const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString)

const PORT = process.env.PORT || 3000;

app.engine("handlebars", engine({
    layoutsDir: "./views/layouts"
}));

app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"))

app.use(express.static("public"))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const expenseTrackerService = ExpenseTrackerService(db);
const expenseTrackerRoutes = ExpenseTrackerRoutes(expenseTrackerService);
//get and post routes
app.get("/", (req, res) => {
    res.render("home")
})

app.get("/all", expenseTrackerRoutes.allExpenses)

app.get("/category", expenseTrackerRoutes.getCategory)

app.post("/add/:id", expenseTrackerRoutes.addExpense)

app.post("/remove/:id", expenseTrackerRoutes.removeExpense)


app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`));