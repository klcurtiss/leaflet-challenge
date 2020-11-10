// All the map layers
  var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });
  var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

var outdoor = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "outdoors-v11",
  accessToken: API_KEY
});

var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "satellite-v9",
  accessToken: API_KEY
});
 //Links for the data
  var urlearth = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"
  var urlplates =  "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

  //Read through first dataset
  d3.json(urlearth, function (data){
  
  //Create a function for the color of the circles
   function color(){
 if (data.features[i].geometry.coordinates[2] < 10){
   return "#00ff00"
 }
 else if (data.features[i].geometry.coordinates[2] < 30){
   return "#ffff66"
 }
 else if (data.features[i].geometry.coordinates[2] < 50){
   return "#ffc34d"
 }
 else if (data.features[i].geometry.coordinates[2] < 70){
   return "##ff6600"
 }
 else if (data.features[i].geometry.coordinates[2] < 90){
   return "#ff33000"
 }
 else {
   return "#660000"
 }
} 
// Loop through the data and add all the points into earthquakesMarkers
  var earthquakesMarkers = []
    for( var i=0; i < data.features.length; i++) {
      earthquakesMarkers.push(L.circle(L.latLng(data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0]), {
        color: "black",
  fillColor: color(),
  fillOpacity: 0.85,
  radius: (data.features[i].properties.mag)*17000
}).bindPopup("<h3>" + "Coordinates</h3><p>" + `${data.features[i].geometry.coordinates[1].toFixed(2)},${data.features[i].geometry.coordinates[0].toFixed(2)}`+
"</p><hr><h3>Depth</h3><p>" + `${data.features[i].geometry.coordinates[1]}` + "</p>" + "<hr><h3>Magnitude</h3><p>"+`${data.features[i].properties.mag}</p>`));

   }
    var earthquakes = L.layerGroup(earthquakesMarkers);
    
  
     // *info* contains the layers for the points 
    info = {Earthquakes : earthquakes
    };
    // *layermaps* contains the map layers
    layermaps = {
      Light: light,
      Dark: dark,
      Outdoor : outdoor,
      Satellite : satellite
    };
  
  
  // Creating the map and adding the layers
    var myMap = L.map("mapid", {
      center: [37.09, -95.71],
    zoom: 4,
    layers: [earthquakes, dark]
    });
  // Add Control
    L.control.layers(layermaps, info).addTo(myMap);
});