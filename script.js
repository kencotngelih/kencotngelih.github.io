const inputCari = document.querySelector(".input-cari");
const tombolCari = document.querySelector(".tombol-cari");
tombolCari.addEventListener("click", function () {
  fetch(`http://www.omdbapi.com/?apikey=fc76c0a9&s=${inputCari.value}`)
    .then((res) => res.json())
    .then((res) => {
      const movies = res.Search;

      const movieContainer = document.querySelector(".movie-container");

      let data = "";
      movies.forEach((movie) => {
        data += `
          <div class="col-md-4 mt-3">
            <div class="card">
              <img src="${movie.Poster}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                <a href="#" class="btn btn-primary tombol-detail" data-toggle="modal" data-target="#tombolDetail" data-imdbid="${movie.imdbID}">See Details</a>
              </div>
            </div>
          </div>
      `;
      });

      movieContainer.innerHTML = data;

      const idTombol = document.querySelectorAll(".tombol-detail");
      idTombol.forEach((tombol) => {
        tombol.addEventListener("click", function () {
          fetch(
            `http://www.omdbapi.com/?apikey=fc76c0a9&i=${tombol.dataset.imdbid}`
          )
            .then((res) => res.json())
            .then((movieDetail) => {
              const movieDetailContent =
                document.querySelector(".movie-detail");
              movieDetailContent.innerHTML = `
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img src="${movieDetail.Poster}" class="img-fluid">
              </div>
              <div class="col">
                <ul class="list-group">
                  <li class="list-group-item"><strong>Judul :</strong> ${movieDetail.Title}</li>
                  <li class="list-group-item"><strong>Rating :</strong> ${movieDetail.imdbRating}</li>
                  <li class="list-group-item"><strong>Director :</strong>${movieDetail.Director}</li>
                  <li class="list-group-item"><strong>Actors :</strong>${movieDetail.Actors}</li>
                  <li class="list-group-item"><strong>Description :</strong>${movieDetail.Plot}</li>
                </ul>
              </div>
            </div>
          </div>
            `;
            });
        });
      });
    });
});
