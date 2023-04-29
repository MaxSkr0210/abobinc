const input = document.querySelector("input");
input.addEventListener("input", () => {
  const data = input.value;
  myMap.geoObjects.removeAll();

  if (data.trim() === "") {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    addGeo(myMap, mer);
    mer.forEach((geo) => {
      addElement(
        "div",
        `class=swiper-slide, id=${geo.id}`,
        list,
        geo.description
      );
    });
    return;
  }
  swiper.update();
  const searchedEl = findGeo(data);
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  addGeo(myMap, searchedEl);
  searchedEl.forEach((geo) => {
    addElement(
      "div",
      `class=swiper-slide, id=${geo.id}`,
      list,
      geo.description
    );
  });
});

const search = document.querySelector("#search");
const arrow = document.querySelector("#bottom_arrow");
arrow.addEventListener("click", () => {
  const top = Number(search.style.top.replace("px", ""));
  if (top < -350) {
    search.style.top = -150 + "px";
  }
});

document.querySelector(".btn").addEventListener("click", () => {
  TG.sendData("Мы победим нахой");
});
