import 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js';

export function initializeMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Initialize map centered at world view
    const map = L.map('map').setView([20, 0], 2);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Define operations in 27 countries
    const locations = [
        // North America (5)
        { name: "Gold Mine - USA", coords: [37.77, -116.22], type: "gold" },
        { name: "Oil Rig - Gulf of Mexico", coords: [28.45, -88.7], type: "oil" },
        { name: "Copper Mine - Canada", coords: [-27.5, 108.5], type: "metal" },
        { name: "Gold Mine - Canada", coords: [62.4, 114.4], type: "gold" },
        { name: "Gold Mine - Alaska", coords: [64.5, -151.5], type: "gold" },

        // South America (5)
        { name: "Gold Mine - Brazil", coords: [-13.3, -69.9], type: "gold" },
        { name: "Iron Mine - Brazil", coords: [-19.6, -43.1], type: "iron" },
        { name: "Oil Rig - Brazil", coords: [-3, -39], type: "oil" },
        { name: "Gold Mine - Argentina", coords: [-34.6, -64.3], type: "gold" },
        { name: "Copper Mine - Chile", coords: [-29.4, -70.9], type: "metal" },

        // Africa (5)
        { name: "Gold Mine - Ghana", coords: [5.6, -0.2], type: "gold" },
        { name: "Oil Rig - Nigeria", coords: [5.4, 6.4], type: "oil" },
        { name: "Platinum Mine - South Africa", coords: [-26.9, 26.9], type: "metal" },
        { name: "Copper Mine - Zambia", coords: [12.8, 28.2], type: "metal" },
        { name: "Gold Mine - South Africa", coords: [-26.4, 27.7], type: "gold" },

        // Europe (4)
        { name: "Iron Mine - Sweden", coords: [65.8, 14.2], type: "metal" },
        { name: "Oil Rig - Norway", coords: [58.9, 2.4], type: "oil" },
        { name: "Gold Mine - Finland", coords: [64, 26.6], type: "gold" },
        { name: "Gold Mine - Russia", coords: [59.9, 30.3], type: "gold" },

        // Asia (6)
        { name: "Iron Mine - Australia", coords: [-20.8, 135], type: "metal" },
        { name: "Gold Mine - PNG", coords: [-6.6, 147.1], type: "gold" },
        { name: "Copper Mine - Indonesia", coords: [-8.8, 118], type: "metal" },
        { name: "Nickel Mine - New Caledonia", coords: [-18.3, 168], type: "metal" },
        { name: "Phosphate Mine - Nauru", coords: [-1.5, 166.9], type: "metal" },
        { name: "Gold Mine - New Zealand", coords: [-42, 171.7], type: "gold" },

        // Middle East (3)
        { name: "Gold Mine - China", coords: [31, 112], type: "metal" },
        { name: "Coal Mine - Mongolia", coords: [46.9, 103.7], type: "metal" },
        { name: "Gold Mine - Russia (East)", coords: [48, 123], type: "gold" },

        // Middle East and North Africa (3)
        { name: "Gold Mine - Egypt", coords: [26.5, 33.8], type: "gold" },
        { name: "Mine - Morocco", coords: [31.2, -6.2], type: "metal" },
        { name: "Sulphur Mine - Algeria", coords: [23.8, 4], type: "metal" },
    ];

    // Custom icons
    const goldIcon = L.divIcon({
        html: '<i class="fas fa-gem" style="color: #ffd700; font-size: 1.5rem;"></i>',
        className: 'custom-icon'
    });

    const oilIcon = L.divIcon({
        html: '<i class="fas fa-oil-can" style="color: #333; font-size: 1.5rem;"></i>',
        className: 'custom-icon'
    });

    const metalIcon = L.divIcon({
        html: '<i class="fas fa-hammer" style="color: #999; font-size: 1.5rem;"></i>',
        className: 'custom-icon'
    });

    // Add markers to the map
    locations.forEach(location => {
        let icon;
        if (location.type === "gold") icon = goldIcon;
        else if (location.type === "oil") icon = oilIcon;
        else icon = metalIcon;

        L.marker(location.coords, { icon })
            .addTo(map)
            .bindPopup(`<b>${location.name}</b><br>HFC Mining ${location.type.toUpperCase()} Operation`);
    });

    // Fit bounds to show all markers
    if (locations.length > 0) {
        const bounds = L.latLngBounds(locations.map(loc => loc.coords));
        map.fitBounds(bounds, { padding: [50, 50] });
    }
}