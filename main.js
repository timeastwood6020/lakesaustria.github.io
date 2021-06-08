//basemap Hintergruende definieren; eigentlich sollte nur ein Layer bei map instantiation geladen werden, die anderen sollten in der layercontrol stehen

let baselayers = {
    standard: L.tileLayer.provider("BasemapAT.basemap"),
    grau: L.tileLayer.provider("BasemapAT.grau"),
    terrain: L.tileLayer.provider("BasemapAT.terrain"),
    surface: L.tileLayer.provider("BasemapAT.surface"),
    highdpi: L.tileLayer.provider("BasemapAT.highdpi"),
    ortho_overlay: L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ]),
};

// Karte initialisieren und auf Oesterreichs Wikipedia Koordinate blicken
let map = L.map("map", {
    fullscreenControl: true,
    center: [47.59397, 14.12456],
    zoom: 8,
    layers: [
        baselayers.grau
    ]
});

let layerScale = L.control.scale({
    maxwidth: 800,
    metric: true,
    imperial: false,
}).addTo(map);

let overlays = {
    stations: L.featureGroup(),
};

let layerControl = L.control.layers({
    "basemap.at Standard": baselayers.standard,
    "basemap.at grau": baselayers.grau,
    "basemap.at Relief": baselayers.terrain,
    "basemap.at Oberfläche": baselayers.surface,
    "basemap.at hochauflösend": baselayers.highdpi,
    "basemap.at Orthofoto beschriftet": baselayers.ortho_overlay
    }, {
        "Messstation Seen Österreich": overlays.stations,
    }, {
        collapsed: false
    }).addTo(map);


var awsUrl = 'https://www.ages.at/typo3temp/badegewaesser_db.json'

fetch(awsUrl)
    .then(response => response.json())
    .then(json => {
        //  console.log('Daten konvertiert: ', json);
        for (station of json.features) {
            //console.log('Station: ', station);
            //https://leafletjs.com/reference-1.7.1.html#marker
            let marker = L.marker([
                station.BUNDESLAENDER.BADEGEWAESSER[0].LATITUDE,
                station.BUNDESLAENDER.BADEGEWAESSER[0].LONGITUDE
            ]);

            marker.bindPopup(`
            <h3>${station.BUNDESLAENDER.BADEGEWAESSER[0].BADEGEWAESSERNAME}</h3>`);
            marker.addTo(overlays.stations);

        }});