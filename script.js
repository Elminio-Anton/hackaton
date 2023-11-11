const API_KEY = "0B2fAvtv7ymexRiYrmjtNCiyIFdu3lkK";
let kiyvCoords = [30.560156, 50.448843];
let testMarker = [30.560156, 50.448843];
let markerTypeClasses = ["parking-marker", "ramp-marker", "elevator-marker"];
let mapContainer = document.querySelector("#mapContainer");
let map = null;

//generate random dots
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
let randomCoords = [...new Array(20)].map((_, i) => {
  return {
    type: Math.floor(getRandomArbitrary(0, markerTypeClasses.length)),
    coords: [
      getRandomArbitrary(kiyvCoords[0] - 0.005, kiyvCoords[0] + 0.005),
      getRandomArbitrary(kiyvCoords[1] - 0.005, kiyvCoords[1] + 0.005),
    ],
  };
});
console.log(randomCoords);
//

function init() {
  tt.setProductInfo("Inclusive map", "0.0.0.1");
  geoJson = {
    type: "geojson",
    data: randomCoords.map((marker) => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: marker.coords,
        },
        maxZoom: 13,
      };
    }),
  };
  console.log(geoJson);
  map = tt.map({
    key: API_KEY,
    container: "map",
    center: kiyvCoords,
    zoom: 13,
    minZoom: 11,
  });
  var popupOffsets = {
    top: [0, 0],
    bottom: [0, -70],
    "bottom-right": [0, -70],
    "bottom-left": [0, -70],
    left: [25, -35],
    right: [-25, -35],
  };
  let timer = null;
  function addSourceAndLayer() {
    if (!map.isStyleLoaded()) {
      if (timer === null) timer = setTimeout(addSourceAndLayer, 1000);
      return undefined;
    }
    timer = null;
    //map.addSource("random-markers", geoJson );
    map.addLayer({ id: "random-markers-layer", type: "fill", source: geoJson });
  }
  addSourceAndLayer();
  setTimeout(() => {
    console.log("!!!!!!!!!!");
    console.log(map.getLayer("random-markers-layer"));
    console.log(map.getSource("random-markers"));
    console.dir(map);
    console.log("!!!!!!!!!!");
  }, 10000);
  //add random markers
  /*   console.log('!!!!!!!!!!');
  console.log(tt.Evented)
  console.log('!!!!!!!!!!');
  let zoom = new tt.Evented("zoom",()=>{
    console.log("zooooom!");
  })
  zoom.on() */
  //let markersLayer = new Layer()

  /*   map.addLayer({ id: "randomMarkers", type:"fill", source:{
    type:"geojson",
    data:geoJson,
  }}); */
  /*   setTimeout(() => {
    map.addSource("random-markers", {
      type: "geojson",
      data: geoJson,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });
    setTimeout(() => {
      map.addLayer({
        id: "random-markers",
        type: "circle",
        source: "random-markers",
      });
    }, 0);
  }, 0); */

    randomCoords.forEach((marker) => {
    var element = document.createElement("div");
    element.classList.add(markerTypeClasses[marker.type]);
    var marker = new tt.Marker({ element: element })
      .setLngLat(marker.coords)
      .addTo(map);
  });
  //
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
//let map = do
