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
        //Clean all tables and reset id column
        await db.none("TRUNCATE TABLE expense RESTART IDENTITY")
    })
    //testing adding an expense
    it("should be able to add an expense", async () => {
        
        await expenseTrackerService.addExpenseItem("Playstation", 13000, 13000, 5);

        const result = await expenseTrackerService.showAllExpenses();

        const expense = result[0].expense

        assert.equal(expense, "Playstation")
    })

    it("should be able to remove an expense", async () => {
        //first add an expense
        await expenseTrackerService.addExpenseItem("Playstation", 13000, 13000, 5);

        const result = await expenseTrackerService.showAllExpenses();

        const expense = result[0].expense
        //check that expense exists
        assert.equal(expense, "Playstation")

        //now remove expense

        //removing expense with id 1 as it's the only item added
        await expenseTrackerService.removeExpenseItem(1)

        const result2 = await expenseTrackerService.showAllExpenses();
        //testing if an empty array is returned after removing items
        assert.deepEqual(result2, [])
    })
})