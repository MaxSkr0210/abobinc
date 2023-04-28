let myMap;

const mer = [
  {
    geo: "Тула, пр. Ленина, 92",
  },
];

ymaps.ready(init);

const addGeo = (map) => {
  mer.forEach((geo) => {
    ymaps.geocode(geo.geo).then((res) => {
      var firstGeoObject = res.geoObjects.get(0);
      var cords = firstGeoObject.geometry.getCoordinates();
      const newGeo = new ymaps.Placemark(
        cords,
        {
          balloonContent: "цвет <strong>воды пляжа бонди</strong>",
        },
        {
          preset: "islands#icon",
          iconColor: "#0095b6",
        }
      );
      map.geoObjects.add(newGeo);
    });
  });
};

const addLocation = (geolocation, map) => {
  geolocation
    .get({
      provider: "browser",
      mapStateAutoApply: true,
    })
    .then(function (result) {
      result.geoObjects.options.set("preset", "islands#redCircleIcon");
      map.geoObjects.add(result.geoObjects);
    });
};

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

  addLocation(geolocation, myMap);
  addGeo(myMap);
}
