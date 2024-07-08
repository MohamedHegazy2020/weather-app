let city = document.querySelector('[placeholder="Find your location..."]');
let find = document.querySelector('[value="Find"]');
let noOfDays = document.querySelectorAll(".dropdown-item");
let days =3;
let searchrdCity = "cairo";

getWeather(searchrdCity, days);
const weekday = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

const d = new Date();
// console.log(d.getDay());

getDays();

function getDays() {
  let d
	for (const day of noOfDays) {
		day.addEventListener("click", function () {
			d = Number(this.value);
      getWeather(searchrdCity , d)
			// console.log(days);
		});
	}
  // return d;
  days =d

}

find.addEventListener("click", function () {
	console.log(city.value);
	searchrdCity = city.value;
	search(searchrdCity);
});
city.addEventListener("keyup", function (e) {
	if (e.code == "Enter") {
		searchrdCity = city.value;
		search(searchrdCity);
	}
});

function search(x) {
	if (x != "") {
		getWeather(searchrdCity, days);
	} else {
		alert("enter a location ,please...");
	}
}

async function getWeather(c, d) {
	let weatherReq = await fetch(
		`https://api.weatherapi.com/v1/forecast.json?key=3c3be09e214847aeb22182734232702&q=${c}&aqi=yes&days=${d}`
	).catch((err)=>console.log(err))

	let res = await weatherReq.json();
	console.log(res);

	displayWeather(res);
}

function displayWeather(r) {
	let headerCell = "";
	let bodyCell = "";

	for (const day of r.forecast.forecastday) {
		headerCell += `<th>
  <div class="d-flex justify-content-between">
    <span>${weekday[d.getDay() + r.forecast.forecastday.indexOf(day)]}</span>
    <span>${day.date}</span>
  </div>
</th>`;

		bodyCell += `<td class="p-4 mx-4">
                  <div>
                    <div class="location">${r.location.name}</div>

                    <div class="degree d-flex align-items-center justify-content-around">
                      <div class="num text-white">${
												day.day.avgtemp_c
											}<sup>o</sup>C</div>

                      <div class="forecast-icon my-5">
                        <img
                          src=".${day.day.condition.icon.slice(20)}"
                          alt="" 
                          
                        />
                      </div>
                    </div>
                    <div class="custom my-5">${day.day.condition.text}</div>
                    <div class="wind-info d-flex mt-5">
                      <span class="d-flex mx-2">
                        <i class="fa fa-umbrella" aria-hidden="true"></i>
                        <p class="mx-1">${day.day.avghumidity}%</p></span
                      >
                      <span class="d-flex mx-2">
                        <i class="fa-solid fa-wind"></i>
                        <p class="mx-1">${day.day.maxwind_kph} km/h</p></span
                      >
                      <span class="d-flex mx-2">
                        <i class="fa-solid fa-compass"></i>
                        <p class="mx-1">${day.hour[0].wind_dir}</p></span
                      >
                    </div>
                  </div>
                </td>`;
	}

	//    console.log(headerCell);
	document.querySelector(".forecast-table thead tr ").innerHTML = headerCell;
	document.querySelector(".forecast-table tbody tr ").innerHTML = bodyCell;
}
