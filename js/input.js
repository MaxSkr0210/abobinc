const input = document.querySelector("input");
input.addEventListener("input", async () => {
  const data = input.value;
  myMap.geoObjects.removeAll();

  if (data.trim() === "") {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    addGeo(myMap, a);
    return;
  }
  const searchedEl = findGeo(data);
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  addGeo(myMap, searchedEl);
});

const search = document.querySelector("#search");
const arrow = document.querySelector("#bottom_arrow");
arrow.addEventListener("click", () => {
  const top = Number(search.style.top.replace("px", ""));
  if (top < -350) {
    search.style.top = -150 + "px";
  }
});

const items = document.querySelectorAll(".radius_item");
items.forEach((item, index) => {
  item.addEventListener("click", () => {
    myMer.length = 0;
    mer.forEach((geo) => {
      map.geoObjects.removeAll();

      ymaps.geocode(geo.address).then((res) => {
        var firstGeoObject = res.geoObjects.get(0);
        var cords = firstGeoObject.geometry.getCoordinates();
        coords.push({ ...geo, cords });

        const c = circle.geometry._coordinates;
        const m = { ...geo, cords };

        if (
          ymaps.coordSystem.geo.getDistance(c, m.cords) <
          Number(items[index].innerText)
        ) {
          myMer.push(m);
          addGeo(myMap, [m]);
        }
      });
    });

    myMap.geoObjects.add(ourCoords);
    circle = new ymaps.Circle(
      [ourCoords.position, Number(items[index].innerText)],
      null,
      {
        fillColor: "#DB709377",
        strokeColor: "#990066",
      }
    );

    myMap.geoObjects.add(circle);

    if (Number(items[index].innerText) > 1000) {
      mer.forEach((m) => {
        addElement(m);
      });
      const btns = document.querySelectorAll(".btn.subBtn");
      btns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = Number(btn.getAttribute("id"));
          console.log(mer[id]);
          console.log(TG.sendData);
          TG.sendData(JSON.stringify(mer[id]));
        });
      });
    }
  });
});
