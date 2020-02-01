window.onload = () => {
    const m = L.map('geoMap').setView([0, 0], 3);
    const attr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attr });
    tiles.addTo(m);

    m.on('click', async e => {
        const { lat, lng } = e.latlng;
        const response = await fetch('/countryCode/' + lat.toFixed(2) + ',' + lng.toFixed(2));
        const json = await response.json();

        if (json.status) {
            const countryCode = json.countryCode;
            L.popup().setLatLng(e.latlng).setContent('Clicked to: ' + countryCode).openOn(m);
        }
    });
};


