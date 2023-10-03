let form=document.querySelector('form');

let main=document.querySelector('.main')
form.addEventListener("submit",(event)=>{
   // alert("hello")
    let expenseAmount=event.target.num.value;

    let description=event.target.txt.value;

    let category=event.target.ctgry.value;

    

    var userData=JSON.parse(localStorage.getItem("userDetails"))??[]
    
    userData.push({
        'expenseAmount':expenseAmount,
        'description':description,
        'category':category,
    })

    localStorage.setItem("userDetails",JSON.stringify(userData))
    event.target.reset();
    displayData();
    event.preventDefault();
});

let displayData=()=>{
    
    var userData=JSON.parse(localStorage.getItem("userDetails"))??[];
    var finalData=''
    userData.forEach((element,i)=>{
        finalData+=`<div class="inner">
        ${element.expenseAmount}-${element.description}-${element.category}
        <button onclick='removeData(${i})'>Delete</button>
        <button onclick='editData(${i})'>Edit</button>
    </div>`
    })
    main.innerHTML=finalData;
}

let removeData=(index)=>{
    
    var userData=JSON.parse(localStorage.getItem("userDetails"))??[];
    userData.splice(index,1)
    localStorage.setItem("userDetails",JSON.stringify(userData))
    displayData()

}
function editData(index) {
    const userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
    const { expenseAmount, description, category } = userData[index];

    // Pre-fill the form with existing data
    form.num.value = expenseAmount;
    form.txt.value = description;
    form.ctgry.value = category;

    // Remove the item from the list (you can also keep it in the list if needed)
    userData.splice(index, 1);
    localStorage.setItem("userDetails", JSON.stringify(userData));

    // Change the form submission behavior to update the item instead of adding
    form.removeEventListener("submit", formSubmissionHandler);
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const newExpenseAmount = event.target.num.value;
        const newDescription = event.target.txt.value;
        const newCategory = event.target.ctgry.value;

        addOrEditExpense(newExpenseAmount, newDescription, newCategory, index);
        event.target.reset();
    });
}


displayData()