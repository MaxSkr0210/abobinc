let myMap;
const list = document.querySelector(".swiper-wrapper");

const deleteControls = [
  "trafficControl",
  "searchControl",
  "scaleLine",
  "typeSelector",
];

let mer;
(async function () {
  mer = await getEvents();
})();

ymaps.ready(init);

const coords = [];

const myMer = [];

function init() {
  const geolocationControl = new ymaps.control.GeolocationControl({
    options: {
      float: "right",
    },
  });
  const geolocation = ymaps.geolocation;
  myMap = new ymaps.Map(
    "map",
    {
      center: [55.76, 37.64], // Москва
      zoom: 10,
      controls: [geolocationControl],
    },
    {
      searchControlProvider: "yandex#search",
    }
  );
  deleteControls.forEach((control) => {
    myMap.controls.remove(control);
  });
  addGeo(myMap, mer);
  geolocation
    .get({
      provider: "browser",
      mapStateAutoApply: true,
    })
    .then(function (result) {
      result.geoObjects.options.set("preset", "islands#redCircleIcon");

      const ourCoords = result.geoObjects;
      myMap.geoObjects.add(ourCoords);

      const circle = new ymaps.Circle([ourCoords.position, 5000], null, {
        fillColor: "#DB709377",
        strokeColor: "#990066",
      });

      circle.events.add("drag", function () {
        var objectsInsideCircle = objects.searchInside(circle);
        objectsInsideCircle.setOptions("preset", "twirl#greenIcon");
        objects
          .remove(objectsInsideCircle)
          .setOptions("preset", "twirl#blueIcon");
      });
      myMap.geoObjects.add(circle);
    });
}

const slide = document.querySelector("#slide");
const slideContainer = document.querySelector("#search");

//mobile

function selectItem(i) {
  const id = Number(i);
  coords.forEach((geo) => {
    if (geo.id === Number(id)) {
      myMap.setCenter(geo.cords);
    }
  });
}

slide.addEventListener("touchmove", (e) => {
  var touchLocation = e.targetTouches[0];
  slideContainer.style.top = touchLocation.pageY - 670 + "px";
  const num = slideContainer.style.top.replace("px", "");
  if (Number(num) < -250) {
    slideContainer.style.top = "-500px";
  }
});

//desctop
slide.onmousedown = (e) => {
  let coords = getCoords(slideContainer);
  var shiftY = e.pageY - coords.top;
  function moveAt(e) {
    slideContainer.style.top = e.pageY - shiftY - 610 + "px";
    const num = slideContainer.style.top.replace("px", "");
    if (Number(num) < -350) {
      slideContainer.style.top = "-630px";
    }
  }

  document.onmousemove = function (e) {
    moveAt(e);
  };

  slideContainer.onmouseup = function () {
    document.onmousemove = null;
    slide.onmouseup = null;
  };
};

function getCoords(elem) {
  // кроме IE8-
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
  };
}

slide.ondragstart = function () {
  return false;
};
