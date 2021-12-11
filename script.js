var searchPanel = $('#search-panel');
var resultsPanel = $('#results-panel');
var triviaPanel = $('#trivia-panel');

// Edamam api app id and key
const app_id = 'bb917b29';
const app_key = 'ca9b61b9c9cb28f8e5aeccd56a855a75';

function getRecipes(search){

    fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${app_id}&app_key=${app_key}`)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        });
}

function getQuestions(){
    fetch('https://jservice.io/api/random')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}
