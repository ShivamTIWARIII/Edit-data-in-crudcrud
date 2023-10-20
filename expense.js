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

    axios.post("https://crudcrud.com/api/c3ed28d0d6fb4a8281a15f8571cca0a6/expense", newExpense)
        .then(() => {
            event.target.reset();
            displayData();
        })
        .catch((err) => {
            console.log(err);
        });
});


function displayData() {
    axios.get("https://crudcrud.com/api/c3ed28d0d6fb4a8281a15f8571cca0a6/expense")
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
