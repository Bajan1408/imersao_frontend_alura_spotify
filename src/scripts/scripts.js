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

const mainContainer = document.querySelector('.main_container');

let timer, timerMain;

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

mainContainer.addEventListener('mouseenter', () => {
    clearTimeout(timerMain);
    timerMain = setTimeout(() => {
        mainContainer.classList.add('show_scroll');
    }, 100);
    
})

mainContainer.addEventListener('mouseleave', () => {
    clearTimeout(timerMain);
    timerMain = setTimeout(() => {
        mainContainer.classList.remove('show_scroll');
    }, 500);
    
})

mainContainer.addEventListener('scroll', () => {
    const scrollTop = mainContainer.scrollTop;
    const containerHeight = mainContainer.scrollHeight;
    const windowHeight = mainContainer.clientHeight;

    if(scrollTop === 0) {
        const styleSheet = document.styleSheets[2];

        console.log('stylesheet.cssRules[1]')
        console.log(styleSheet.cssRules[1]);
    for(let i = 0; styleSheet.cssRules.length; i++) {
        const rule = styleSheet.cssRules[i];
    
        if(rule.selectorText === '::-webkit-scrollbar-thumb') {
            console.log('A barra chegou em cima..');
            rule.style.borderRadius = '0 .5rem .5rem 0';
        
        }
      }
    }

        
    

    if(scrollTop + windowHeight === containerHeight) {
        mainContainer.style = 'border-radius: 0 0 .5rem 0'
    }

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

const iconTextLibrary = document.getElementById('icon_text');
const iconTextIcon = document.querySelector('.material-symbols-outlined');
const iconTextText = document.querySelector('.your_library_text');
const btnPlus = document.querySelector('.bi-plus-lg');

iconTextLibrary.addEventListener('mouseover', () => {
    iconTextIcon.classList.add('white');
    iconTextText.classList.add('white');
})

iconTextLibrary.addEventListener('mouseout', () => {
    iconTextIcon.classList.remove('white');
    iconTextText.classList.remove('white');
})

btnPlus.addEventListener('mouseover', () => {
    btnPlus.classList.add('white');
})

btnPlus.addEventListener('mouseout', () => {
    btnPlus.classList.remove('white');
})

const cards = document.querySelector('.cards');

function createCard(elem) {
    const divCard = document.createElement('div');
    divCard.classList.add('card');

    const divCardsImg = document.createElement('div');
    divCardsImg.setAttribute('class', 'cards__img');
        const img = document.createElement('img');
        img.setAttribute('src', `${elem.url}`);
        img.setAttribute('alt', 'imagem card');
    divCardsImg.appendChild(img);

    const divCardsText = document.createElement('div');
    divCardsText.classList.add('cards__text');
        const hThree = document.createElement('h3');
        hThree.textContent = elem.name;
        const p = document.createElement('p');
        p.textContent = elem.genre;
    divCardsText.appendChild(hThree);
    divCardsText.appendChild(p);

    const divPlay = document.createElement('div');
    divPlay.setAttribute('class', 'play hidden');
        const iconPlay = document.createElement('i');
        iconPlay.setAttribute('class', 'bi bi-play-circle-fill');
    divPlay.appendChild(iconPlay);
    
    divCard.appendChild(divCardsImg);
    divCard.appendChild(divCardsText);
    divCard.appendChild(divPlay);
    
    cards.appendChild(divCard);
}

function requestApi(searchTerm) {
    const endpoint = `http://localhost:3000/artists?name_like=${searchTerm}`;

    fetch(endpoint)
    .then(res => res.json())
    .then(res => {
        console.log(res);
        res.forEach(el => {
            createCard(el);
        })     
    })
}


// requestApi(searchInput.value);

// document.addEventListener('input', () => {
//     const searchTerm = searchInput.value.toLowerCase();

//     if(searchTerm === '') {
//         divCard.classList.add('hidden');
//         cards.classList.remove('hidden');
//         return;
//     } else {
//         divCard.classList.remove('hidden');
//     }
    
//     requestApi(searchTerm);
// })

const searchIcon = document.querySelector('.bi-search');

searchIcon.addEventListener('click', () => {
    const divCard = document.querySelectorAll('.card');

    cards.innerHTML = '';
    // cards.innerText = ''; //outra forma possível
    
    const searchTerm = searchInput.value.toLowerCase();
    
    requestApi(searchTerm);

    cards.addEventListener('mouseover', evt => {
        const card = evt.target.closest('.card');
        if(!card) return;

        const play = card.querySelector('.play');
        if(play) {
            play.classList.remove('hidden');
        }
    })

    cards.addEventListener('mouseout', evt => {
        const card = evt.target.closest('.card');
        if(!card) return;

        const play = card.querySelector('.play');
        if(play) {
            play.classList.add('hidden');

        }
        
    })

})




