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

document.querySelector(".btn").addEventListener("click", () => {
  TG.sendData("123");
});
