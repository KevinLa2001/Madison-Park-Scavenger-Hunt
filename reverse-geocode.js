// reverse-geocode.js
// This script adds a button to the page that, when clicked, gets the user's current GPS location (to 4 decimals)
// and displays a friendly address or place name using the OpenStreetMap Nominatim API.




function addReverseGeocodeButton() {
    // Create button
    const btn = document.createElement('button');
    btn.id = 'reverse-geocode-btn';
    btn.textContent = 'Where am I?';
    btn.style.margin = '1em 0';
    // Create result display
    const resultDiv = document.createElement('div');
    resultDiv.id = 'reverse-geocode-result';
    resultDiv.style.margin = '0.5em 0 1em 0';
    // Insert at top of #locations if present, else body
    const container = document.getElementById('locations') || document.body;
    container.insertBefore(btn, container.firstChild);
    container.insertBefore(resultDiv, btn.nextSibling);

    btn.onclick = function() {
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

    // Handle position and fetch address
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
    }
}

// Auto-run if loaded after DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addReverseGeocodeButton);
} else {
    addReverseGeocodeButton();
}
