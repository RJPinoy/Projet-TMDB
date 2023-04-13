const divContainer = document.querySelector('.container');

const apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=1ceb28896523547ede423f9a0e59e2f8&language=en-US&page=1';

fetch(apiUrl)
    // Récupération de la réponse au format JSON
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.results.length; i++) {
            let dataMovie = document.createElement('div');
            dataMovie.classList.add('film')
            divContainer.appendChild(dataMovie);

            let dataImg = document.createElement('img');
            dataMovie.appendChild(dataImg);
            dataImg.src = `https://image.tmdb.org/t/p/original${data.results[i].poster_path}`;

            let dataTitle = document.createElement('p')
            dataMovie.appendChild(dataTitle);
            dataTitle.innerHTML = data.results[i].title;
        }
        console.log(data.results[0].poster_path);
    })
    // Gestion des erreurs éventuelles
    .catch(error => console.error(error));