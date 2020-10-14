// On page load
window.addEventListener('load', (event) => {
    // Assign pointers
    let img_profile = document.getElementById('profile');
    let img_mc = document.getElementById('minecraft');
    let img_mars = document.getElementById('mars');
    let img_bali = document.getElementById('bali');
    let hov_mc = document.getElementById('minecraft-hover');
    let hov_mars = document.getElementById('mars-hover');
    let hov_bali = document.getElementById('bali-hover');
    let cap_mc = document.getElementById('cap-minecraft');
    let cap_mars = document.getElementById('cap-mars');
    let cap_bali = document.getElementById('cap-bali');

    // Hover and blur handlers
    hov_mc.addEventListener('mouseover', (event) => {
        img_profile.classList.add('hide');
        img_mc.classList.remove('hide');
        cap_mc.classList.remove('hide');
    });
    hov_mc.addEventListener('mouseout', (event) => {
        img_profile.classList.remove('hide');
        img_mc.classList.add('hide');
        cap_mc.classList.add('hide');
    });

    hov_mars.addEventListener('mouseover', (event) => {
        img_profile.classList.add('hide');
        img_mars.classList.remove('hide');
        cap_mars.classList.remove('hide');
    });
    hov_mars.addEventListener('mouseout', (event) => {
        img_profile.classList.remove('hide');
        img_mars.classList.add('hide');
        cap_mars.classList.add('hide');
    });

    hov_bali.addEventListener('mouseover', (event) => {
        img_profile.classList.add('hide');
        img_bali.classList.remove('hide');
        cap_bali.classList.remove('hide');
    });
    hov_bali.addEventListener('mouseout', (event) => {
        img_profile.classList.remove('hide');
        img_bali.classList.add('hide');
        cap_bali.classList.add('hide');
    });
});