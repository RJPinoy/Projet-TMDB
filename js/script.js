const body = document.querySelector('body');

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
        // console.log(data.results[0].poster_path);
    })
    // Gestion des erreurs éventuelles
    .catch(error => console.error(error));