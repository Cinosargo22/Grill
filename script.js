fetch('https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=bb917b29&app_key=ca9b61b9c9cb28f8e5aeccd56a855a75').then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
})

fetch('http://jservice.io/api/random').then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
})
