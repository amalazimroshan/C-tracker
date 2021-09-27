let map;
function initMap() {
  let mapOptions = {
    zoom: 2,
    mapId: "eb07bfa233a67aa3",
  };
  bounds = new google.maps.LatLngBounds();
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((p) => {
      var pos = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
      userMarker.setPosition(pos);
      map.setCenter(pos);
    });
  }
  // marker = new google.maps.Marker({
  //   position: new google.maps.LatLng(-34.397, 150.644),
  //   map: map,
  // });

  const sharerMarkerImg = {
    // url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    url: "https://img.icons8.com/ios-filled/50/fa314a/marker.png",
    scaledSize: new google.maps.Size(25, 25),
  };
  const userMarkerImg = {
    url: "https://img.icons8.com/ios-filled/50/fa314a/place-marker--v1.png",
    scaledSize: new google.maps.Size(25, 25),
    /*    origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 32), */
  };
  userMarker = new google.maps.Marker({
    position: { lat: 0, lng: 0 },
    map,
    title: "Hello World!",
    icon: userMarkerImg,
  });
  sharerMarker = new google.maps.Marker({
    position: { lat: 90, lng: 180 },
    map,
    icon: sharerMarkerImg,
    title: "hi",
  });

  map.fit;
}
