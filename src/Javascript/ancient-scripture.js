const toggleButton = document.getElementById('toggleButton');
const myDiv = document.getElementById('myDiv');

toggleButton.addEventListener('click', () => {
    if (myDiv.classList.contains('hidden')) {
        myDiv.classList.remove('hidden');
        myDiv.classList.add('visible');
    } else {
        myDiv.classList.remove('visible');
        myDiv.classList.add('hidden');
    }
});
