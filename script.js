let myMap;

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

const addGeo = (map) => {
  mer.forEach((geo) => {
    ymaps.geocode(geo.geo).then((res) => {
      var firstGeoObject = res.geoObjects.get(0);
      var cords = firstGeoObject.geometry.getCoordinates();
      coords.push(cords);
      const newGeo = new ymaps.Placemark(
        cords,
        {
          balloonContent: geo.description,
        },
        {
          iconLayout: "default#image",
          iconImageHref: "images/admin.png",
        }
      );
      map.geoObjects.add(newGeo);
    });
  });
};

const addLocation = (geolocation, map) => {};

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
      //   ymaps.formmater.distance(ymaps.coordSystem.geo.getDistance(moscowCoords, newYorkCoords))
    });
}
