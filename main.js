//set map nad intial coordinates
var mymap = L.map('mapid').setView([0, 0], 1);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'});
Esri_WorldImagery.addTo(mymap);

//shakey on-click

$('#shakey').click(function(){

  console.log("getting quakes");

  $.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", function(qResult) {

    console.log(qResult)

    qResult.features.forEach(function(quake) {
      //get coordinates for each quakes
      var qLng = quake.geometry.coordinates[0];
      var qLat = quake.geometry.coordinates[1];
      //get magnitude
      var qMag = parseFloat(quake.properties.mag);



      if (qLng && qLat && qMag) {
              var circle = L.circle([qLat, qLng], qMag * 10000, {
                color: 'red',
                opacity: 0,
                fillColor: 'red',
                fillOpacity: 0.8
              })
              //add to map
              circle.addTo(mymap);
            }

    })

  });

});




//dropey on-click

$('#dropey').click(function(){

  console.log("getting showers");

  $.getJSON("https://data.nasa.gov/resource/gh4g-9sfh.json", function(mResult) {

  console.log(mResult)

  mResult.forEach(function(shower) {

    if(shower.geolocation) {
    //  get coordinates for each shower
    var mLat = shower.geolocation.latitude;
    var mLng = shower.geolocation.longitude;
}


  if (mLng && mLat ) {
           var circle = L.circle([mLat, mLng], 25000, {
             color: 'blue',
             opacity: 0,
             fillColor: 'blue',
             fillOpacity: 0.8
           })

           circle.addTo(mymap).bindPopup(''+shower.name+'');
            //add to map
            circle.addTo(mymap);
        }

        if(shower.geolocation) {
              var mLat = shower.geolocation.latitude;
              var mLng = shower.geolocation.longitude;
            }






  });
});
});
