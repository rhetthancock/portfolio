window.addEventListener('load', (event) => {
    let bsu = document.getElementById('bsu');
    let mtchs = document.getElementById('mtchs');
    let bbcom = document.getElementById('bbcom');
    let oit = document.getElementById('oit');
    let sem = document.getElementById('sem');

    let bsu_exp = document.getElementById('bsu-exp');
    let mtchs_exp = document.getElementById('mtchs-exp');
    let bbcom_exp = document.getElementById('bbcom-exp');
    let oit_exp = document.getElementById('oit-exp');
    let sem_exp = document.getElementById('sem-exp');

    bsu.addEventListener('click', (event) => {
        bsu.classList.add('active');
        bsu_exp.classList.add('active');
        mtchs.classList.remove('active');
        mtchs_exp.classList.remove('active');
    });

    mtchs.addEventListener('click', (event) => {
        mtchs.classList.add('active');
        mtchs_exp.classList.add('active');
        bsu.classList.remove('active');
        bsu_exp.classList.remove('active');
    });

    bbcom.addEventListener('click', (event) => {
        bbcom.classList.add('active');
        bbcom_exp.classList.add('active');
        oit.classList.remove('active');
        oit_exp.classList.remove('active');
        sem.classList.remove('active');
        sem_exp.classList.remove('active');
    });

    oit.addEventListener('click', (event) => {
        oit.classList.add('active');
        oit_exp.classList.add('active');
        bbcom.classList.remove('active');
        bbcom_exp.classList.remove('active');
        sem.classList.remove('active');
        sem_exp.classList.remove('active');
    });

    sem.addEventListener('click', (event) => {
        sem.classList.add('active');
        sem_exp.classList.add('active');
        bbcom.classList.remove('active');
        bbcom_exp.classList.remove('active');
        oit.classList.remove('active');
        oit_exp.classList.remove('active');
    });

}); 