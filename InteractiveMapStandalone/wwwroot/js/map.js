var map;
var markers = [];
var placesData = null;

async function initializeMap() {
    map = L.map('map').setView([47.811195, 13.033229], 6); // Salzburg as a starting point on map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const response = await fetch('data/locations.json');
    placesData = await response.json();
}

function clearMarkers() {
    markers.forEach(m => map.removeLayer(m));
    markers = [];
}

function loadMarkers(category) {
    if (!placesData || !placesData[category]) return;

    clearMarkers();

    placesData[category].forEach(place => {
        const marker = L.marker([place.lat, place.lng]).addTo(map)
            .bindPopup(place.name);
        markers.push(marker);
    });
}
