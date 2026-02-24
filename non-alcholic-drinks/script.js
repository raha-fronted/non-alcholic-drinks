
const drinkList = document.getElementById("drinkList");
const drinkDetails = document.getElementById("drinkDetails");
const randomBtn = document.getElementById("randomBtn");

let drinks = [];

// Fetch drinks...
fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic")
.then(res => res.json())
.then(data => {
    drinks = data.drinks;
    renderList(drinks);
});

// Render list...
function renderList(drinks){
    drinkList.innerHTML = "";

    drinks.forEach(drink=>{
        const div = document.createElement("div");
        div.className = "drink-item";
        div.textContent = drink.strDrink;

        div.addEventListener("click", ()=>{
            selectDrink(drink.idDrink, div);
        });

        drinkList.appendChild(div);
    });
}

// Select drink...
function selectDrink(id, element){

    document.querySelectorAll(".drink-item")
    .forEach(item=>item.classList.remove("active"));

    element.classList.add("active");

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=>res.json())
    .then(data=>{
        showDetails(data.drinks[0]);
    });
}

// Show details...
function showDetails(drink){

    drinkDetails.innerHTML = `
        <img src="${drink.strDrinkThumb}">
        <h2>${drink.strDrink}</h2>
        <p><b>Category:</b> ${drink.strCategory}</p>
        <p>${drink.strInstructions}</p>
    `;
}

// Random drink...
randomBtn.addEventListener("click",()=>{
    const randomDrink = drinks[Math.floor(Math.random()*drinks.length)];

    const items = document.querySelectorAll(".drink-item");

    items.forEach(item=>{
        if(item.textContent === randomDrink.strDrink){
            item.click();
        }
    });
});
