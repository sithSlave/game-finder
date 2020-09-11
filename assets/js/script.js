var topTenBoxEl = document.querySelector("#top-ten");
var reviewEl = document.querySelector("#review");
var searchEl = document.querySelector("#userSearch");
var searchText = document.querySelector("#gameSearch");
var searchResultEl = document.querySelector("#search-result");

var getTopTen = function () {
    fetch("https://rawg-video-games-database.p.rapidapi.com/games", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
            "x-rapidapi-key": "b26c93ba6cmshec93fde4486eaf6p1c7506jsn8451a97d31ae"
        }
    })
        .then(response => {
            response.json().then(data => {
                displayTopTen(data.results);
            })
        })
        .catch(err => {
            console.log(err);
        });
}

var displayTopTen = function (gameDataArr) {
    for (var i = 0; i < 1 && i < gameDataArr.length; i++) {
        // console.log(gameDataArr[i]);

        var gameBoxEl = document.createElement("div");
        gameBoxEl.setAttribute("id", gameDataArr[i].id);

        var gameTitleEl = document.createElement("h2");
        gameTitleEl.textContent = gameDataArr[i].name;
        gameBoxEl.appendChild(gameTitleEl);

        var gameScoreEl = document.createElement("p");
        gameScoreEl.textContent = gameDataArr[i].metacritic;
        gameBoxEl.appendChild(gameScoreEl);

        var gameDetails = getGameDetails(gameDataArr[i].slug);
        console.log(gameDetails);

        topTenBoxEl.appendChild(gameBoxEl);
    }
}

var getGameDetails = async function (gameName) {
    fetch(`https://rawg-video-games-database.p.rapidapi.com/games/${gameName}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
            "x-rapidapi-key": "b26c93ba6cmshec93fde4486eaf6p1c7506jsn8451a97d31ae"
        }
    })
        .then(response => {
            response.json().then(function(data) {
                return(data);
            });
        })
        .catch(err => {
            console.log(err);
        });
}

getTopTen();


var searchSubmit = function(event){
    event.preventDefault();
    var gameTitle = searchText.value.trim();
    if(gameTitle){
        var game = gameTitle.toLowerCase().split(" ").join("-"); 
        getGameDetails(game);

    }
    searchText.value = "";

}



// fetch("https://cors-anywhere.herokuapp.com/https://www.gamespot.com/api/reviews/?api_key=348220cf9009bada78dfe5eae2cfb56639f4b00b&format=json&limit=2&filter=title:call%of%duty%warzone"
// )
// .then(response => {
// 	response.json().then(function (data){
//         console.log(data);
//         var bodyReview = data.results[0].body;
//         searchEl.innerHTML = bodyReview;
//     })
// })
// .catch(err => {
// 	console.log(err);
// });

searchEl.addEventListener("submit", searchSubmit);