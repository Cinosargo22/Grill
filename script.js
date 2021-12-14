var searchPanel = $('#search-panel');
var resultsPanel = $('#results-panel');
var triviaPanel = $('#trivia-panel');
var foodButtons = $('.food');








function getRecipes(){

    fetch('https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=bb917b29&app_key=ca9b61b9c9cb28f8e5aeccd56a855a75').then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
}

function getQuestions(){
    fetch('https://jservice.io/api/random').then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
}

foodButtons.click(function(event){
    if (event.target.classList.contains("secondary")) {
        $(event.target).removeClass('secondary')
    } else {
        $(event.target).addClass('secondary')
    }
    
})