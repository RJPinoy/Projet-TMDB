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

let choiceType = document.querySelector('#select1');
let choiceTri = document.querySelector('#select2');
const link = `https://api.themoviedb.org/3/${choiceType.value}/${choiceTri.value}?api_key=1ceb28896523547ede423f9a0e59e2f8&language=en-US&page=1`;

choiceTri.addEventListener("change", () => {
    console.log(choiceType.value);
    fetch(link)
    // Récupération de la réponse au format JSON
    .then(response => response.json())
    .then(data => { 
        console.log(data)
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
})

function filtre(){
    let select1=document.querySelector('#select1')   
    let select2=document.querySelector('#select2')  
    if (select1.value=="movie"){
        for (let i = 0; i < select2.options.length; i++) {
            let option = select2.options[i];
            if (option.classList.contains('tv') ) {  
                option.style.display = 'none';
            }
            if(option.classList.contains('movies')){
                option.style.display = 'block';
            }
        } 
    }
    else {
        for (let i = 0; i < select2.options.length; i++) {
            let option = select2.options[i];
            if (option.classList.contains('movies')) {  
                option.style.display = 'none';
            }
            if(option.classList.contains('tv')){
                option.style.display = 'block';
            }
        } 
    }
}    
filtre()
select1.addEventListener('click',filtre)

function displayMovies(movies) {
    movies.forEach(movie => {
        let dataDivContent = document.createElement('div');
        dataDivContent.classList.add('content')
        body.appendChild(dataDivContent);
        
        let dataDivCard = document.createElement('div');
        dataDivCard.classList.add('card');
        dataDivContent.appendChild(dataDivCard);
        
        let dataDivFront = document.createElement('div');
        dataDivFront.classList.add('front');
        dataDivCard.appendChild(dataDivFront);
        dataDivFront.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.poster_path})`;
        
        let dataDivBack = document.createElement('div');
        dataDivBack.classList.add('back');
        dataDivCard.appendChild(dataDivBack);
        dataDivBack.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.poster_path})`;
        
        let dataDiv = document.createElement('div');
        dataDivBack.appendChild(dataDiv);
        
        let dataMovieTitle = document.createElement('h2');
        dataDiv.appendChild(dataMovieTitle);
        dataMovieTitle.innerHTML = movie.title;
        
        let dataMovieOverview = document.createElement('p');
        dataDiv.appendChild(dataMovieOverview);
        dataMovieOverview.innerHTML = movie.overview;
    });
}
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const btn = document.querySelector('button');
async function searchMovies(query) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=b2f52ce7ac8c777811346b478862bb0f&query=${query}`);
    const data = await response.json();
    
    if (data.results.length === 0) {
        console.log('<p>No movies found</p>');
    } else {
        displayMovies(data.results);
    }
}

btn.addEventListener("click", (e) => {
    e.preventDefault();
    
    console.log(searchInput.value);
    searchMovies(searchInput.value);
    
    return false;
})

document.addEventListener("keydown", (e) => {
    if(e.key == "r") {
        location.reload();
    }
})