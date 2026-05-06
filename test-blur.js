// Test version: Instantly mark clues as correct to preview blur effect

// Copy of locations array from game.js
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
        lat: 47.6362,
        lng: -122.2778,
        unlocked: false,
        answer: "Constructed in the 1890s as part of the amusement complex, the pavilion hosted dances, concerts, and theatrical shows during its peak in the 1890s and 1910s. After the 1917 lake level drop, its use declined as the resort era faded.",
        image: "https://i0.wp.com/pauldorpat.com/wp-content/uploads/2013/12/6.-madison-park-pavilion-then-web-500x327.jpg?resize=474%2C310"
    },
    {
        name: "Duwamish",
        stampLocation: "Next to Beaver sanctuary sign",
        specific: "On back of sign.",
        description: "The Duwamish people have inhabited the Seattle area for thousands of years. What better way to honor their traditions than take you to the Beaver Sanctuary.",
        lat: 47.635,
        lng: -122.275,
        unlocked: false,
        answer: "The Duwamish people have inhabited the Seattle area for thousands of years, with Madison Park being a significant site known as \"Where One Chops,\" likely referring to the clearing of land for canoes or other uses. When settlers arrived in the 1850s, the Duwamish were still actively using the area for fishing, hunting, and gathering. However, the 1860s saw Judge John McGilvra acquire the land, leading to the displacement of Indigenous peoples as Seattle expanded.",
        image: "img/Mosquito Fleet Ferry.png"
    },
    {
        name: "Western Washington Fairgrounds",
        stampLocation: "Next to 41st and Newton traffic circle",
        specific: "On post in the middle of circle",
        answer: "In the 1880s, Judge McGilvra started leasing parts of his estate for summer cottages, transforming Madison Park into a popular resort destination. By the 1890s and into the 1910s, it became a bustling amusement park with bandstands for concerts, promenades for strolling, vaudeville performances, beer gardens, and various waterfront activities. The era came to an abrupt end in 1917 when the Lake Washington Ship Canal lowered the lake level by 9 feet, altering the shoreline and making the resort less viable.",
        lat: 47.6355,
        lng: -122.2755,
        image: "https://pauldorpat.com/2013/12/29/seattle-now-then-fairgrounds-at-madison-park/",
        unlocked: false,
        description: "Madison Park was the original Western Washing Fairgrounds. Many homes are now where the field once was. To find this clue, you need to be near the traffic circle at 41st and Newton. "
    },
    {
        name: "Seattle Hustlers ball field",
        stampLocation: "Next to McGilvra and Newton traffic circle",
        specific: "On post in the middle of circle",
        answer: "Back in 1890, Madison Park hosted Seattle's first ballpark, where the <b>Seattle Hustlers</b>, the Pacific Northwest's first professional baseball team, practiced on a rudimentary diamond. Throughout the 1890s, this field served as a key venue for early organized baseball games before more formal stadiums were constructed in the city.",
        lat: 47.6355,
        lng: -122.2755,
        image: "img/Mosquito Fleet Ferry.png",
        unlocked: false,
        description: "Madison Park had the first professional baseball team. To find this clue, find the traffic circle at McGilvra and Newton. "
    },
    {
        name: "Hyde Place",
        stampLocation: "The center of Hyde Place Park",
        specific: "tbd",
        answer: "This historic home was built in the late 1800s amid the early residential development spurred by McGilvra's land platting. By the early 1900s, it became integrated into the expanding cottage community of Madison Park.",
        lat: 47.630,
        lng: -122.270,
        image: "img/Mosquito Fleet Ferry.png",
        unlocked: false,
        description: "Hyde Place is a historic home built in the late 1800s. To find this clue, go to the center of Hyde Place Park."
    },
    {
        name: "Laurel Shade",
        stampLocation: "Next to the hydrangas on South side of East Garfield, west of 43rd.",
        specific: "",
        answer: "In the 1860s, Judge John J. McGilvra built Laurel Shade at 1500 42nd Ave E, making his family the sole residents of Madison Park until the 1880s. As development began in the 1880s, the area around the estate started to grow into the neighborhood we know today.",
        lat: 47.629,
        lng: -122.269,
        unlocked: false,
        description: "Laurel Shade was built in the 1860s by Judge John J. McGilvra. To find this clue, go to the hydrangeas on South side of East Garfield, west of 43rd.",
        image: "img/Mosquito Fleet Ferry.png"
    }
];

// Simulate progress for testing: mark N clues as answered
const TEST_ANSWERED_COUNT = 0; // Change this number (0-9) to preview blur effect
locations.forEach((loc, idx) => {
    loc.answered = idx < TEST_ANSWERED_COUNT;
    loc.unlocked = idx <= TEST_ANSWERED_COUNT;
});

// Render function: show blur effect for each simulated completion
function renderTestBlur() {
    const container = document.getElementById('test-blur-container');
    container.innerHTML = '';
    for (let i = 0; i < locations.length; i++) {
        const completedClues = i + 1;
        let blurPx = 18 - Math.floor((completedClues - 1) * (18 / (locations.length - 1)));
        if (blurPx < 0) blurPx = 0;
        const div = document.createElement('div');
        div.style.marginBottom = '2em';
        div.innerHTML = `<h3>Clues completed: ${completedClues}</h3>
            <img src="img/Queenie.png" alt="Secret animal" style="filter: blur(${blurPx}px); -webkit-filter: blur(${blurPx}px); pointer-events: none; user-select: none; max-width: 220px; margin: 1em auto; display: block; transition: filter 0.3s;" />
            <div style="text-align:center;font-size:1.1em;margin-top:0.5em;">Blur: ${blurPx}px</div>`;
        container.appendChild(div);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const main = document.createElement('main');
    main.innerHTML = '<div id="test-blur-container"></div>';
    document.body.appendChild(main);
    renderTestBlur();
});
