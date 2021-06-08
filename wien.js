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