export default function ExpenseTrackerRoutes(expenseTrackerService) {
//route for getting categoryId based on catergory type
    async function getCategory(req, res) {
        const category = req.query.category;
//get category type from query passed from the front-end
        try {
            const categoryId = await expenseTrackerService.getCategoryId(category);

//send back categoryId as a response to front-end request
            res.json({
                status: "success",
                categoryId
            })
        }

        catch (err) {
            res.json({
                status: "error",
                error: err.stack
            })
        }



    }
//route for adding expenses
    async function addExpense(req, res) {
        //get catergoryId from parameter and description, amount and total from request body all passed in
        //from the front-end
        const categoryId = req.params.id;
        const description = req.body.description;
        const amount = req.body.amount;
        const total = req.body.total;
//run query for inserting expenses into the database
        try {
            await expenseTrackerService.addExpenseItem(description, amount, total, categoryId);

            res.json({
                status: "success",
                message: "Expense has been added"
            })
        }

        catch (err) {
            res.json({
                status: "error",
                error: err.stack
            })
        }
    }
//route for getting all expenses
    async function allExpenses(req, res) {
        //run query for selecting all expenses from the database and rendering the data on the page
        try {
            const data = await expenseTrackerService.showAllExpenses()
            const allCategoryTotals = await expenseTrackerService.getTotalsForAllCategories()
            const overallTotal = await expenseTrackerService.getOverallTotal();
            res.render("all-expenses", { data, allCategoryTotals, overallTotal })
        }

        catch (err) {
            res.json({
                status: "error"
            })
        }
    }
//route for removing an expense
    async function removeExpense(req, res) {
        const expenseId = req.params.id;
        //get the expenseId from a parameter passed in from the front-end
//run query for deleting expense from the database based on the expenseId
        try {
            await expenseTrackerService.removeExpenseItem(expenseId);

            res.json({
                status: "success",
                message: "Expense has been removed"
            })
        }

        catch (err) {
            res.json({
                status: "error",
                error: err.stack
            })
        }
    }

    return {
        getCategory,
        addExpense,
        allExpenses,
        removeExpense
    }
}