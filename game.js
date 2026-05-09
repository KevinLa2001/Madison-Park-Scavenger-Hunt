// Update the blur of the Queenie image in the header based on progress
function updateHeaderQueenieBlur() {
    const img = document.querySelector('.header-queenie-img');
    if (!img) return;
    const totalClues = locations.length;
    const completedClues = locations.filter(l => l.answered).length;
    let queenieBlur = 18;
    if (completedClues > 0) {
        queenieBlur = 18 - Math.floor((completedClues) * (18 / totalClues));
        if (queenieBlur < 0) queenieBlur = 0;
    }
    img.style.filter = `blur(${queenieBlur}px)`;
    img.style.webkitFilter = `blur(${queenieBlur}px)`;
}
// Scavenger Hunt Game Logic

const locations = [
    {
        name: "Mosquito fleet",
        stampLocation: "Middle of the dock",
        specific: "tbd",
        description: "From 1890 to 1910, Madison Park was a key stop for the Mosquito Fleet steamboats supplying Lake Washington. \nCan you figure out where they started from? \nHint: Look for a dock.",
        lat: 47.6366,
        lng: -122.2765,
        unlocked: true,
        answer: "From 1890 to 1910, Madison Park was a key stop for the Mosquito Fleet steamboats cruising Lake Washington. This fleet of small steamers provided essential transportation across the lake, connecting communities. The broader service lasted from the early 1880s until 1950, with the Madison Park to Kirkland route ceasing on August 31, 1950, marking the end of an era of water-based commuting.",
        image: "img/Mosquito Fleet Ferry.png"
    },
    {
        name: "Cable Car",
        stampLocation: "Next to the Madison Park Beach Rainbow sign",
        specific: "On back of rainbow sign",
        description: "Cable cars began serving Madison Park in 1890, and the end of the line was at the end of Madison Street, right near the beach. Can you find the rainbow sign and picture yourself waiting for the cable car?",
        lat: 47.6365,
        lng: -122.2773,
        unlocked: false,
        answer: "Cable cars began serving Madison Park in 1890, running from downtown Seattle to the lakefront. The full line operated until around 1910, when service was truncated to 21st Avenue, no longer reaching the park. This transportation innovation helped develop the area as a residential and recreational hub. \n \nFun fact: Did you know that Madison street is the only street that runs from Puget Sound to Lake Washington?",
        image: "https://i0.wp.com/pauldorpat.com/wp-content/uploads/2013/12/5-madison-park-trolley-at-madison-park-a-profile-with-part-of-castleweb1.jpg"
    },
    {
        name: "Bathhouse",
        stampLocation: "Next to the front door of the Bathhouse",
        specific: "tbd",
        description: "Around 1900-1910, a bathing pavilion and fountain were built at Madison Park. Locate the bathhouse front door to unlock this clue.",
        lat: 47.6362,
        lng: -122.2776,
        unlocked: false,
        answer: "Around 1900-1910, a bathing pavilion and fountain were built at Madison Park, catering to bathers enjoying the lake. As the area evolved from a resort to a neighborhood park in the early 1900s, the bathhouse continued to serve as a community facility for swimming and leisure activities.",
        image: "https://images.squarespace-cdn.com/content/v1/642dd723b92b071bb2077590/3553fc3b-be5e-489b-9176-f1945c3d9007/Screenshot+2025-05-13+at+11.41.40+PM.png"
    },
    {
        name: "Pioneer hall",
        stampLocation: "Next to the front door of the Pioneer hall",
        specific: "tbd",
        description: "The Pioneer building is an old brick building in Madison Park. Do you know where it is? \nHint: It's not the bathhouse. Go to the front door to unlock this clue.",
        lat: 47.6346,
        lng: -122.2775,
        unlocked: false,
        answer: "Built in 1910 by the Pioneer Association, Pioneer Hall has been a cornerstone of Madison Park's community life. From the 1910s to the present, it has hosted meetings, events, and now serves as the home for the Madison Park Community Council, fostering local engagement and history.",
        image: "https://wapioneers.com/upload/rotator/Home_Image_Landscape/rsz_pioneer_hall_se_view.jpg"

    },
    {
        name: "Madison Park Pavillion",
        stampLocation: "Next to the kids play structure",
        specific: "Somewhere on the structure",
        description: "Constructed in the 1890s as part of the amusement complex, the pavilion hosted dances, concerts, and theatrical shows.  Can you find a structure in the park that resembles the picture? You will need to stand near it.",
        lat: 47.6355,
        lng: -122.2778,
        unlocked: false,
        answer: "Constructed in the 1890s as part of the amusement complex, the pavilion hosted dances, concerts, and theatrical shows during its peak in the 1890s and 1910s. After the 1917 lake level drop, its use declined as the resort era faded.",
        image: "https://i0.wp.com/pauldorpat.com/wp-content/uploads/2013/12/6.-madison-park-pavilion-then-web-500x327.jpg?resize=474%2C310"
    }
];

// Load progress from localStorage
function loadProgress() {
    const completed = JSON.parse(localStorage.getItem('scavengerHuntProgress') || '[]');
    const answered = JSON.parse(localStorage.getItem('scavengerHuntAnswers') || '[]');
    locations.forEach((loc, index) => {
        loc.unlocked = false;
        loc.answered = answered.includes(index);
    });
    if (completed.length > 0) {
        completed.forEach(idx => {
            if (locations[idx]) locations[idx].unlocked = true;
        });
        // Unlock the next question after the highest completed
        const maxIdx = Math.max(...completed);
        if (locations[maxIdx + 1]) locations[maxIdx + 1].unlocked = true;
    } else {
        // If nothing completed, unlock the first
        locations[0].unlocked = true;
    }
}

// Save progress
function saveProgress() {
    const completed = locations.map((loc, index) => loc.unlocked ? index : null).filter(i => i !== null);
    const answered = locations.map((loc, index) => loc.answered ? index : null).filter(i => i !== null);
    localStorage.setItem('scavengerHuntProgress', JSON.stringify(completed));
    localStorage.setItem('scavengerHuntAnswers', JSON.stringify(answered));
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
    // Calculate blur based on answered questions
    const totalClues = locations.length;
    const completedClues = locations.filter(l => l.answered).length;
    // 18px blur at start, 0px at all answered, step down per clue
    let blurPx = 18;
    if (completedClues > 0) {
        blurPx = 18 - Math.floor((completedClues) * (18 / 5));
        if (blurPx < 0) blurPx = 0;
    }
    container.innerHTML = `<div class="game-intro" style="display:flex;align-items:center;gap:2em;">
        <div style="flex:1 1 0;min-width:0;">
            <label style="display:inline-flex;align-items:center;margin-top:0.5em;gap:0.5em;"></label>
            <!-- TEST MODE BUTTON: Only show if debug flag is set -->
            <button id="test-mode-btn" style="margin-left:1em;display:none;">Enable Test Mode</button>
            <label id="test-mode-label" style="display:none;margin-left:1em;font-weight:bold;">
                <input type="checkbox" id="test-mode-checkbox"> Test Mode: Instantly check in
            </label>
        </div>
    </div>`;
    // Update header Queenie blur on every render
    updateHeaderQueenieBlur();
    // Show test mode button only if debug flag is set
    setTimeout(() => {
        if (localStorage.getItem('debug') === '1') {
            const testBtn = document.getElementById('test-mode-btn');
            if (testBtn) testBtn.style.display = '';
        }
    }, 0);
    // Add event listener for reset button
    setTimeout(() => {
        // Footer Reset Button
        const resetBtn = document.getElementById('reset-progress-btn');
        if (resetBtn) {
            resetBtn.onclick = () => {
                if (confirm('Are you sure you want to reset your progress? You will need to start all over.')) {
                    localStorage.removeItem('scavengerHuntProgress');
                    localStorage.removeItem('scavengerHuntAnswers');
                    loadProgress();
                    renderLocations();
                }
            };
        }
        // Footer Hint Button
        const hintBtn = document.getElementById('footer-hint-icon');
        if (hintBtn) {
            hintBtn.onclick = () => {
                showHint(currentIndex);
            };
        }
        // TEST MODE BUTTON LOGIC: Remove or comment out for production
        const testBtn = document.getElementById('test-mode-btn');
        const testLabel = document.getElementById('test-mode-label');
        if (testBtn && testLabel) {
            testBtn.onclick = () => {
                testLabel.style.display = testLabel.style.display === 'none' ? '' : 'none';
            };
        }
    }, 0);
    // Only show the first unlocked location
    let currentIndex = 0;
    for (let i = 0; i < locations.length; i++) {
        if (locations[i].unlocked) {
            currentIndex = i;
            break;
        }
    }
    // Always use the current unlocked clue for coordinates
    const loc = locations[currentIndex];
    // Clear and re-render the container for the new clue
    while (container.children.length > 1) {
        container.removeChild(container.lastChild);
    }
    const div = document.createElement('div');
    div.className = 'location';
    // Queenie image is now only shown in the congratulations/next section, not here
    let queenieBlur = blurPx;
    let queenieImgHtml = '';
    let nextSectionHtml = '';
    // Prepare date string for prize message
    let dateStr = '';
    if (loc.name === "Madison Park Pavillion" && loc.answered) {
        const dateObj = new Date();
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const day = days[dateObj.getDay()];
        const month = months[dateObj.getMonth()];
        const date = dateObj.getDate();
        function ordinal(n) {
            if (n > 3 && n < 21) return n + 'th';
            switch (n % 10) {
                case 1: return n + "st";
                case 2: return n + "nd";
                case 3: return n + "rd";
                default: return n + "th";
            }
        }
        dateStr = `${day} ${month} ${ordinal(date)}`;
    }
    if (loc.answered) {
        if (loc.name === "Madison Park Pavillion") {
            nextSectionHtml = `
                <div class="next-section-message">You did it! Congratulations. You have discovered the <b>mysterious</b> animal. Click <b>NEXT</b> to learn more about Queenie and claim your prize.</div>
            `;
        } else {
            nextSectionHtml = `
                <div class="next-section-message">Great job! You have completed this clue.<br>Have you figured out which animal was roaming our streets? Ready for the next one?</div>
            `;
        }
    }
    div.innerHTML = `
        <div class="question-title" style="background: linear-gradient(90deg, #3498db 0%, #217dbb 100%); color: #fff;"><h3 style="margin:0;">${loc.name}</h3></div>
        <div class="question-content-box">
            <div class="question-row">
                <div class="question-image" style="flex-direction: column; align-items: flex-start; color: #fff;">
                    ${loc.image ? `<img src="${loc.image}" alt="${loc.name}" />` : ''}
                    <div class="coords-under-image" title="Clue coordinates: ${loc.lat.toFixed ? loc.lat.toFixed(4) : loc.lat}, ${loc.lng.toFixed ? loc.lng.toFixed(4) : loc.lng}" style="font-size:0.98em;margin-top:0.3em;cursor:help;">
                        ${loc.lat.toFixed ? loc.lat.toFixed(4) : loc.lat}, ${loc.lng.toFixed ? loc.lng.toFixed(4) : loc.lng}
                    </div>
                </div>
                <div class="question-main" style="display:flex;align-items:center;">
                    <p style="margin-right:1em;">${loc.description}</p>
                </div>
            </div>
            ${loc.answered ? `<div class="answer-row"><p class="answer-paragraph">${loc.answer}</p></div>` : ''}
        </div>
        <div class="button-hint-row uniform-btn-row">
            <button id="checkin-btn-${currentIndex}" class="checkin-btn${loc.answered ? ' disabled' : ''}" onclick="checkIn(${currentIndex})"${loc.answered ? ' disabled' : ''}>Check In</button>
            <button id="next-btn-${currentIndex}" class="next-btn" onclick="window.nextClue(${currentIndex})"${loc.answered ? '' : ' disabled style="opacity:0.6;cursor:not-allowed;"'}>Next</button>
        </div>
        <div id="coords-section-${currentIndex}" class="coords-section" style="display:none;">
            <div class="clue-coords-inline">
                <span id="your-coords" class="your-coords-inline"></span>
            </div>
        </div>
        <div id="checkin-result-${currentIndex}" class="checkin-result"></div>
        <div id="answer-section-${currentIndex}" class="answer-section"></div>
        <div id="next-section-${currentIndex}">${nextSectionHtml}</div>
        <p id="hint-${currentIndex}" style="display:none;"><strong>Location:</strong> ${loc.stampLocation}</p>
    `;
    // Ensure Check In button is enabled if not answered (handles page refresh)
    setTimeout(() => {
        const checkinBtn = document.getElementById(`checkin-btn-${currentIndex}`);
        if (checkinBtn) {
            if (!loc.answered) {
                checkinBtn.disabled = false;
                checkinBtn.classList.remove('disabled');
            } else {
                checkinBtn.disabled = true;
                checkinBtn.classList.add('disabled');
            }
        }
    }, 0);
    container.appendChild(div);
}

// Show or update the visual distance indicator
function updateDistanceIndicator(distance, maxDistance = 500) {
    const container = document.getElementById('distance-indicator-container');
    const canvas = document.getElementById('crosshairs-canvas');
    const label = document.getElementById('distance-indicator-label');
    const gpsCoords = document.getElementById('gps-coords');
    if (!container || !canvas || !label || !gpsCoords) return;
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    canvas.style.display = 'inline-block';
    label.style.display = 'inline-block';
    label.style.marginLeft = '1.5em';
    label.style.marginTop = '0';
    // Clamp maxDistance to a minimum of 50m for usability
    maxDistance = Math.max(maxDistance, 50);

    // Draw cross-hairs and blip
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw cross-hairs
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();
    // Draw center target
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 8, 0, 2*Math.PI);
    ctx.strokeStyle = '#217dbb';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#3498db';
    ctx.globalAlpha = 0.15;
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 16, 0, 2*Math.PI);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Calculate blip position (user relative to target)
    // Use global vars for userLat/userLng and targetLat/targetLng if available
    let userLat = window._userLat, userLng = window._userLng, targetLat = window._targetLat, targetLng = window._targetLng;
    if (typeof userLat === 'number' && typeof userLng === 'number' && typeof targetLat === 'number' && typeof targetLng === 'number') {
        // Calculate N/S and E/W offset in meters
        const dLat = (userLat - targetLat) * 111320; // meters per degree latitude
        const dLng = (userLng - targetLng) * (40075000 * Math.cos(targetLat * Math.PI/180) / 360); // meters per degree longitude
        // Clamp to maxDistance for display
        const maxRadius = 80; // px
        let dx = dLng, dy = -dLat; // y axis: north is up
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > maxDistance) {
            dx *= maxDistance/dist;
            dy *= maxDistance/dist;
        }
        // Scale to canvas
        const scale = maxRadius / maxDistance;
        const px = canvas.width/2 + dx * scale;
        const py = canvas.height/2 + dy * scale;
        // Draw blip
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, 2*Math.PI);
        ctx.fillStyle = '#e74c3c';
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#c0392b';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Draw a line from center to blip
        ctx.beginPath();
        ctx.moveTo(canvas.width/2, canvas.height/2);
        ctx.lineTo(px, py);
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4,3]);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    // Label
    if (distance < 1) {
        label.textContent = 'You are here!';
    } else {
        label.textContent = `You are ${Math.round(distance)} meters away`;
    }
    // Show GPS coords if available
    if (typeof userLat === 'number' && typeof userLng === 'number') {
        gpsCoords.textContent = `Your coordinates: ${userLat.toFixed(5)}, ${userLng.toFixed(5)}`;
    } else {
        gpsCoords.textContent = '';
    }
}

function hideDistanceIndicator() {
    const container = document.getElementById('distance-indicator-container');
    if (container) container.style.display = 'none';
}

// Check in function
function checkIn(index) {
    const testMode = document.getElementById('test-mode-checkbox')?.checked;
    if (testMode) {
        // Simulate matching coordinates
        const loc = locations[index];
        const userLat4 = loc.lat.toFixed ? Number(loc.lat.toFixed(4)) : Number(loc.lat);
        const userLng4 = loc.lng.toFixed ? Number(loc.lng.toFixed(4)) : Number(loc.lng);
        const yourCoordsSpan = document.getElementById('your-coords');
        if (yourCoordsSpan) {
            yourCoordsSpan.innerHTML = `<strong>Your coordinates:</strong> ${userLat4}, ${userLng4}`;
        }
        let msg = '<span style="color:green;">🎉 Success! You found the location.</span>';
        const resultDiv = document.getElementById(`checkin-result-${index}`);
        if (resultDiv) resultDiv.innerHTML = msg;
        // Mark as answered
        locations[index].answered = true;
        saveProgress();
        // Disable Check In button until Next is clicked
        const checkinBtn = document.getElementById(`checkin-btn-${index}`);
        if (checkinBtn) {
            checkinBtn.disabled = true;
            checkinBtn.classList.add('disabled');
        }
        renderLocations();
        updateHeaderQueenieBlur();




        
        // Calculate Queenie blur based on answered clues
        const totalClues = locations.length;
        const completedClues = locations.filter(l => l.answered).length;
        let queenieBlur = 18;
        if (completedClues > 0) {
            queenieBlur = 18 - Math.floor((completedClues) * (18 / totalClues));
            if (queenieBlur < 0) queenieBlur = 0;
        }
        let nextText = `
            <div class="next-section-message">Great job! You have completed this clue.<br>Have you figured out which animal was roaming our streets? Ready for the next one?</div>

 
        `;
        const nextDiv = document.getElementById(`next-section-${index}`);
        if (nextDiv) nextDiv.innerHTML = nextText;
        hideDistanceIndicator();
        return;
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const loc = locations[index];
            // Store for cross-hairs
            window._userLat = userLat;
            window._userLng = userLng;
            window._targetLat = loc.lat;
            window._targetLng = loc.lng;
            // Round both user and clue coordinates to 4 decimals for comparison
            const userLat4 = Number(userLat.toFixed(4));
            const userLng4 = Number(userLng.toFixed(4));
            const clueLat4 = loc.lat.toFixed ? Number(loc.lat.toFixed(4)) : Number(loc.lat);
            const clueLng4 = loc.lng.toFixed ? Number(loc.lng.toFixed(4)) : Number(loc.lng);
            const distance = getDistance(userLat, userLng, loc.lat, loc.lng);
            // Show your coordinates below the button
            const yourCoordsSpan = document.getElementById('your-coords');
            if (yourCoordsSpan) {
                yourCoordsSpan.innerHTML = `<strong>Your coordinates:</strong> ${userLat4}, ${userLng4}`;
            }
            updateDistanceIndicator(distance, 183); // 200 yards ≈ 183 meters
            let msg = '';
            let success = false;
            // Success if within 20 meters of the target location
            if (distance <= 20) {
                msg += '<span style="color:green;">🎉 Success! You found the location.</span>';
                success = true;
            } else {
                // Calculate direction
                const dLat = loc.lat - userLat;
                const dLng = loc.lng - userLng;
                // Convert to degrees
                const angle = Math.atan2(dLng, dLat) * 180 / Math.PI;
                // Map angle to compass direction
                const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
                let idx = Math.round(((angle + 360) % 360) / 45) % 8;
                let direction = directions[idx];
                // Icon and hint for each direction
                const directionIcons = {
                    'N': '<span class="uw-purple-w">W</span>', // UW (Purple bold W)
                    'NE': '🧭',
                    'E': '🌊', // Water
                    'SE': '🧭',
                    'S': '🏔️', // Mount Rainier
                    'SW': '🧭',
                    'W': '🦀', // Puget Sound (Crab)
                    'NW': '🧭'
                };
                const directionHints = {
                    'N': '🎓 Move N towards UW...',
                    'NE': 'Move kind of NE, towards UW and the water.',
                    'E': '🌊 Move E towards the water...',
                    'SE': 'Move kind of SE, towards the water and Mount Rainier.',
                    'S': '🏔️ Move S towards Mount Rainier...',
                    'SW': 'Move kind of SW, towards Mount Rainier and Seattle/Puget Sound.',
                    'W': '🌆 Move W towards Seattle and Puget Sound...',
                    'NW': 'Move kind of NW, towards Puget Sound and UW.'
                };
                let icon = directionIcons[direction] || '';
                let extraHint = directionHints[direction] ? directionHints[direction] : '';
                
                if (["NE","SE","SW","NW"].includes(direction)) {
                    msg += `<span style="color:red;">Not quite there yet. Try getting closer!<br>Distance: ${Math.round(distance)} meters. <b>${icon}</b> ${extraHint}</span>`;
                } else {
                     msg+= `<span style="color:red;">Not quite there yet. Try getting closer!<br>Distance: ${Math.round(distance)} meters. ${extraHint}</span>`;
                }
            }
            // Show result to the right of the grid
            const resultDiv = document.getElementById(`checkin-result-${index}`);
            if (resultDiv) {
                resultDiv.innerHTML = msg;
                resultDiv.style.display = 'inline-block';
                resultDiv.style.verticalAlign = 'middle';
                resultDiv.style.marginLeft = '1.5em';
                resultDiv.style.marginTop = '0';
                resultDiv.style.position = 'relative';
            }
            // On success, insert answer as its own row inside .question-content-box, after .question-row
            if (success) {
                locations[index].answered = true;
                saveProgress();
                // Disable Check In button until Next is clicked
                const checkinBtn = document.getElementById(`checkin-btn-${index}`);
                if (checkinBtn) {
                    checkinBtn.disabled = true;
                    checkinBtn.classList.add('disabled');
                }
                renderLocations();
                // Calculate Queenie blur based on answered clues
                const totalClues = locations.length;
                const completedClues = locations.filter(l => l.answered).length;
                let queenieBlur = 18;
                if (completedClues > 0) {
                    queenieBlur = 18 - Math.floor((completedClues) * (18 / totalClues));
                    if (queenieBlur < 0) queenieBlur = 0;
                }
                let nextText = `
                    <div class="next-section-message">Great job! You have completed this clue.<br>Have you figured out which animal was roaming our streets? Ready for the next one?</div>
                    <div class="queenie-far-right" style="margin-top:1em;">
                        <img src="img/Queenie.png" alt="Secret animal" class="blurred-image" style="width:140px;height:120px;filter: blur(${queenieBlur}px);" />
                        <span style="margin-top:0.4em;font-size:1.1em;font-weight:bold;color:#217dbb;text-align:center;display:block;">Who am I?</span>
                    </div>
                    <button class="next-btn" onclick="window.nextClue(${index})">Next</button>
                `;
                const nextDiv = document.getElementById(`next-section-${index}`);
                if (nextDiv) nextDiv.innerHTML = nextText;
                hideDistanceIndicator();
            }
        }, () => {
            const resultDiv = document.getElementById(`checkin-result-${index}`);
            if (resultDiv) resultDiv.innerHTML = '<span style="color:red;">Unable to get your location. Please enable location services.</span>';
            hideDistanceIndicator();
        });
    } else {
        const resultDiv = document.getElementById(`checkin-result-${index}`);
        if (resultDiv) resultDiv.innerHTML = '<span style="color:red;">Geolocation is not supported by this browser.</span>';
        hideDistanceIndicator();
    }
}

// Next button handler to unlock and show the next clue
function nextClue(index) {
    // If this is the last clue, go to Queenie page
    if (index === locations.length - 1) {
        window.location.href = 'queenie.html';
        return;
    }
    // Mark all as locked, then unlock only the next clue
    locations.forEach((loc) => {
        loc.unlocked = false;
    });
    // Special logic for Pavilion, Laurel Shade, Hyde Place
    let unlockIdx = index + 1;
    if (index === 4) {
        if (confirm("Great job. You have done all the close ones. Do you want to do the advanced areas that require you to walk a mile?")) {
            unlockIdx = 9;
        } else {
            unlockIdx = null;
        }
    } else if (index === 9) {
        unlockIdx = 8;
    } else if (index === 8) {
        unlockIdx = 5;
    }
    // Unlock only the next clue
    if (unlockIdx !== null && unlockIdx < locations.length) {
        locations[unlockIdx].unlocked = true;
    }
    saveProgress();
    // Re-enable Check In button for the new current question
    setTimeout(() => {
        updateHeaderQueenieBlur();
        let currentIndex = 0;
        for (let i = 0; i < locations.length; i++) {
            if (locations[i].unlocked) {
                currentIndex = i;
                break;
            }
        }
        const checkinBtn = document.getElementById(`checkin-btn-${currentIndex}`);
        if (checkinBtn) {
            checkinBtn.disabled = false;
            checkinBtn.classList.remove('disabled');
        }
    }, 0);
    renderLocations();
}
window.nextClue = nextClue;
// ...existing code...

// Initialize
loadProgress();
renderLocations();