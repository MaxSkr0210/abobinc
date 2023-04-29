//Добавление элемента на страницу
const addElement = (data) => {
  const el = document.createElement("div");
  el.className = "swiper-slide";
  el.innerText = data.event_name;
  const button = document.createElement("button");
  button.setAttribute("id", data.id - 1);
  list.appendChild(el);
  button.innerText = "Подписаться";
  button.className = "btn subBtn";
  el.appendChild(button);
};

//Найти мероприятия
const findGeo = (name) => {
  const arr = [];

  mer.forEach((geo) => {
    if (geo.description.indexOf(name) >= 0) {
      arr.push(geo);
    }
  });

  return arr;
};

//Добавить гео точку
const addGeo = (map, mer) => {
  mer.forEach((geo) => {
    addElement(geo);
    ymaps.geocode(geo.address).then((res) => {
      var firstGeoObject = res.geoObjects.get(0);
      var cords = firstGeoObject.geometry.getCoordinates();
      coords.push({ id: geo.id, cords });
      const newGeo = new ymaps.Placemark(
        cords,
        {
          balloonContent: geo.event_name,
        },
        {
          iconLayout: "default#image",
          iconImageHref: "images/самовар2.png",
          iconImageSize: [23, 25],
        }
      );

      newGeo.events.add("click", function () {
        alert("О, событие!");
      });

      map.geoObjects.add(newGeo);
    });
  });
};
