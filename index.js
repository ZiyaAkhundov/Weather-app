let a="";
window.onload = function() {
  getlocation()
}
function getlocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, checkError);
  } 
}

//Error Checks
const checkError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Please allow access to location");
      break;
    case error.POSITION_UNAVAILABLE:
       alert("Location Information unavailable");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out");
  }
};

const showLocation = async (position) => {
  let response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
  );
  console.log(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);
  let data = await response.json();
  a=`${data.address.city}`
  weather.fetchWeather(a);
};
let weather = {
    apiKey: "3a423e69733d73e82db36fb159d6f17a",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +city+"&units=metric&appid="+this.apiKey)
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = Math.round(temp) + "°C";
      document.querySelector(".humidity").innerText ="Humidity: "+humidity+"%";
      document.querySelector(".wind").innerText ="Wind speed: "+speed+"km/h";
      document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  weather.fetchWeather("New York");
// Github https://github.com/ZiyaAkhundov


