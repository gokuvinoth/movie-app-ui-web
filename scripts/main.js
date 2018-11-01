let moviesList = document.querySelector("#movies");
let APIData = [];
let API_URL = "https://ozindianmovies.herokuapp.com/api/v1/movies/";
// "https://ozindianmovies.herokuapp.com/api/v1/movies/";
let API_Endpoint = API_URL + `getsessions`;
let backButton = document.querySelector("#backButton");
backButton.addEventListener("click", function() {
  renderMovieList(APIData);
});

function renderMovieList(apiData) {
  changeTitle("Ozziewood Movies");
  backButton.style.display = "none";
  moviesList.innerHTML = apiData
    .map(data => movieItemTemplate(data))
    .join("\n");

  let movies = document.querySelectorAll("#movielist > .movie");
  movies.forEach(movie => {
    movie.addEventListener("click", () => renderMovieDetails(movie.id));
  });
}
// Calling the movie result api
callApi(API_Endpoint, renderMovieList);

function callApi(API_Endpoint, callback) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      APIData = xhr.response.content;
      callback(APIData);
    }
  };
  xhr.open("GET", API_Endpoint);
  xhr.send();
}

let searchBarTextBox = document.querySelector("#searchBarTextBox");
let searchText = document.querySelector("#searchText");
let searchBar = document.querySelector("#searchBar");
let searchBarPane = document.querySelector("#searchBarPane");
let filterBar = document.querySelector("#filterBar");

searchBar.addEventListener("click", function() {
  searchBarTextBox.classList.toggle("is-hidden");
});

filterBar.addEventListener("click", function() {
  searchBarPane.classList.toggle("is-hidden");
});

searchText.addEventListener("input", function() {
  let searchTextValue = searchText.value;
  renderMovieList(filterSearchText(APIData, searchTextValue));
});

let filters = {};
filters = {
  language: [],
  location: []
};

let languageTamil = document.querySelector("#languageTamil");
let languageMarathi = document.querySelector("#languageMarathi");
let languageMalayalam = document.querySelector("#languageMalayalam");
let languageTelugu = document.querySelector("#languageTelugu");
let languageKannada = document.querySelector("#languageKannada");
let languageHindi = document.querySelector("#languageHindi");
let locationACT = document.querySelector("#locationACT");
let locationNSW = document.querySelector("#locationNSW");
let locationVIC = document.querySelector("#locationVIC");
let locationNT = document.querySelector("#locationNT");
let locationSA = document.querySelector("#locationSA");
let locationTAS = document.querySelector("#locationTAS");
let searchSave = document.querySelector("#searchSaveButton");
let searchCancelButton = document.querySelector("#searchCancelButton");

languageTamil.addEventListener("click", function() {
  modifyFilterData(filters, "language", languageTamil.value);
});

languageMarathi.addEventListener("click", function() {
  modifyFilterData(filters, "language", languageMarathi.value);
});

languageMalayalam.addEventListener("click", function() {
  modifyFilterData(filters, "language", languageMalayalam.value);
});

languageTelugu.addEventListener("click", function() {
  modifyFilterData(filters, "language", languageTelugu.value);
});

languageKannada.addEventListener("click", function() {
  modifyFilterData(filters, "language", languageKannada.value);
});

languageHindi.addEventListener("click", function() {
  modifyFilterData(filters, "language", languageHindi.value);
});

locationACT.addEventListener("click", function() {
  modifyFilterData(filters, "location", locationACT.value);
});

locationNSW.addEventListener("click", function() {
  modifyFilterData(filters, "location", locationNSW.value);
});

locationVIC.addEventListener("click", function() {
  modifyFilterData(filters, "location", locationVIC.value);
});

locationNT.addEventListener("click", function() {
  modifyFilterData(filters, "location", locationNT.value);
});

locationSA.addEventListener("click", function() {
  modifyFilterData(filters, "location", locationSA.value);
});

locationTAS.addEventListener("click", function() {
  modifyFilterData(filters, "location", locationTAS.value);
});

searchSave.addEventListener("click", function() {
  searchBarPane.classList.toggle("is-hidden");
  callApi(filtersApplied(filters, API_URL), renderMovieList);
});

searchCancelButton.addEventListener("click", function() {
  searchBarPane.classList.toggle("is-hidden");
  resetfilters();
  callApi(filtersApplied(filters, API_URL), renderMovieList);
});

function filtersApplied(filters, API_URL) {
  let API_Endpoint = `${API_URL}getSessions`;
  if (filters.language.length > 0) {
    API_Endpoint = `${API_URL}getSessions?languages=${filters.language.join(
      ","
    )}`;
  }
  if (filters.location.length > 0) {
    if (filters.language.length > 0) {
      API_Endpoint = API_Endpoint + `&states=${filters.location.join(",")}`;
    } else {
      API_Endpoint = `${API_URL}getSessions?states=${filters.location.join(
        ","
      )}`;
    }
  }
  return API_Endpoint;
}

function filterSearchText(movies, searchTxt) {
  movies = movies.filter(
    movie =>
      searchTxt.length > 0
        ? movie.title.toLowerCase().includes(searchTxt.toLowerCase())
        : true
  );
  return movies;
}

function modifyFilterData(filterObject, filterKey, filterValue) {
  if (filterObject[filterKey].indexOf(filterValue) === -1) {
    filterObject[filterKey].push(filterValue);
  } else {
    filterObject[filterKey].splice(
      filterObject[filterKey].indexOf(filterValue),
      1
    );
  }
}
function resetfilters() {
  filters = {
    language: [],
    location: []
  };

  languageTamil.checked = false;
  languageMarathi.checked = false;
  languageMalayalam.checked = false;
  languageTelugu.checked = false;
  languageKannada.checked = false;
  languageHindi.checked = false;
  locationACT.checked = false;
  locationNSW.checked = false;
  locationVIC.checked = false;
  locationNT.checked = false;
  locationSA.checked = false;
  locationTAS.checked = false;
}
function changeTitle(title) {
  document.getElementById("page-title").innerHTML = title;
}

function searchLanguagesTemplate(languages) {
  let languagesCount = languages.length;
  let renderedLanguages = [];
  let renderedLanguage = [];
  let renderedLanguageReturn = "";
  let dummyTemplate = `<label class="language-checkbox">      
    <span class="language"></span>
</label>`;
  let languageLabelTemplate = language => {
    return `<label class="language-checkbox">
    <input class="checkbox" type="checkbox" id="language${language}" value="${language}">
    <span class="language">${language}</span>
</label>`;
  };
  renderedLanguage = languages.map(language => {
    return languageLabelTemplate(language);
  });

  renderedLanguage.forEach((language, index) => {
    if (index % 3 === 0 && index > 0)
      renderedLanguages.push(`</div><div class="column">${language}`);
    else if (index % 3 === 0 && index === 0)
      renderedLanguages.push(`<div class="column">${language}`);
    else renderedLanguages.push(language);
  });
  renderedLanguageReturn = renderedLanguages.join("");
  if (languagesCount % 3 !== 0) {
    renderedLanguageReturn = `${renderedLanguageReturn}${dummyTemplate.repeat(
      3 - (languagesCount % 3)
    )}`;
  }
  renderedLanguageReturn = `${renderedLanguageReturn}</div>`;
  return renderedLanguageReturn;
}

let listOfLanguages = ["Tamil", "Marathi", "Hindi", "Telugu"];
function ratingStarTemplate(ratingCounter) {
  return `
  ${'<i class="fas fa-star movie-star-rating"  aria-hidden=" true"></i>'.repeat(
    ratingCounter[0]
  )}
  ${'<i class="fas fa-star-half-alt movie-star-rating" aria-hidden=" true"></i>'.repeat(
    ratingCounter[1]
  )}
  ${'<i class="far fa-star movie-star-rating"  aria-hidden=" true"></i>'.repeat(
    ratingCounter[2]
  )}`;
}

function ratingStarCalulation(ratingValue) {
  let ratingCounter = [0, 0, 0];
  let totalRatingCount = ratingValue;
  ratingCounter[0] = Math.floor(totalRatingCount % 5);
  ratingCounter[1] = Math.round(totalRatingCount % 1);
  ratingCounter[2] = 5 - ratingCounter[0] - ratingCounter[1];
  return ratingStarTemplate(ratingCounter);
}

function movieItemTemplate(movie) {
  return `<ul class="movie-list" id="movielist">
  <li class="movie" id="${movie._id}">
      <div class="column-left">
          <img class="movie-poster" src="${movie.poster}"
              alt="${movie.title || "Movie poster"}">
      </div>
      <div class="column-right">
          <h2 class="movie-title">${movie.title || "Untitled"}</h2>
          <div><p class="movie-rating">${movie.language ||
            "Unknown"} | ${ratingStarCalulation(movie.rating)}</p>
          <p class="movie-language"></p><div>
          <p class="movie-duration"><i class="fas fa-hourglass-start"></i> ${movie.duration ||
            "Unknown"} minutes</p>
      </div>
  </li>
  </ul>`;
}

function renderMovieDetails(id) {
  let movieDetails = APIData.find(element => element._id === id);

  changeTitle(movieDetails.title);
  backButton.style.display = "block";

  moviesList.innerHTML = `<div class="movie-details" id="moviedetails">
  <iframe class="movie-trailer" id="${
    movieDetails._id
  }" src="https://www.youtube.com/embed/${movieDetails.trailer.split("=")[1]}"
frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

  <div class="movie-details-info">
      <div class="movie-detail-genre">
          <strong>Genre: </strong>${movieDetails.genres}
      </div>

      <div class="movie-detail-duration">
          <strong>Duration: </strong>${movieDetails.duration}
          <i class="fa fa-hourglass-half movie-duration-time" aria-hidden="true"></i>
      </div>

      <div class="movie-detail-rating">
          ${ratingStarCalulation(movieDetails.rating)}
      </div>
  </div>

  <div class="tab" id="tab">
      <button class="movie-name" id="moviename">${movieDetails.title ||
        "Unknown"}</button>
      <button class="movie-session-off" id="moviesession">Session</button>
  </div>

  <div class="movie-details-story-container" id="moviedetailsstorycontainer">
      <div class="movie-details-story" id="moviedetailsstory">

          <div class="movie-details-title">${movieDetails.title ||
            "Unknown"}</div>

          <div class="movie-detailed-script" id="moviedetailedscript">${
            movieDetails.synopsis
          }
  </div>

          <div class="movie-details-title">
              <i class="fa fa-users movie-cast" id="moviecast" aria-hidden="true"></i>Starring
          </div>

          <ul class="movie-cast-list" id="moviecastlist">
              ${movieDetails.leadActors
                .join(",")
                .split(",")
                .map(leadActor => {
                  return '<li class="movie-cast-name" id="">' + leadActor;
                })
                .join(",</li>\n") + ".</li>"}
          </ul>
          <div class="movie-crew">Crew</div>
          <ul class="movie-crew-list" id="moviecrewlist">
              <li class="movie-crew-name" id="moviecrewname"><span class="genre-detail" id="genredetail">Director
                      :</span>
                  ${movieDetails.crew.director}</li>
              <li class="movie-crew-name" id="moviecrewname"><span class="genre-detail" id="genredetail">Music-Director
                      :</span>
                  ${movieDetails.crew.musicDirector}</li>
          </ul>

      </div>

      <div class="movie-details-session-off" id="moviesdetailssession">
          ${movieDetails.sessions
            .map(session => {
              return `${session.cinema.state} 
           - ${session.cinema.location}<br>
             ${renderSessionDetails(session.sessionDateTime)}<br>
              `;
            })
            .join("\n")}
      </div>
  </div>
</div>`;

  let sessionDivElement = document.querySelector("#moviesdetailssession");
  let MovieDetailsDivElement = document.querySelector("#moviedetailsstory");
  let MovieSessionsBtn = document.querySelector("#moviesession");
  let MovieNameBtn = document.querySelector("#moviename");

  MovieSessionsBtn.addEventListener("click", function() {
    sessionDivElement.classList.add("movie-details-session");
    MovieSessionsBtn.classList.add("movie-session");
    MovieSessionsBtn.classList.remove("movie-session-off");
    sessionDivElement.classList.remove("movie-details-session-off");
    MovieNameBtn.classList.add("movie-name-off");
    MovieDetailsDivElement.classList.add("movie-details-story-off");
    MovieNameBtn.classList.remove("movie-name");
    MovieDetailsDivElement.classList.remove("movie-details-story");
  });

  MovieNameBtn.addEventListener("click", function() {
    sessionDivElement.classList.remove("movie-details-session");
    MovieSessionsBtn.classList.remove("movie-session");
    MovieSessionsBtn.classList.add("movie-session-off");
    sessionDivElement.classList.add("movie-details-session-off");
    MovieNameBtn.classList.remove("movie-name-off");
    MovieDetailsDivElement.classList.remove("movie-details-story-off");
    MovieNameBtn.classList.add("movie-name");
    MovieDetailsDivElement.classList.add("movie-details-story");
  });

  function convertDate(dateTime) {
    return dateTime
      .split("T")[0]
      .split("-")
      .reverse()
      .join("-");
  }

  function sessionDateTimeTemplate(sessionObj) {
    let dateTimeHtmlElement = "";
    Object.keys(sessionObj).forEach(date => {
      dateTimeHtmlElement += `<i class="fa fa-calendar movie-session-calendar" id="" aria-hidden="true"></i> ${date}
       : <i class="far fa-clock movie-session-clock" id="" aria-hidden="true"></i>
       ${
         sessionObj[date]
       } <button class="movie-book-btn"><i class="fas fa-ticket-alt movie-ticket"></i>
       <span class="book"> Book now </span>
   </button><br>`;
    });

    return dateTimeHtmlElement;
  }

  function renderSessionDetails(sessionDateTimes) {
    let sessionObj = {};

    sessionDateTimes.forEach(sessionDateTime => {
      const date = convertDate(sessionDateTime);
      const time = timeAMPMConversion(sessionDateTime);

      if (!sessionObj[date]) sessionObj[date] = "";
      if (!!sessionObj[date]) sessionObj[date] = sessionObj[date] + ", ";
      sessionObj[date] += time || "";
    });

    return sessionDateTimeTemplate(sessionObj);
  }

  function timeAMPMConversion(DatetimeValue) {
    let timeValue = DatetimeValue.split("T")[1].split(":")[0];
    if (timeValue > 12) {
      return `${timeValue - 12}:${
        DatetimeValue.split("T")[1].split(":")[1]
      } PM`;
    } else {
      return `${timeValue}:${DatetimeValue.split("T")[1].split(":")[1]} AM`;
    }
  }
}
