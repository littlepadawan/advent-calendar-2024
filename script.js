window.onload = function () {
    initializeHouseHover();
    initializeHouseClick();
    initializeSnow();
}

function initializeHouseHover() {

    const houses = document.querySelectorAll('.house');

    houses.forEach(house => {
        house.addEventListener('mouseover', () => {
            console.log('Mouseover event on house' + house.id);
            // Replace the image source with the v2 version
            const newSrc = house.src.replace('_idle', '_hover'); // Assuming the v2 images are named with "_hover"
            house.src = newSrc;
        });

        house.addEventListener('mouseout', () => {
            // Revert the image source back to the v1 version
            const originalSrc = house.src.replace('_hover', '_idle'); // Assuming the v1 images are named with "_idle"
            house.src = originalSrc;
        });
    });
}

function initializeHouseClick() {
    const houses = document.querySelectorAll('.house');
    // Create modal and overlay elements
    const modal = document.createElement('div');
    const overlay = document.createElement('div');
    const modalImg = document.createElement('img');

    function styleModalAndOverlay() {
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = 998;
        overlay.style.display = 'none';

        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.display = 'none';

        modalImg.style.maxWidth = '90%';
        modalImg.style.maxHeight = '90%';
        modal.appendChild(modalImg);
    }

    styleModalAndOverlay();

    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    houses.forEach(house => {

        house.addEventListener('click', () => {
            overlay.style.display = 'block';
            modal.style.display = 'block';
        // TODO: Set correct image 
        });

        overlay.addEventListener('click', () => {
            overlay.style.display = 'none';
            modal.style.display = 'none';
        });
    });
}


function initializeSnow () {
    const snowContainer = document.querySelector('.snow-container');
    const calendar = document.querySelector('.advent-calendar');

    // Get dimensions of the calendar
    const calendarWidth = calendar.offsetWidth;

    // Create snowflakes dynamically
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        // Randomize properties
        const size = Math.random() * 12 + 2; // Between sum and the right most value
        const duration = Math.random() * 6 + 6; // Between sum and the right most value
        const delay = Math.random() * 5; // Between 0s and 5s
        const drift = (Math.random() * 200 - 100) + 'px'; 

        // Apply styles dynamically
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = Math.random() * calendarWidth + 'px'; // Random position across the screen
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${delay}s`;
        snowflake.style.setProperty('--drift', drift);

        // Append snowflake to container
        snowContainer.appendChild(snowflake);

        // Remove snowflake after animation to prevent memory leaks
        setTimeout(() => snowflake.remove(), (duration + delay) * 1000);
    }

    // Continuously create snowflakes
    function generateSnowflakes() {
        createSnowflake();
        setTimeout(generateSnowflakes, 10); // Generate a new snowflake every 200ms
    }

    generateSnowflakes();
};

document.querySelector('.advent-calendar').addEventListener('mousemove', function(e) {
    const element = document.elementFromPoint(e.clientX, e.clientY);
    console.log('Hovered element:', element);
  });