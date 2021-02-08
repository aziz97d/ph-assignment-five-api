const searchBtn = document.getElementById("btnSearch");
const closeBtn = document.getElementsByClassName("closeButton");
const displayMeal = document.getElementById("mealDetails");
const mealSection = document.getElementById("mealSection");
const defaultDisplay = document.getElementsByClassName("defaultMealDisplay");
// const mealNotFound = document.getElementById("mealNotFound");
const mealNotFound = document.getElementsByClassName("mealNotFound");

searchBtn.addEventListener("click", function(){

    const searchTxt = document.getElementById("inputSearch").value;
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?"

    //Checking input text and change api link
    if(searchTxt.length<1){
        mealNotFound[0].style.display = "block";
        defaultDisplay[0].style.display ="none";
    }
    else if(searchTxt.length==1){
        url += "f="+searchTxt;
        defaultDisplay[0].style.display ="none";
    }
    else{
        url += "s="+searchTxt;
        defaultDisplay[0].style.display ="none";
    }

    mealSection.innerHTML = "";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            
            // console.log(data.meals);
            if(data.meals != null){

                mealNotFound[0].style.display = "none";
                data.meals.forEach(element => {
                    const mealInfo = `
                    <img src="${element.strMealThumb}" alt="" class="mealImg">
                    <h3 class="mealTitle">${element.strMeal}</h3>
                    `;
    
                    const mealDiv = document.createElement("div");
                    mealDiv.className = "meal";
                    mealDiv.setAttribute("onclick", `ShowDetailsMeal(${element.idMeal})`)
    
                    
                    mealDiv.innerHTML = mealInfo;
                    mealSection.appendChild(mealDiv);
                    // console.log(element.strMeal)
                });
            }
            else{
                mealNotFound[0].style.display = "block";
            }
            
        });
    
})


ShowDetailsMeal = mealId =>{
    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+mealId;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => showMealPopUp(data));
    
}

//pop up meal details function
showMealPopUp=data=>{
    // console.log(data);
    data.meals.forEach(element => {
        // mealSection.style.display = "none";
        // let ingredientsList= [];
        // console.log(element);
        // for (let i = 1; i <= 20; i++) {
        //     let ingredientName = element['strIngredient'+i];
        //     if(ingredientName==="")
        //         continue;
        //     ingredientsList.push(ingredientName);
        // }
        // console.log(ingredientsList);
        displayMeal.innerHTML = `
        <img src="${element.strMealThumb}" alt="" class="mealImg">
            <div class="mealInfo">
                <h2>${element.strMeal}</h2>
                <h3 class="mealIngredients">Ingredients</h3>
                <ul class="mealIngredientsList">
                   
                    <li><img class="checkImg" src="./checkIcon.png"> ${element.strIngredient1}</li>
                    <li><img class="checkImg" src="./checkIcon.png"> ${element.strIngredient2}</li>
                    <li><img class="checkImg" src="./checkIcon.png"> ${element.strIngredient3}</li>
                    <li><img class="checkImg" src="./checkIcon.png"> ${element.strIngredient4}</li>
                    <li><img class="checkImg" src="./checkIcon.png"> ${element.strIngredient5}</li>
                    <li><img class="checkImg" src="./checkIcon.png"> ${element.strIngredient6}</li>
                    <li><img class="checkImg" src="./checkIcon.png"> ${element.strIngredient7}</li>
                    <li><img class="checkImg" src="./checkIcon.png"> ${element.strIngredient8}</li>
                    <li><img class="checkImg" src="./checkIcon.png"> ${element.strIngredient7}</li>
                    <li><img class="checkImg" src="./checkIcon.png"> ${element.strIngredient8}</li>
                    <li><img class="checkImg" src="./checkIcon.png"> ${element.strIngredient7}</li>
                    <li><img class="checkImg" src="./checkIcon.png"> ${element.strIngredient8}</li>
                    
                </ul>
            </div>
            <div id="closeButton" onclick="closeMeal()"><p>X</p></div>
            `;
    });
    

    displayMeal.style.display = "block";
}

//pop up close function
function closeMeal(){
    var x = document.getElementById("closeButton");
    if (displayMeal.style.display === "none") {
        displayMeal.style.display = "block";
    } else {
        displayMeal.style.display = "none";
       
    }
}