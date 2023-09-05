const apikey = "99da5568f361ff4858c8d4e199b90988";

const cityinputEl = document.getElementById("city");
const formEl = document.getElementById("form");
const weatherdataEl = document.getElementById("weather-data");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityvalue = cityinputEl.value;
  getweatherdata(cityvalue);
});

async function getweatherdata(cityvalue) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityvalue}&appid=${apikey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response not ok");
    }

    const data = await response.json();
    
    console.log(typeof response);
    console.log(data);

    const tempreture = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const city = data.name;
    const country = data.sys.country;

    const details = [
      `Feels like :${Math.round(data.main.temp)}°C`,
      `Humidity :${data.main.humidity}%`,
      `Wind speed :${data.wind.speed}m/s`,
    ];

    weatherdataEl.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" width="100px" alt="weathericon"/>`;

    weatherdataEl.querySelector(".temp").textContent = `${tempreture}°C`;

    weatherdataEl.querySelector(".desc").textContent = `${description}`;

    weatherdataEl.querySelector(".city").textContent = `${city},${country}.`;



    document.querySelector(".details").innerHTML = details.map((a) =>`<div>${a}</div>`).join("");



  } catch (error) {
    weatherdataEl.querySelector(".icon").innerHTML = "";

    weatherdataEl.querySelector(".temp").textContent = "";

    weatherdataEl.querySelector(".desc").textContent = "An Error Occured Plase Connect to the network or Please Enter the Correct City Name";

    weatherdataEl.querySelector(".city").textContent = "";
    

    document.querySelector(".details").innerHTML = "";
  }
}
