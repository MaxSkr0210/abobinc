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

document.querySelector(".subBtn").addEventListener("click", () => {
  TG.sendData(
    `[{"id":1,"org_name":"q","event_name":"q","start_date":"q","end_date":"q","address":"q","phone_number":"q","email":"q","org_inn":"q","category":"Музыка","admin_approve_photo":null,"ovd_approve_photo":null,"description":null,"payments":null,"company_site":null,"created_at":"2023-04-29T06:28:56.224Z"},{"id":2,"org_name":"q","event_name":"q","start_date":"q","end_date":"q","address":"q","phone_number":"q","email":"q","org_inn":"q","category":"Музыка","admin_approve_photo":null,"ovd_approve_photo":null,"description":null,"payments":null,"company_site":null,"created_at":"2023-04-29T06:28:56.224Z"},{"id":3,"org_name":"1","event_name":"1","start_date":"2003-02-22T12:12:00","end_date":"2003-02-22T15:15:00","address":"1","phone_number":"1","email":"1","org_inn":"1111","category":"Спорт","admin_approve_photo":null,"ovd_approve_photo":null,"description":null,"payments":"nope","company_site":"1","created_at":"2023-04-29T10:21:24.019Z"}]`
  );
});
