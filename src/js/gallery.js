const modal = document.getElementById('imgModal');
// const triggerBtns1 = document.querySelectorAll('.service-popup-link');
const triggerBtns2 = document.querySelectorAll('.gallery-image-container');
const closeBtn = document.getElementById('closeBtn');
const popupImage = document.getElementById('popupImage');

// Open the modal

// triggerBtns1.forEach(btn => {
//     btn.addEventListener('click', () => {
//         modal.classList.add('is-active');
//         popupImage.src = btn.dataset.img;
//     });
// })

triggerBtns2.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('is-active');
        popupImage.src = btn.firstElementChild.src;
    })
})

// Close the modal via the 'X' button
closeBtn.addEventListener('click', () => {
    modal.classList.remove('is-active');
});

// Close the modal if the user clicks anywhere on the darkened backdrop
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('is-active');
    }
});