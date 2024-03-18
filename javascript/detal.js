$(document).ready(function () {
  // Mendapatkan parameter id dari URL
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  // Memuat data film berdasarkan id
  function loadMovieDetails() {
    $.ajax({
      url: "https://lk21-api.cyclic.app/movies/" + movieId,
      type: "GET",
      dataType: "json",
      success: function (movie) {
        // Mengisi data film ke elemen-elemen HTML
        $("#movie-poster").attr("src", movie.posterImg);
        $("#movie-title").text(movie.title);
        $("#movie-rating").text("Rating: " + movie.rating);
        $("#movie-genres").text("Genres: " + movie.genres.join(", "));
        $("#movie-releaseDate").text(movie.releaseDate);
        $("#movie-duration").text(movie.duration);
        $("#movie-synopsis").text(movie.synopsis);
        $("#movie-countries").text("Countries: " + movie.countries.join(", "));
        $("#movie-casts").text("" + movie.casts.join(", "));

        // Menambahkan event click untuk membuka tautan film saat tombol diklik
        $("#movie-url").click(function () {
          window.open(movie.trailerUrl, "_blank");
        });
      },
      error: function (xhr, status, error) {
        console.error("Gagal memuat detail film:", error);
        $("#movie-details").html("<p>Gagal memuat detail film.</p>");
      },
    });
  }

  // Memanggil fungsi untuk memuat detail film saat halaman dimuat
  loadMovieDetails();
});

$(document).ready(function () {
  // Dapatkan ID film dari parameter URL
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  // Memuat dan menampilkan detail film
  loadMovieDetail(movieId);

  // Memuat dan menampilkan rekomendasi film
  loadRecommendations(movieId);
});

// Fungsi untuk memuat dan menampilkan detail film
function loadMovieDetail(movieId) {
  $.ajax({
    url: "https://lk21-api.cyclic.app/movies/" + movieId,
    type: "GET",
    dataType: "json",
    success: function (movie) {
      // Tampilkan detail film sesuai dengan data yang diterima
      $("#detail-title").text(movie.title);
      $("#detail-poster").attr("src", movie.posterImg);
      $("#detail-rating").text("Rating: " + movie.rating);
      $("#detail-genres").text("Genres: " + movie.genres.join(", "));
      $("#detail-url").attr("href", movie.url).text("Lihat Detail");
      $("#detail").show();
    },
    error: function (xhr, status, error) {
      console.error("Gagal memuat detail film:", error);
    },
  });
}

// Fungsi untuk memuat dan menampilkan rekomendasi film berdasarkan ID film yang dipilih
function loadRecommendations(selectedMovieId) {
  $.ajax({
    url: "https://lk21-api.cyclic.app/movies",
    type: "GET",
    dataType: "json",
    success: function (movies) {
      const recommendationsContainer = $("#recommendations-container");
      recommendationsContainer.empty(); // Menghapus konten sebelumnya

      // Membuat rekomendasi film yang berbeda dari film yang dipilih
      movies.slice(0, 3).forEach(function (movie) {
        if (movie._id !== selectedMovieId) {
          const cardElement = $("<div class='card'></div>");
          cardElement.html(`
            <img src="${movie.posterImg}" alt="${movie.title}">
            <div class="card-text">
              <h3>${movie.title}</h3>
              <p>Rating: ${movie.rating}</p>
              <p>Genres: ${movie.genres.join(", ")}</p>
              <button class="buttonrekomen" onclick="window.location.href='detail.html?id=${movie._id}'">Detail</button>
            </div>
          `);
          recommendationsContainer.append(cardElement);
        }
      });
    },
    error: function (xhr, status, error) {
      console.error("Gagal memuat rekomendasi film:", error);
    },
  });
}

// Memanggil fungsi untuk memuat dan menampilkan saran film saat halaman dimuat
loadRecommendations();
