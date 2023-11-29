const deleteBtns = document.querySelectorAll(".delete-btn");
//loop through all delete buttons and add an event listener for clicks
deleteBtns.forEach(item => {
    item.addEventListener("click", async () => {
//get the expenseId from parent container
        const expenseId = item.parentElement.dataset.expenseId;

        try {
            //make a request to the back-end to delete an expense based on an expenseId
            const response = await axios.post(`/remove/${expenseId}`)
//reload the page to show the updated data
            location.reload();

        }

        catch (err) {
            console.log(err)
        }
    })
})