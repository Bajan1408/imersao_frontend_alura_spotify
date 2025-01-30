const searchContainer = document.querySelector('.search_container');
const searchInput = document.querySelector('.search_input');
const inputKeys = document.querySelector('.input_keys');
const searchPipe = document.querySelector('.search_pipe');
const purseIcon = document.querySelector('.purse_icon');
const xIcon = document.querySelector('.x_icon');

const installApp = document.querySelector('.install_app');
const iconInstall = document.querySelector('.icon_install i');
const textInstall = document.querySelector('.text_install');

const boxWidthScroll = document.querySelector('.box_with_scroll');

let timer;

boxWidthScroll.addEventListener('mouseenter', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        boxWidthScroll.classList.add('show_scroll');
    }, 100);
    
})

boxWidthScroll.addEventListener('mouseleave', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        boxWidthScroll.classList.remove('show_scroll');
    }, 500);
    
})

searchInput.addEventListener('input', () => {
    if(searchInput.value.length > 0) {
        console.log('Cliquei na caixa de texto...');
        searchInput.placeholder = '';
        inputKeys.style = 'display:none';
        searchPipe.style = 'display:none';
        purseIcon.style = 'display:none';
        xIcon.style = 'display:block';
    } else {
        console.log('Cliquei na caixa de texto...');
        searchInput.placeholder = 'What do you want do play?';
        inputKeys.style = 'display:block';
        searchPipe.style = 'display:block';
        purseIcon.style = 'display:block';
        xIcon.style = 'display:none';
    }
    
})

searchContainer.addEventListener('mouseover', () => {
    if(searchInput.value === '')
    inputKeys.style = 'display:inline-block';
})

searchContainer.addEventListener('mouseout', () => {
    inputKeys.style = 'display:none';
})



xIcon.addEventListener('click', () => {
    if(searchInput.value != '') {
        searchInput.value = '';
        searchInput.placeholder = 'What do you want do play?';
        searchInput.focus();
    } else if (searchInput.value === '') {
        searchInput.setAttribute('placeholder', 'What do you want do play?');
        inputKeys.style = 'display:none';
        searchPipe.style = 'display:block';
        purseIcon.style = 'display:block';
        xIcon.style = 'display:none';
    }
})

installApp.addEventListener('mouseover', () => {
    iconInstall.classList.add('white');
    textInstall.classList.add('white');
})

installApp.addEventListener('mouseout', () => {
    iconInstall.classList.remove('white');
    textInstall.classList.remove('white');
})

const endpoint = 'http://localhost:3000/artists';

fetch(endpoint)
    .then(res => res.json())
    .then(res => {
        console.log(res);
    })
