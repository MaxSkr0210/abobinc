const input = document.querySelector("input");
input.addEventListener("input", async () => {
  const data = input.value;
  myMap.geoObjects.removeAll();

  if (data.trim() === "") {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    addGeo(myMap, mer);
    return;
  }
  await swiper.update();
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

document.querySelector(".subBtn").addEventListener("click", async () => {
  const data = await getEvents();

  TG.sendData(data);
});
