// Fungsi untuk menampilkan detail film
function showDetail(movieData) {
  $("#detail-title").text(movieData.title);
  $("#detail-poster").attr("src", movieData.posterImg);
  $("#detail-rating").text("Rating: " + movieData.rating);
  $("#detail-genres").text("Genres: " + movieData.genres.join(", "));
  $("#detail-url").attr("href", movieData.url).text("Lihat Detail");
  $("#detail").show();
}

// Memuat data film dari API
function loadMovies() {
  $.ajax({
    url: "https://lk21-api.cyclic.app/movies",
    type: "GET",
    dataType: "json",
    success: function (movies) {
      movies.forEach(function (movie) {
        // Membuat elemen film
        const movieElement = $('<div class="movie"></div>');

        // Membuat elemen poster
        const posterElement = $('<img class="poster">').attr("src", movie.posterImg).attr("alt", movie.title);

        // Menambahkan event click untuk menampilkan detail film
        posterElement.click(function () {
          showDetail(movie);
        });

        // Menambahkan elemen ke dalam elemen film
        movieElement.append(posterElement);

        // Menambahkan elemen film ke dalam kontainer film
        $("#movies").append(movieElement);
      });
    },
    error: function (xhr, status, error) {
      console.error("Gagal memuat data film:", error);
    },
  });
}

// Memanggil fungsi untuk memuat data film saat halaman dimuat
loadMovies();