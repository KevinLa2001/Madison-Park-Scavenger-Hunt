// Scavenger Hunt Game Logic

const locations = [
    {
        name: "Duwamish",
        stampLocation: "Beaver sanctuary",
        specific: "On back of sign.",
        lat: 47.635,
        lng: -122.275,
        unlocked: true
    },
    {
        name: "Western Washington Fairgrounds",
        stampLocation: "Newton traffic circle",
        specific: "On post in the middle of circle",
        lat: 47.6355,
        lng: -122.2755,
        unlocked: false
    },
    {
        name: "Seattle Hustlers ball field",
        stampLocation: "Newton traffic circle",
        specific: "On post in the middle of circle",
        lat: 47.6355,
        lng: -122.2755,
        unlocked: false
    },
    {
        name: "Mosquito fleet",
        stampLocation: "The dock",
        specific: "tbd",
        lat: 47.634,
        lng: -122.274,
        unlocked: false
    },
    {
        name: "Cable Car",
        stampLocation: "Rainbow sign",
        specific: "On back of rainbow sign",
        lat: 47.636,
        lng: -122.276,
        unlocked: false
    },
    {
        name: "Bathhouse",
        stampLocation: "Bathhouse",
        specific: "tbd",
        lat: 47.633,
        lng: -122.273,
        unlocked: false
    },
    {
        name: "Pioneer hall",
        stampLocation: "Pioneer hall",
        specific: "tbd",
        lat: 47.632,
        lng: -122.272,
        unlocked: false
    },
    {
        name: "Madison Park Pavillion",
        stampLocation: "Kids play structure",
        specific: "Somewhere on the structure",
        lat: 47.631,
        lng: -122.271,
        unlocked: false
    },
    {
        name: "Hyde Place",
        stampLocation: "Hyde Place",
        specific: "tbd",
        lat: 47.630,
        lng: -122.270,
        unlocked: false
    },
    {
        name: "Laurel Shade",
        stampLocation: "1500 42nd",
        specific: "",
        lat: 47.629,
        lng: -122.269,
        unlocked: false
    }
];

// Load progress from localStorage
function loadProgress() {
    const completed = JSON.parse(localStorage.getItem('scavengerHuntProgress') || '[]');
    locations.forEach((loc, index) => {
        if (completed.includes(index)) {
            loc.unlocked = true;
        }
    });
    // Unlock next if previous is completed
    for (let i = 0; i < locations.length - 1; i++) {
        if (locations[i].unlocked) {
            locations[i + 1].unlocked = true;
        }
    }
}

// Save progress
function saveProgress() {
    const completed = locations.map((loc, index) => loc.unlocked ? index : null).filter(i => i !== null);
    localStorage.setItem('scavengerHuntProgress', JSON.stringify(completed));
}

// Haversine formula to calculate distance
function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lng2 - lng1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
}

// Render locations
function renderLocations() {
    const container = document.getElementById('locations');
    container.innerHTML = '';
    locations.forEach((loc, index) => {
        const div = document.createElement('div');
        div.className = 'location';
        div.innerHTML = `
            <h3>${loc.name}</h3>
            <p><strong>Stamp Location:</strong> ${loc.stampLocation}</p>
            <p><strong>Specific:</strong> ${loc.specific}</p>
            ${loc.unlocked ? '<button onclick="checkIn(' + index + ')">Check In</button>' : '<p>Locked - Complete previous location</p>'}
        `;
        container.appendChild(div);
    });
}

// Check in function
function checkIn(index) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const loc = locations[index];
            const distance = getDistance(userLat, userLng, loc.lat, loc.lng);
            if (distance < 50) { // within 50 meters
                alert('🎉 Success! You found the location. Great job!');
                loc.unlocked = true;
                if (index < locations.length - 1) {
                    locations[index + 1].unlocked = true;
                }
                saveProgress();
                renderLocations();
            } else {
                alert('Not quite there yet. Distance: ' + Math.round(distance) + ' meters. Try getting closer!');
            }
        }, () => {
            alert('Unable to get your location. Please enable location services.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Initialize
loadProgress();
renderLocations();