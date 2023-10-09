const image = document.getElementById('cloud-container');

// Function to animate the image
function moveImage() {
    const speed = 2; // Adjust the speed as needed
    const maxWidth = window.innerWidth;

    let currentPosition = 0;

    // Animation loop
    function animate() {
        currentPosition += speed;

        // Teleport the image to the left when it reaches the right edge
        if (currentPosition >= maxWidth) {
            currentPosition = -image.offsetWidth;
        }

        image.style.left = currentPosition + 'px';

        // Request the next animation frame
        requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
}

// Call the function to start the animation
moveImage();
