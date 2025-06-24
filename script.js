// 初始化地圖
const map = L.map('map').setView([25.0330, 121.5654], 15);

// 加入 OSM 磁磚
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 範例廁所資料
const toilets = [
  { name: "台北車站廁所", lat:25.0478, lng:121.5170, info:"開放時間 24h" },
  { name: "捷運中山站廁所", lat:25.0521, lng:121.5200, info:"週一維護" },
  { name: "公園無障礙廁所", lat:25.0360, lng:121.5580, info:"附嬰兒車道" }
];

// 加入標記與資訊框
toilets.forEach(t => {
  L.marker([t.lat, t.lng]).addTo(map)
    .bindPopup(`<strong>${t.name}</strong><br>${t.info}`);
});

// 顯示使用者位置
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(pos => {
    const latlng = [pos.coords.latitude, pos.coords.longitude];
    L.circleMarker(latlng, { color:'blue' }).addTo(map)
      .bindPopup("這是你的位置").openPopup();
    map.setView(latlng, 15);
  });
}
