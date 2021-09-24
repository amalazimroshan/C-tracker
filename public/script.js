let map;
function initMap() {
  let mapOptions = {
    zoom: 13,
    mapId: "eb07bfa233a67aa3",
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((p) => {
      var pos = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
      console.log(pos);
      map.setCenter(pos);
    });
  }
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(-34.397, 150.644),
    map: map,
  });
  map.fit;
}
