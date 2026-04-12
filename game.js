// Scavenger Hunt Game Logic

const locations = [
    {
        name: "Mosquito fleet",
        stampLocation: "Middle of the dock",
        specific: "tbd",
        description: "From 1890 to 1910, Madison Park was a key stop for the Mosquito Fleet steamboats plying Lake Washington. Can you figure out where they started from? Hint: Look for a dock.",
        lat: 47.637,
        lng: -122.279,
        unlocked: true,
        answer: "From 1890 to 1910, Madison Park was a key stop for the Mosquito Fleet steamboats plying Lake Washington. This fleet of small steamers provided essential transportation across the lake, connecting communities. The broader service lasted from the early 1880s until 1950, with the Madison Park to Kirkland route ceasing on August 31, 1950, marking the end of an era of water-based commuting.",
        image: ".img/mosquito_fleet.jpg"
    },
    {
        name: "Cable Car",
        stampLocation: "Next to the Madison Park Beach Rainbow sign",
        specific: "On back of rainbow sign",
        description: "Cable cars began serving Madison Park in 1890, running from downtown Seattle to the lakefront. The full line operated until around 1910, when service was truncated to 21st Avenue, no longer reaching the park. This transportation innovation helped develop the area as a residential and recreational hub.",
        lat: 47.636,
        lng: -122.276,
        unlocked: false,
        answer: "Cable cars began serving Madison Park in 1890, running from downtown Seattle to the lakefront. The full line operated until around 1910, when service was truncated to 21st Avenue, no longer reaching the park. This transportation innovation helped develop the area as a residential and recreational hub.",
        image: ""
    },
    {
        name: "Bathhouse",
        stampLocation: "Next to the front door of the Bathhouse",
        specific: "tbd",
        description: "Around 1900-1910, a bathing pavilion and fountain were built at Madison Park, catering to bathers enjoying the lake. As the area evolved from a resort to a neighborhood park in the early 1900s, the bathhouse continued to serve as a community facility for swimming and leisure activities.",
        lat: 47.633,
        lng: -122.273,
        unlocked: false,
        answer: "Around 1900-1910, a bathing pavilion and fountain were built at Madison Park, catering to bathers enjoying the lake. As the area evolved from a resort to a neighborhood park in the early 1900s, the bathhouse continued to serve as a community facility for swimming and leisure activities.",
        image: ""
    },
    {
        name: "Pioneer hall",
        stampLocation: "Next to the front door of the Pioneer hall",
        specific: "tbd",
        description: "Built in 1910 by the Pioneer Association, Pioneer Hall has been a cornerstone of Madison Park's community life. From the 1910s to the present, it has hosted meetings, events, and now serves as the home for the Madison Park Community Council, fostering local engagement and history.",
        lat: 47.632,
        lng: -122.272,
        unlocked: false,
        answer: "Built in 1910 by the Pioneer Association, Pioneer Hall has been a cornerstone of Madison Park's community life. From the 1910s to the present, it has hosted meetings, events, and now serves as the home for the Madison Park Community Council, fostering local engagement and history.",
        image: ""
    },
    {
        name: "Madison Park Pavillion",
        stampLocation: "Next to the kids play structure",
        specific: "Somewhere on the structure",
        description: "Constructed in the 1890s as part of the amusement complex, the pavilion hosted dances, concerts, and theatrical shows during its peak in the 1890s and 1910s. After the 1917 lake level drop, its use declined as the resort era faded.",
        lat: 47.631,
        lng: -122.271,
        unlocked: false,
        answer: "Constructed in the 1890s as part of the amusement complex, the pavilion hosted dances, concerts, and theatrical shows during its peak in the 1890s and 1910s. After the 1917 lake level drop, its use declined as the resort era faded.",
        image: ""
    },
    {
        name: "Duwamish",
        stampLocation: "Next to Beaver sanctuary sign",
        specific: "On back of sign.",
        description: "The Duwamish people have inhabited the Seattle area for thousands of years, with Madison Park being a significant site known as \"Where One Chops,\" likely referring to the clearing of land for canoes or other uses. When settlers arrived in the 1850s, the Duwamish were still actively using the area for fishing, hunting, and gathering. However, the 1860s saw Judge John McGilvra acquire the land, leading to the displacement of Indigenous peoples as Seattle expanded.",
        lat: 47.635,
        lng: -122.275,
        unlocked: false,
        answer: "The Duwamish people have inhabited the Seattle area for thousands of years, with Madison Park being a significant site known as \"Where One Chops,\" likely referring to the clearing of land for canoes or other uses. When settlers arrived in the 1850s, the Duwamish were still actively using the area for fishing, hunting, and gathering. However, the 1860s saw Judge John McGilvra acquire the land, leading to the displacement of Indigenous peoples as Seattle expanded.",
        image: ""
    },
    {
        name: "Western Washington Fairgrounds",
        stampLocation: "Next to 41st and Newton traffic circle",
        specific: "On post in the middle of circle",
        description: "In the 1880s, Judge McGilvra started leasing parts of his estate for summer cottages, transforming Madison Park into a popular resort destination. By the 1890s and into the 1910s, it became a bustling amusement park with bandstands for concerts, promenades for strolling, vaudeville performances, beer gardens, and various waterfront activities. The era came to an abrupt end in 1917 when the Lake Washington Ship Canal lowered the lake level by 9 feet, altering the shoreline and making the resort less viable.",
        lat: 47.6355,
        lng: -122.2755,
        unlocked: false
    },
    {
        name: "Seattle Hustlers ball field",
        stampLocation: "Next to McGilvra and Newton traffic circle",
        specific: "On post in the middle of circle",
        description: "Back in 1890, Madison Park hosted Seattle's first ballpark, where the Seattle Hustlers, the Pacific Northwest's first professional baseball team, practiced on a rudimentary diamond. Throughout the 1890s, this field served as a key venue for early organized baseball games before more formal stadiums were constructed in the city.",
        lat: 47.6355,
        lng: -122.2755,
        unlocked: false
    },
    {
        name: "Hyde Place",
        stampLocation: "The center of Hyde Place Park",
        specific: "tbd",
        description: "This historic home was built in the late 1800s amid the early residential development spurred by McGilvra's land platting. By the early 1900s, it became integrated into the expanding cottage community of Madison Park.",
        lat: 47.630,
        lng: -122.270,
        unlocked: false
    },
    {
        name: "Laurel Shade",
        stampLocation: "Next to the hydrangas on South side of East Garfield, west of 43rd.",
        specific: "",
        description: "In the 1860s, Judge John J. McGilvra built Laurel Shade at 1500 42nd Ave E, making his family the sole residents of Madison Park until the 1880s. As development began in the 1880s, the area around the estate started to grow into the neighborhood we know today.",
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

// Show hint function
function showHint(index) {
    document.getElementById(`hint-${index}`).style.display = 'block';
}

// Render locations
function renderLocations() {
    const container = document.getElementById('locations');
    container.innerHTML = `<div class="game-intro">
        <h2>Welcome to the Madison Park Scavenger Hunt!</h2>
        <p>Explore Madison Park's history by visiting real locations. At each stop, check in with your phone's GPS to unlock the next clue. Use the hint if you need help finding the spot. Good luck and have fun!</p>
    </div>`;
        // Only show the first unlocked location
        let currentIndex = 0;
        // Find the lowest unlocked index (first question not yet completed)
        for (let i = 0; i < locations.length; i++) {
            if (locations[i].unlocked) {
                currentIndex = i;
                break;
            }
        }
        const loc = locations[currentIndex];
        const div = document.createElement('div');
        div.className = 'location';
        div.innerHTML = `
            <div class="question-row">
                <div class="question-main">
                    <h3>${loc.name}</h3>
                    <p>${loc.description}</p>
                    <p class="clue-coords">
                        <strong>Clue coordinates:</strong> ${loc.lat.toFixed ? loc.lat.toFixed(3) : loc.lat}, ${loc.lng.toFixed ? loc.lng.toFixed(3) : loc.lng}
                        &nbsp;|&nbsp;
                        <span id="your-coords"></span>
                    </p>
                </div>
                <div class="question-image">
                    ${loc.image ? `<img src="${loc.image}" alt="${loc.name}" />` : ''}
                </div>
            </div>
            <div class="button-hint-row">
                <button id="checkin-btn-${currentIndex}" onclick="checkIn(${currentIndex})">Check In</button>
                <span class="hint-tooltip">
                    <span class="hint-icon" tabindex="0" onclick="showHint(${currentIndex})" title="I need a hint">&#x2753;</span>
                </span>
            </div>
            <div id="checkin-result-${currentIndex}" class="checkin-result"></div>
            <div id="answer-section-${currentIndex}" class="answer-section"></div>
            <div id="next-section-${currentIndex}"></div>
            <p id="hint-${currentIndex}" style="display:none;"><strong>Location:</strong> ${loc.stampLocation}</p>
        `;
        container.appendChild(div);
}

// Check in function
function checkIn(index) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const loc = locations[index];
            // Round both user and clue coordinates to 3 decimals for comparison
            const userLat3 = Number(userLat.toFixed(3));
            const userLng3 = Number(userLng.toFixed(3));
            const clueLat3 = loc.lat.toFixed ? Number(loc.lat.toFixed(3)) : Number(loc.lat);
            const clueLng3 = loc.lng.toFixed ? Number(loc.lng.toFixed(3)) : Number(loc.lng);
            const distance = getDistance(userLat, userLng, loc.lat, loc.lng);
            // Show your coordinates on the same line as clue coordinates
            const yourCoordsSpan = document.getElementById('your-coords');
            if (yourCoordsSpan) {
                yourCoordsSpan.innerHTML = `<strong>Your coordinates:</strong> ${userLat3}, ${userLng3}`;
            }
            let msg = '';
            let success = false;
            if (userLat3 === clueLat3 && userLng3 === clueLng3) {
                msg += '<span style="color:green;">🎉 Success! You found the location.</span>';
                success = true;
            } else {
                msg += `<span style="color:red;">Not quite there yet. Distance: ${Math.round(distance)} meters. Try getting closer!</span>`;
            }
            // Show result below the button
            const resultDiv = document.getElementById(`checkin-result-${index}`);
            if (resultDiv) resultDiv.innerHTML = msg;
            // On success, show answer and next-section with new text and Next button
            if (success) {
                const answerDiv = document.getElementById(`answer-section-${index}`);
                if (answerDiv) answerDiv.innerHTML = `<div class='answer-text'><strong>Answer:</strong> ${loc.answer}</div>`;
                let nextText = '<div class="next-section-message">Great job! You have completed this clue. Ready for the next one?</div>';
                nextText += `<button class=\"next-btn\" onclick=\"window.nextClue(${index})\">Next</button>`;
                const nextDiv = document.getElementById(`next-section-${index}`);
                if (nextDiv) nextDiv.innerHTML = nextText;
            }
// Next button handler to unlock and show the next clue
function nextClue(index) {
    if (index === 4) { // Pavilion
        if (confirm("Great job. You have done all the close ones. Do you want to do the advanced areas that require you to walk a mile?")) {
            locations[9].unlocked = true; // Laurel Shade
        }
    } else if (index === 9) { // Laurel Shade
        locations[8].unlocked = true; // Hyde Place
    } else if (index === 8) { // Hyde Place
        locations[5].unlocked = true; // Duwamish
    } else if (index < locations.length - 1) {
        locations[index + 1].unlocked = true;
    }
    saveProgress();
    renderLocations();
}
window.nextClue = nextClue;
        }, () => {
            const resultDiv = document.getElementById(`checkin-result-${index}`);
            if (resultDiv) resultDiv.innerHTML = '<span style="color:red;">Unable to get your location. Please enable location services.</span>';
        });
    } else {
        const resultDiv = document.getElementById(`checkin-result-${index}`);
        if (resultDiv) resultDiv.innerHTML = '<span style="color:red;">Geolocation is not supported by this browser.</span>';
    }
}

// Initialize
loadProgress();
renderLocations();