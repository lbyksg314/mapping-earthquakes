//add console.log to check if code is working
console.log('working');


//use streets and satelliteStreets style for tilte layer to our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', 
                    {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: API_KEY

            });


let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id :'mapbox/atellite-streets-v11',
    accessToken: API_KEY
});


// Create a base layer that holds both maps.
let baseMaps = {
  'Streets': streets,
  'Satellite Streets': satelliteStreets
};

// Create the map object with center (toronto), zoom level and default layer.
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);



// update the GeoJSON URL by using toronto data
let torontoHoods = "https://raw.githubusercontent.com/FIRE-Phoebe/Mapping_Earthquakes/main/torontoNeighborhoods.json";

//create style
let myStyle= {
  color:'blue',
  weight: 1,
  fillColor: 'yellow'
}

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {
                style: myStyle,
                onEachFeature: function(feature,layer) { 
                                          console.log(layer);
                                  layer.bindPopup('<h2>Neighborhood: ' 
                                  + feature.properties.AREA_NAME + '</h2>')}
                
}).addTo(map);

});

//skill drill: make the line blue, weight 1, polygon fill color yellow
//add popup show nerighborhood., 
//make default map layer streets w/ satellie Streets as second option
