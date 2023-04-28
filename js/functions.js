//Добавление элемента на страницу
const addElement = (elem, cl, parrent, data = "") => {
  const el = document.createElement(elem);
  el.className = cl;
  if (data.trim() !== "") {
    el.innerText = data;
  }
  parrent.appendChild(el);
};

//Найти мероприятия
const findGeo = (name) => {
  const arr = [];

  mer.forEach((geo) => {
    if (geo.geo.indexOf(name) >= 0) {
      arr.push(geo);
    }
  });

  return arr;
};

//Добавить гео точку
const addGeo = (map) => {
  mer.forEach((geo) => {
    addElement("div", "search__list__item", list, geo.geo);
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
