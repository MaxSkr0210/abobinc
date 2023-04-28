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
    id: 1,
    geo: "Тула, пр. Ленина, 92",
    description: "Тулгу",
  },
  {
    id: 2,
    geo: "Тула, Галкина, 237",
    description: "Квартира",
  },
  {
    id: 3,
    geo: "Тульская область, муниципальное образование Тула, деревня Ивановка, Крестьянская улица, 6",
    description: "Дом",
  },
];

const coords = [];

ymaps.ready(init);

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
      addElement(
        "div",
        `class=search__list__item, id=${geo.id}`,
        list,
        geo.geo
      );
    });
    return;
  }
  const searchedEl = findGeo(data);
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  searchedEl.forEach((geo) => {
    addElement("div", "class=search__list__item, id=${geo.id}", list, geo.geo);
  });
});

setTimeout(() => {
  const items = document.querySelectorAll(".search__list__item");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("id");
      console.log(id);
      coords.forEach((geo) => {
        if (geo.id === Number(id)) {
          myMap.setCenter(geo.cords);
        }
      });
    });
  });
}, 200);
