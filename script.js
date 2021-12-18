var searchPanel = $('#search-panel');
var searchButton = $('#search');
var resultsPanel = $('#results-panel');
var triviaPanel = $('#trivia-panel');
var jeopardyQuestion = $('.jeopardy-question');
var foodButtons = $('.food');
var query = {
    diet: [],
    health: []
};
var textInput = $('#searchTerm');


// Edamam api app id and key
const app_id = 'bb917b29';
const app_key = 'ca9b61b9c9cb28f8e5aeccd56a855a75';

function onPageLoad() {
    var savedSearch = localStorage.getItem('query');

    if (!savedSearch) {
        return;
    }

    // Update the global variable and matching button styles
    query = JSON.parse(savedSearch);
    console.log(query);

    // looping over the categories (health, or diet) in query
    for (var key in query) { 
        var thisCategory = query[key];

        // looping over the selected options within the categories (low-fat, vegan, etc.)
        for (var i = 0; i < thisCategory.length; i++) { 
            var thisOption = thisCategory[i];
            // remove the "secondary" class to show it's selected
            $(`[value=${thisOption}]`).removeClass('secondary');
        }
    }
}

function getRecipes() {

    var search = textInput.val();

    var url = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${app_id}&app_key=${app_key}`;

    // only add the health query string if a selection has been made
    if (query.health.length) {
        url += `&health=${query.health.join("&health=")}`;
    }

    // only add the diet query string if a diet selection has been made
    if (query.diet.length) {
        url += `&diet=${query.diet.join("&diet=")}`;
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
            let recipes = data.hits;
            for (var i = 0; i < recipes.length; i++) {
                let recipe = recipes[i].recipe;
                let template = 
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

function getQuestion() {
    fetch('https://jservice.io/api/random')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
            var question = data[0].question;
            var answer = data[0].answer;

            jeopardyQuestion.html(question);

            jeopardyQuestion.data('answer', answer);

        });
}

function jeopardyClick() {
    let container = $(this).children('.jeopardy-question');
    if (container.data('answer')) {
        let answer = container.data('answer');
        container.html(answer);
        container.data('answer', ''); // clear out the answer
    } else {
        getQuestion();
    }
}

foodButtons.click(function(event){
    let button = $(event.target);
    let key = button.data('key');
    let value = button.val();

    if (event.target.classList.contains("secondary")) {
        button.removeClass('secondary');
        query[key].push(value);
    } else {
        button.addClass('secondary')

        let index = query[key].indexOf(value);
        query[key].splice(index, 1);
    }
    
    // Add to localStorage here
    localStorage.setItem('query', JSON.stringify(query));

})

onPageLoad();

searchButton.click(getRecipes);
triviaPanel.click(jeopardyClick);
getQuestion();