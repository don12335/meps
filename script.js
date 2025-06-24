
const map = L.map('map').setView([25.04, 121.56], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const icons = {
  male: L.icon({ iconUrl: 'icons/male.png', iconSize: [32, 32] }),
  female: L.icon({ iconUrl: 'icons/female.png', iconSize: [32, 32] }),
  accessible: L.icon({ iconUrl: 'icons/accessible.png', iconSize: [32, 32] })
};

let markers = [];

function loadToilets(filter = "all") {
  fetch("toilets.json")
    .then(res => res.json())
    .then(data => {
      markers.forEach(m => map.removeLayer(m));
      markers = [];
      data.forEach(t => {
        if (filter === "all" || t.type === filter) {
          const marker = L.marker([t.lat, t.lng], { icon: icons[t.type] });
          marker.bindPopup(`<b>${t.name}</b><br>${t.info}`);
          marker.addTo(map);
          markers.push(marker);
        }
      });
    });
}

document.getElementById("filter").addEventListener("change", e => {
  loadToilets(e.target.value);
});

loadToilets();
