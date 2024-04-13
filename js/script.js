function tampilkanMovies() {
  $("#movie-list").html("");
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "c4963bbd",
      s: $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;
        console.log(movies);
        $.each(movies, function (i, data) {
          $("#movie-list").append(
            `
              <div class="col-md-4">
              <div class="card mb-3">
                  <img src="` +
              data.Poster +
              `" class="card-img-top">
                  <div class="card-body">
                      <h5 class="card-title">` +
              data.Title +
              `</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">` +
              data.Year +
              `</h6>
              <a href="#" class="card-link see-detail" data-bs-toggle="modal"
              data-bs-target="#exampleModal" data-id="` +
              data.imdbID +
              `">See Detail</a>
                  </div>
              </div>
              </div>`
          );
        });

        $("#search-input").val("");
      } else {
        $("#movie-list").html(
          `
          <div class='col'>  
          <h1 class="text-center">` +
            result.Error +
            `</h1>
          </div>
         `
        );
      }
    },
  });
}

$("#search-button").on("click", function () {
  tampilkanMovies();
});

$("#search-input").on("keyup", function (e) {
  if (e.keyCode === 13) {
    tampilkanMovies();
  }
});

//Detail Film
$("#movie-list").on("click", ".see-detail", function () {
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "c4963bbd",
      i: $(this).data("id"),
    },
    success: function (movie) {
      if (movie.Response === "True") {
        $(".modal-body").html(
          `
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="` +
            movie.Poster +
            `" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>` +
            movie.Title +
            `</h3></li>
                                <li class="list-group-item"> <h5>Released</h5>` +
            movie.Released +
            `</li>
                                <li class="list-group-item"><h5>Director</h5>` +
            movie.Director +
            `</li>
                               
                                <li class="list-group-item"><h5>Writer</h5>` +
            movie.Writer +
            `</li>
                                <li class="list-group-item"><h5>Plot</h5>` +
            movie.Plot +
            `</li>
                            </ul>
                        </div>
                        
                    </div>
                </div>

            `
        );
      }
    },
  });
});
