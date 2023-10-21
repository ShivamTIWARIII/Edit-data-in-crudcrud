const form = document.querySelector('form');
const main = document.querySelector('.main');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const expenseAmount = event.target.num.value;
    const description = event.target.txt.value;
    const category = event.target.ctgry.value;

    const newExpense = {
        expenseAmount,
        description,
        category,
    };

    axios.post("https://crudcrud.com/api/ba3b64506bde4cb286486c2e96c5ea89/expense", newExpense)
        .then(() => {
            event.target.reset();
            displayData();
        })
        .catch((err) => {
            console.error('Error adding expense:', err);
        });
});

function removeData(id) {
    axios.delete(`https://crudcrud.com/api/ba3b64506bde4cb286486c2e96c5ea89/expense/${id}`)
        .then(() => {
            displayData();
        })
        .catch((error) => {
            console.error('Error deleting expense:', error);
        });
}

function editData(id) {
    // Fetch the existing data for editing
    axios.get(`https://crudcrud.com/api/ba3b64506bde4cb286486c2e96c5ea89/expense/${id}`)
        .then((response) => {
            const expenseToEdit = response.data;
            
            // Pre-fill the form with existing data
            form.num.value = expenseToEdit.expenseAmount;
            form.txt.value = expenseToEdit.description;
            form.ctgry.value = expenseToEdit.category;

            // Change the form submission behavior to update the item instead of adding
            form.removeEventListener('submit',formSubmissionHandler)

           
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const newExpenseAmount = event.target.num.value;
                const newDescription = event.target.txt.value;
                const newCategory = event.target.ctgry.value;

                const updatedExpense = {
                    expenseAmount: newExpenseAmount,
                    description: newDescription,
                    category: newCategory,
                };

                // Send a request to update the existing record with the correct ID
                axios.put(`https://crudcrud.com/api/ba3b64506bde4cb286486c2e96c5ea89/expense/${id}`, updatedExpense)
                    .then(() => {
                        event.target.reset();
                        displayData();
                    })
                    .catch((error) => {
                        console.error('Error updating expense:', error);
                    });
            });
        })
        .catch((error) => {
            console.error('Error editing expense:', error);
        });
}

// In your displayData function
function displayData() {
    axios.get("https://crudcrud.com/api/ba3b64506bde4cb286486c2e96c5ea89/expense")
        .then((response) => {
            const userData = response.data;
            var finalData = '';
            userData.forEach((element, i) => {
                finalData += `<div class="inner">
                ${element.expenseAmount}-${element.description}-${element.category}
                <button onclick='removeData("${element._id}")'>Delete</button>
                <button onclick='editData("${element._id}")'>Edit</button>
                </div>`;
            });
            main.innerHTML = finalData;
        })
        .catch((error) => {
            console.error('Error fetching expenses:', error);
        });
}

displayData();

