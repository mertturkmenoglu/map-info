window.onload = () => {
    const m = L.map('geoMap').setView([0, 0], 3);
    const attr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attr });
    tiles.addTo(m);

    m.on('click', e => console.log(`Clicked to: ${e.latlng}`));
};
