//set map nad intial coordinates
var mymap = L.map('mapid').setView([0, 0], 1);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'});
Esri_WorldImagery.addTo(mymap);

//shakey on-click

$('#shakey').click(function(){

  console.log("getting quakes");

  $.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", function(result) {

    console.log(result)

    result.features.forEach(function(quake) {
      //get coordinates for each quakes
      var lng = quake.geometry.coordinates[0];
      var lat = quake.geometry.coordinates[1];

      var circle = L.circle([lat, lng], 1, {
        color: 'red',
        opacity: 0,
        fillColor: 'red',
        fillOpacity: 0.8
      })
      //add to map
      circle.addTo(mymap);

    })

  });

});
