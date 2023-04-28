let myMap;
const list = document.querySelector("#search__list");

const deleteControls = [
  "trafficControl",
  "searchControl",
  "scaleLine",
  "typeSelector",
];

const mer = [
  {
    geo: "Тула, пр. Ленина, 92",
    description: "Тулгу",
  },
  {
    geo: "Тула, Галкина, 237",
    description: "Квартира",
  },
  {
    geo: "Тульская область, муниципальное образование Тула, деревня Ивановка, Крестьянская улица, 6",
    description: "Дом",
  },
];
const coords = [];

ymaps.ready(init);

// Дождёмся загрузки API и готовности DOM.
function init() {
  const geolocation = ymaps.geolocation;
  myMap = new ymaps.Map(
    "map",
    {
      center: [55.76, 37.64], // Москва
      zoom: 10,
    },
    {
      searchControlProvider: "yandex#search",
    }
  );
  deleteControls.forEach((control) => {
    myMap.controls.remove(control);
  });
  addGeo(myMap);
  geolocation
    .get({
      provider: "browser",
      mapStateAutoApply: true,
    })
    .then(function (result) {
      result.geoObjects.options.set("preset", "islands#redCircleIcon");
      const ourCoords = result.geoObjects;
      myMap.geoObjects.add(ourCoords);
    });
}

const input = document.querySelector("input");
input.addEventListener("input", () => {
  const data = input.value;
  if (data.trim() === "") {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    mer.forEach((geo) => {
      addElement("div", "search__list__item", list, geo.geo);
    });
    return;
  }
  const searchedEl = findGeo(data);
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  searchedEl.forEach((geo) => {
    addElement("div", "search__list__item", list, geo.geo);
  });
});
