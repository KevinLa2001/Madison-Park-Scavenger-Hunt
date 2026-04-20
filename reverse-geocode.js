// reverse-geocode.js
// This script adds a button to the page that, when clicked, gets the user's current GPS location (to 4 decimals)
// and displays a friendly address or place name using the OpenStreetMap Nominatim API.





function addReverseGeocodeButton() {
    // List of location names from game.js (keep in sync if locations change)
    const locationNames = [
        "Mosquito fleet",
        "Cable Car",
        "Bathhouse",
        "Pioneer hall",
        "Madison Park Pavillion",
        "Duwamish",
        "Western Washington Fairgrounds",
        "Seattle Hustlers ball field",
        "Hyde Place",
        "Laurel Shade"
    ];

    // Create button
    const btn = document.createElement('button');
    btn.id = 'reverse-geocode-btn';
    btn.textContent = 'Where am I?';
    btn.style.margin = '1em 0';
    // Create result display
    const resultDiv = document.createElement('div');
    resultDiv.id = 'reverse-geocode-result';
    resultDiv.style.margin = '0.5em 0 1em 0';
    // Create dropdown for friendly name (initially hidden, shown after location is determined)
    const dropdownDiv = document.createElement('div');
    dropdownDiv.style.margin = '1em 0';
    dropdownDiv.style.display = 'none';
    const label = document.createElement('label');
    label.textContent = 'Choose a friendly name: ';
    label.htmlFor = 'friendly-name-select';
    const select = document.createElement('select');
    select.id = 'friendly-name-select';
    locationNames.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        select.appendChild(opt);
    });
    const otherOpt = document.createElement('option');
    otherOpt.value = '__other__';
    otherOpt.textContent = 'Other';
    select.appendChild(otherOpt);
    label.appendChild(select);
    dropdownDiv.appendChild(label);
    // Manual entry for 'Other'
    const otherInput = document.createElement('input');
    otherInput.type = 'text';
    otherInput.placeholder = 'Enter a custom name';
    otherInput.style.display = 'none';
    otherInput.style.marginLeft = '1em';
    dropdownDiv.appendChild(otherInput);
    // Confirm button
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Confirm';
    confirmBtn.style.marginLeft = '1em';
    dropdownDiv.appendChild(confirmBtn);

    // Insert elements
    const container = document.getElementById('locations') || document.body;
    container.insertBefore(btn, container.firstChild);
    container.insertBefore(resultDiv, btn.nextSibling);
    container.insertBefore(dropdownDiv, resultDiv.nextSibling);

    // Show/hide manual entry if 'Other' is selected
    select.onchange = function() {
        if (select.value === '__other__') {
            otherInput.style.display = '';
        } else {
            otherInput.style.display = 'none';
        }
    };

    btn.onclick = function() {
        // Start geolocation lookup
        resultDiv.innerHTML = '';
        if (!navigator.geolocation) {
            setResult('<span style="color:red;">Geolocation is not supported by your browser.</span>');
            return;
        }
        setResult('Getting your location...');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                handlePosition(position);
            },
            () => {
                setResult('<span style="color:red;">Unable to get your location. Please enable location services.</span>');
            }
        );
    };

    confirmBtn.onclick = function() {
        let friendlyName = select.value;
        if (friendlyName === '__other__') {
            friendlyName = otherInput.value.trim();
            if (!friendlyName) {
                alert('Please enter a custom name.');
                return;
            }
        }
        dropdownDiv.style.display = 'none';
        // Update the last result entry to include the friendly name
        const entries = resultDiv.getElementsByClassName('whereami-entry');
        if (entries.length > 0) {
            const lastEntry = entries[entries.length - 1];
            lastEntry.innerHTML = `<strong>Friendly name:</strong> ${friendlyName}<br>` + lastEntry.innerHTML;
        }
    };


    // Helper to set only the latest result (preserve only the latest lines)
    function setResult(html) {
        // If there is already a result, add a blank line before the new one
        if (resultDiv.innerHTML.trim() !== '') {
            const br = document.createElement('br');
            resultDiv.appendChild(br);
        }
        // Add the new result
        const entry = document.createElement('div');
        entry.className = 'whereami-entry';
        entry.innerHTML = html;
        resultDiv.appendChild(entry);
    }

    // Handle position and fetch address, then prompt for friendly name
    async function handlePosition(position) {
        const lat = Number(position.coords.latitude.toFixed(4));
        const lng = Number(position.coords.longitude.toFixed(4));
        setResult(`<strong>Your coordinates:</strong> ${lat}, ${lng}<br>Looking up address...`);
        try {
            // Use OpenStreetMap Nominatim API for reverse geocoding
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
            const response = await fetch(url, {
                headers: { 'Accept': 'application/json' },
            });
            if (!response.ok) throw new Error('Reverse geocoding failed');
            const data = await response.json();
            let displayName = data.display_name || 'Unknown location';
            // Optionally, show a more concise address if available
            if (data.address) {
                const { road, pedestrian, house_number, city, town, village, suburb, state, country } = data.address;
                let parts = [];
                if (house_number && road) parts.push(`${house_number} ${road}`);
                else if (road) parts.push(road);
                else if (pedestrian) parts.push(pedestrian);
                if (suburb) parts.push(suburb);
                if (city) parts.push(city);
                else if (town) parts.push(town);
                else if (village) parts.push(village);
                if (state) parts.push(state);
                if (country) parts.push(country);
                if (parts.length > 0) displayName = parts.join(', ');
            }
            setResult(`<strong>Your coordinates:</strong> ${lat}, ${lng}<br><strong>Address:</strong> ${displayName}`);
        } catch (e) {
            setResult(`<strong>Your coordinates:</strong> ${lat}, ${lng}<br><span style=\"color:red;\">Could not determine address.</span>`);
        }
        // Show the friendly name dropdown after location/address is shown
        dropdownDiv.style.display = '';
        select.value = locationNames[0];
        otherInput.style.display = 'none';
        otherInput.value = '';
    }
}

// Auto-run if loaded after DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addReverseGeocodeButton);
} else {
    addReverseGeocodeButton();
}
