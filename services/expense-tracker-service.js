export default function ExpenseTrackerService(db) {
    //query for getting the categoryId based on the category tyoe
    async function getCategoryId(category) {
        //get row with id of the category based on the category type passed in
        const selectQuery = `SELECT id FROM category WHERE category_type = $1`;

        const result = await db.one(selectQuery, [category]);

        return result.id
    }
    //query for adding an expense to the database based on the values passed in
    async function addExpenseItem(description, amount, total, categoryId) {
        //insert a new row into the database using the values passed in
        const insertQuery = `INSERT INTO expense (expense, amount, total, category_id) VALUES ($1, $2, $3, $4)`;

        await db.none(insertQuery, [description, amount, total, categoryId])
    }
    //query for getting all the expenses as well as the category type
    async function showAllExpenses() {
        //get all expenses and join the category table to get the category type to
        //pass to the view
        const selectQuery = `SELECT expense.*, category_type FROM expense
                            JOIN category ON category.id = expense.category_id`;

        const result = await db.manyOrNone(selectQuery)

        return result;
    }
    //query for removing an expense
    async function removeExpenseItem(expenseId) {
        //delete expense based on the expenseId passed in from the front-end
        const deleteQuery = `DELETE FROM expense WHERE id = $1`;

        await db.none(deleteQuery, [expenseId]);
    }
    //query for getting all totals for categories
    async function getTotalsForAllCategories() {
        //get category type column and sum of totals from category by joining the expense table where the id of the
        //category table is equal to the category_id of the expense table and grouping them together by the category type
        const selectQuery = `SELECT c.category_type, SUM(e.total) as total_expense FROM category c 
        JOIN expense e ON c.id = e.category_id 
        GROUP by c.category_type`;

        const result = await db.manyOrNone(selectQuery)

        return result;
    }

    async function getOverallTotal() {
        const selectQuery = `SELECT SUM(total) as overall_total FROM expense`;

        const result = await db.one(selectQuery);

        return result.overall_total
    }

    return {
        getCategoryId,
        addExpenseItem,
        showAllExpenses,
        removeExpenseItem,
        getTotalsForAllCategories,
        getOverallTotal
    }
}