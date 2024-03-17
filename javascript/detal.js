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
