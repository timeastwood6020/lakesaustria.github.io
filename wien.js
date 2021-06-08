let basemapGray = L.tileLayer.provider('BasemapAT.grau');

let map = L.map("map", {
    fullscreenControl: true,
    center: [48.208333, 16.373056],
    zoom: 13,
    layers: [
        basemapGray
    ]

});

let layerControl = L.control.layers({
    "BasemapAT.grau": basemapGray
}).addTo(map);

fetch("data/BADESTELLENOGD.json")
.then(response => response.json())
.then(stations => {
    L.geoJson(stations, {
        onEachFeature: (feature, layer) => {
            layer.bindPopup(feature.properties.BEZEICHNUNG)
        },
        pointToLayer: (geoJsonPoint, latlng) => {
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: 'icons/badestelle.png',
                    iconSize: [39, 39]
                })
            })
        }
    }).addTo(map);
})