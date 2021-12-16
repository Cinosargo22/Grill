var searchPanel = $('#search-panel');
var searchButton = $('#search');
var resultsPanel = $('#results-panel');
var triviaPanel = $('#trivia-panel');
var foodButtons = $('.food');
var selected = [];
var textInput = $('#searchTerm');


// Edamam api app id and key
const app_id = 'bb917b29';
const app_key = 'ca9b61b9c9cb28f8e5aeccd56a855a75';

function getRecipes() {

    var search = textInput.val();

    var url = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${app_id}&app_key=${app_key}`;

    // only add the health query string if a selection has been made
    if (selected.length) {

        url += `&health=${selected.join("&health=")}`;
    }

    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }

            throw Error("Search failed, please try again.");
        })
        .then(function (data) {
            resultsPanel.empty();
            console.log(data);
            let recipes = data.hits;
            for (var i = 0; i < recipes.length; i++) {
                let recipe = recipes[i].recipe;
                let template = '' + 
                    `<div class="card cell medium-4" style="width: 300px;">
                        <div class="card-divider"><a href="${recipe.url}" target="_blank">${recipe.label}</a></div>
                        <img src="${recipe.image}" alt="${recipe.label}" SameSite="Lax">
                        <p>Calories: ${Math.round(recipe.calories)}</p>
                        <p>Serves: ${recipe.yield}</p>
                    </div>`;
                resultsPanel.append($(template));
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}

function getQuestions(){
    fetch('https://jservice.io/api/random')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var Question = data[0].question
            console.log (Question);
            triviaPanel.text(Question);

        });
}

foodButtons.click(function(event){
    if (event.target.classList.contains("secondary")) {
        $(event.target).removeClass('secondary')
        selected.push(event.target.value);
    } else {
        $(event.target).addClass('secondary')
        var removeValue = selected.indexOf(event.target.value);
        selected.splice(removeValue,1);
    }
    
})


searchButton.click(getRecipes);
getQuestions();