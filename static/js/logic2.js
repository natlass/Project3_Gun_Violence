// We create the tile layer that will be the background of our map.
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});
// Check that we are pulling our data correctly by console logging
console.log(user);
// Initialize all of the LayerGroups we'll be using
var layers = {
  fifteen: new L.LayerGroup(),
  sixteen: new L.LayerGroup(),
  seventeen: new L.LayerGroup(),
  eighteen: new L.LayerGroup(),
};
// Create the map object with center, zoom level and default layer.
// Create the map with our layers
var map = L.map("mapid", {
  center: [37.8283, -98.5795],
  zoom: 5,
  layers: [
    layers.fifteen,
    layers.sixteen,
    layers.seventeen,
    layers.eighteen,
  ]
});
// Create a base layer that holds all three maps.
lightmap.addTo(map);
// Add an extra layer group for combined years
let allYears = new L.LayerGroup();
// Add overlays for each year
var overlays = {
    "2015": layers.fifteen,
    "2016": layers.sixteen,
    "2017": layers.seventeen,
    "2018": layers.eighteen,
  };
// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(null, overlays).addTo(map);
// Here we create a legend control object.
var legend = L.control({
position: "bottomright"
});
// Then add all the details for the legend
legend.onAdd = function () {
let div = L.DomUtil.create("div", "info legend");
const deaths = [0, 1, 2, 3, 4];
const colors = [
    "blue",
    "green",
    "yellow",
    "orange",
    "red"
];
// Looping through our intervals to generate a label with a colored square for each interval.
for (var i = 0; i < deaths.length; i++) {
    div.innerHTML +=
    "<i style='background: " + colors[i] + "'></i> " +
    deaths[i]+ (deaths[i + 1] ? "&ndash;" + deaths[i + 1] + "<br>" : "+");
}
return div;
};
// Finally, we add our legend to the map.
legend.addTo(map);

// This function determines the color of the marker based on number of victims killed
function getColor(n_killed) {
    if (n_killed == 0) {
        return "blue";
    }
    if (n_killed >= 1) {
        return "green";
    }
    if (n_killed >= 2) {
        return "yellow";
    }
    if (n_killed >= 3) {
        return "orange";
    }
    if (n_killed >= 4) {
        return "red";
    }
};
// Attach our data to the year layer and attach correct pop ups
for (const property in user) {
    for (var i = 0; i < user[property].length; i++) {
        var data = user[property][i]
        var style = {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(data.n_killed),
            color: "#000000",
            radius: 8,
            stroke: true,
            weight: 0.5
        }
        var temp_marker = new L.circle(data["combined"],style)
        .bindPopup("Number Killed: " + data.n_killed + "<br>Location: " + data.state + "<br>Number Injured: " + data.n_injured);
        
        if (data.year == "2015") {
            temp_marker.addTo(layers.fifteen)
        }
        else if (data.year == "2016") {
            temp_marker.addTo(layers.sixteen)
        }
        else if (data.year == "2017") {
            temp_marker.addTo(layers.seventeen)
        }
        else if (data.year == "2018") {
            temp_marker.addTo(layers.eighteen)
        }

    }

};