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
      // Menampilkan detail film
      $("#movie-info").html(`
      <img src="${movie.posterImg}" alt="${movie.title}">
      <h2>${movie.title}</h2>
      <p>Rating: ${movie.rating}</p>
      <p>Genres: ${movie.genres.join(", ")}</p>
      <p><a href="${movie.url}" target="_blank">Lihat Detail</a></p>
    `);
    },
    error: function (xhr, status, error) {
      console.error("Gagal memuat detail film:", error);
      $("#movie-info").html("<p>Detail film tidak ditemukan.</p>");
    },
  });
}

// Memanggil fungsi untuk memuat detail film saat halaman dimuat
loadMovieDetails();
