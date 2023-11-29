const addExpenseBtn = document.querySelector("#add-expense-btn");
const descriptionInput = document.querySelector("#description-input");
const amountInput = document.querySelector("#amount-input");
//calculate the totals for each category based on the amount * the calculated period
function calculateTotal(amount, category) {
    if (category === "monthly") {
        return amount * 1;
    } else if (category === "weekly") {
        return amount * 4;
    } else if (category === "weekday") {
        return amount * 5;
    } else if (category === "weekend") {
        return amount * 2;
    } else if (category === "once-off") {
        return amount * 1;
    } else if (category === "daily") {
        return amount * 30;
    }
}
//an event listener on the add button
addExpenseBtn.addEventListener("click", async () => {
    //getting the checked category
    const checkedBtn = document.querySelector("input[name='category']:checked");
    //if the button is checked and the description and amount inputs are not empty
    if (checkedBtn && descriptionInput.value && amountInput.value) {
//calculate the total
        const total = calculateTotal(Number(amountInput.value), checkedBtn.value);

        try {
            //make a request to get the categoryId from the back-end
            const response = await axios.get(`/category?category=${checkedBtn.value}`);

            const categoryId = response.data.categoryId;
//make another request to add the expense to the database using the data passed in
            const res = await axios.post(`/add/${categoryId}`, {
                description: descriptionInput.value,
                amount: Number(amountInput.value),
                total
            })
//alert the user that an expense has been added
            alert("Expense added");

        }

        catch (err) {
            console.log(err)
        }
    }
})