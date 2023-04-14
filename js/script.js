const body = document.querySelector('body');

async function fetchMovieGenre() {
    const apiUrlGenre = 'https://api.themoviedb.org/3/genre/movie/list?api_key=1ceb28896523547ede423f9a0e59e2f8&language=en-US';

    let genres = [
        [],
        []
    ];
    
    await fetch(apiUrlGenre)
        .then(response => response.json())
        .then(data => {
            for(i=0; i < data.genres.length; i++) {
                genres[0].push(data.genres[i].id)
                genres[1].push(data.genres[i].name)
            };
        })
        .catch(error => console.error(error));

    return genres;
}

async function getMovieGenre(movieId) {
    const genres = await fetchMovieGenre();
    // console.log(genres);
    // console.log(genres[0].indexOf(movieId));
    if(genres[0].indexOf(movieId) >= 0) {
        console.log( genres[1][genres[0].indexOf(movieId)] )
        return genres[1][genres[0].indexOf(movieId)];
    } else {
        console.log( "error" )
        return "error"
    }
}

const apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=1ceb28896523547ede423f9a0e59e2f8&language=en-US&page=1';

fetch(apiUrl)
    // Récupération de la réponse au format JSON
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.results.length; i++) {
            let dataDivContent = document.createElement('div');
            dataDivContent.classList.add('content')
            body.appendChild(dataDivContent);

            let dataDivCard = document.createElement('div');
            dataDivCard.classList.add('card');
            dataDivContent.appendChild(dataDivCard);

            let dataDivFront = document.createElement('div');
            dataDivFront.classList.add('front');
            dataDivCard.appendChild(dataDivFront);
            dataDivFront.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${data.results[i].poster_path})`;

            let dataDivBack = document.createElement('div');
            dataDivBack.classList.add('back');
            dataDivCard.appendChild(dataDivBack);
            dataDivBack.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${data.results[i].poster_path})`;

            let dataDiv = document.createElement('div');
            dataDivBack.appendChild(dataDiv);

            let dataMovieTitle = document.createElement('h2');
            dataDiv.appendChild(dataMovieTitle);
            dataMovieTitle.innerHTML = data.results[i].title;

            let dataMovieOverview = document.createElement('p');
            dataDiv.appendChild(dataMovieOverview);
            dataMovieOverview.innerHTML = data.results[i].overview;
        }
        console.log(data.results);
        for(i=0; i < data.results[0].genre_ids.length; i++) {
            getMovieGenre(data.results[0].genre_ids[i]);
        }
    })
    // Gestion des erreurs éventuelles
    .catch(error => console.error(error));

    
    
function fetchData(typeRecherche, tri) {


    const tmdb = `https://api.themoviedb.org/3/${typeRecherche}/${tri}?api_key=b2f52ce7ac8c777811346b478862bb0f&language=en-US&page=1`;

    fetch(tmdb)
        .then(response => response.json())
        .then(data => {
            data
            console.log(data)
        })




        .catch(error => {
            console.error(error);
            console.log(fetchData())


        });
}



function selector() {
    const typeRecherche = document.getElementById("select1").value;
    const tri = document.getElementById("select2").value;
    fetchData(typeRecherche, tri);
}

let selecteur = document.querySelectorAll('select');

for (let i = 0; i < selecteur.length; i++) {
    selecteur[i].addEventListener('input', () => {
            selector();
    });
}
const select1 = document.getElementById("select1");
const tv = document.querySelectorAll('.tv');
const movie = document.querySelectorAll('.movie')

select1.addEventListener("change", () => {
    if (select1.value === "movie") {
            tv.forEach(item => item.classList.toggle("filtre"));
    } else {
            tv.forEach(item => item.classList.remove("filtre"));
    }
    if (select1.value === 'tv') {
            movie.forEach(item => item.classList.toggle("filtre"));
    } else {
            movie.forEach(item => item.classList.remove("filtre"));
    }
});
const moviesList = document.getElementById('movies-list');

function displayMovies(movies) {
    moviesList.innerHTML = '';

    movies.forEach(movie => {
            const movieElement = document.createElement('li');
            movieElement.innerHTML = `<h2>${movie.title}</h2>
                                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title} Poster">
                                <p>${movie.overview}</p>`;
            moviesList.appendChild(movieElement);
    });
}
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
async function searchMovies(query) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=b2f52ce7ac8c777811346b478862bb0f&query=${query}`);
    const data = await response.json();

    if (data.results.length === 0) {
            moviesList.innerHTML = '<p>No movies found</p>';
    } else {
            displayMovies(data.results);
    }

}
