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

    axios.post("https://crudcrud.com/api/af9e836238474d60be32a26ad77ab922/expense", newExpense)
        .then(() => {
            event.target.reset();
            displayData();
        })
        .catch((err) => {
            console.log(err);
        });
});


function removeData(id) {
    axios.delete(`https://crudcrud.com/api/af9e836238474d60be32a26ad77ab922/expense/${id}`)
        .then(() => {
            displayData(); 
        })
        .catch((error) => {
            console.error('Error deleting expense:', error);
        });
}


// In your displayData function
function displayData() {
    axios.get("https://crudcrud.com/api/af9e836238474d60be32a26ad77ab922/expense")
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
