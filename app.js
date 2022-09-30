const countrySelect = document.querySelector("#country");
const countryOption = document.querySelector("#country option");
const resultInfo = document.querySelector(".result ul");
const mesage = document.querySelector(".msg");

fetch("https://restcountries.com/v3.1/all")
  .then((res) => {
    if (!res.ok) {
      makeError(`Something went wrong : ${res.status}`);
      throw new Error();
    }
    return res.json();
  })
  .then((data) => {
    OptionName(data);
  })
  .catch((err) => console.log(err));

function makeError() {
  mesage.innerText = "Countries can not fetched";
  setTimeout(() => {
    mesage.innerText = "";
  }, 3000);
}

function OptionName(data) {
  const countryName = data.map((item) => item.name.common).sort();
  countryName.forEach((item) => {
    countrySelect.innerHTML += `<option value="${item}">${item}</option>`;
  });
}

countrySelect.addEventListener("change", () => {
  const countryUrl = `https://restcountries.com/v3.1/name/${countrySelect.value}`;
  fetch(countryUrl)
    .then((res) => {
      if (!res.ok) {
        makeError(`Something went wrong : ${res.status}`);
        throw new Error();
      }
      return res.json();
    })
    .then((data) => {
      const {
        name: { official },
        capital,
        region,
        subregion,
        population,
        maps: { googleMaps },
        flags: { svg },
      } = data[0];
      resultInfo.innerHTML = `
      <li class='img'><img src='${svg}'/></li><hr/>
      <li class='name'><span>Official Name</span> : ${official}</li><hr/>
      
      <li class='cap'><span>Capital</span> : ${capital}</li><hr/>
      <li class='cap'><span>Population</span> : ${population}</li><hr/>
      <li class='cap'><span>Region</span> : ${subregion} / ${region}</li><hr/>
      <li class='maps'><a href="${googleMaps}" target="_blank"><button class ='btn btn-primary'>Map</button></a></li>
   `;
    });
});
