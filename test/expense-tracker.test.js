import assert from 'assert';
import ExpenseTrackerService from '../services/expense-tracker-service.js';

import pgPromise from 'pg-promise';
import 'dotenv/config';

const pgp = pgPromise({});

const connectionString = process.env.DATABASE_URL_TEST;

const db = pgp(connectionString)

const expenseTrackerService = ExpenseTrackerService(db);

describe("Testing the Expense Tracker App", function() {
    this.timeout(20000)
    
    beforeEach(async function () {
        //Clean all tables
        await db.none("DELETE FROM expense")
    })
    //testing adding an expense
    it("should be able to add an expense", async () => {
        
        await expenseTrackerService.addExpenseItem("Playstation", 13000, 13000, 5);

        const result = await expenseTrackerService.showAllExpenses();

        const expense = result[0].expense

        assert.deepEqual(expense, "Playstation")
    })
})