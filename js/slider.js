const arrayOfSliderProd = [
    {
        imgSrc: 'img/slider/1.jpg',
        title: 'Sassicaia',
        subtitle: 'Вино и не только',
        description: 'Возможно, самые известные итальянские напитки',
        buttonUrl: 'https://winebutik.com.ua/drinks/category/wines/brand/sassicaia',
        buttonColor: 'red',
        position: 'center'
    },
    {
        imgSrc: 'img/slider/2.jpg',
        title: 'Виски Macallan',
        subtitle: 'Яркие оттенки традиций',
        description: 'Лучший подарок на юбилей',
        buttonUrl: 'https://winebutik.com.ua/drinks/category/whiskey/brand/macallan',
        buttonColor: 'red',
        position: 'center'
    },
    {
        imgSrc: 'img/slider/3.jpg',
        title: 'Хрустальные декантеры ',
        subtitle: 'Riedel',
        description: 'Больше, чем графин для вина',
        buttonUrl: 'https://winebutik.com.ua/brand/riedel',
        buttonColor: 'blue',
        position: 'right'
    },
    {
        imgSrc: 'img/slider/4.jpg',
        title: 'Вино Provetto',
        subtitle: 'Проветто Спуманте Бьянко Брют',
        description: 'Глубинный и насыщенный вкус ',
        buttonUrl: 'https://winebutik.com.ua/drinks/category/wines/brand/sassicaia',
        buttonColor: 'blue',
        position: 'right'
    }
]

function generatediv(ppclass, index, obj) {
    const backgroundDiv = document.createElement('div');
    backgroundDiv.setAttribute('class', 'slider-item-background');
    backgroundDiv.setAttribute('style', `background-image:url(${obj.imgSrc})`);
    backgroundDiv.setAttribute('data-index', index);
    backgroundDiv.classList.add(ppclass); //position of slide (left current right)
    const sliderItem = document.createElement('div');
    sliderItem.setAttribute('class', 'slider-item');
    sliderItem.classList.add(obj.position) // contents position in slide ( center right)
    const sliderItemContent = document.createElement('div');
    sliderItemContent.setAttribute('class', 'slider-item-content');
    const sliderItemContentTextTitle = document.createElement('p');
    sliderItemContentTextTitle.setAttribute('class', 'slider-item-content-text-title')
    sliderItemContentTextTitle.innerText = `${obj.title}`; //title
    const sliderItemContentTextSubtitle = document.createElement('p');
    sliderItemContentTextSubtitle.setAttribute('class', 'slider-item-content-text-subtitle')
    sliderItemContentTextSubtitle.innerText = `${obj.subtitle}`; //subtitle
    const sliderItemContentTextDescr = document.createElement('p');
    sliderItemContentTextDescr.setAttribute('class', 'slider-item-content-text-descr');
    sliderItemContentTextDescr.innerText = `${obj.description}`; //description
    const sliderItemContentButton = document.createElement('a');
    sliderItemContentButton.setAttribute('class', 'slider-item-content-button')
    sliderItemContentButton.setAttribute('href', obj.buttonUrl)  
    sliderItemContentButton.classList.add(obj.buttonColor)//buttonColor
    sliderItemContentButton.innerText = 'ПОПРОБОВАТЬ';

    sliderItemContent.appendChild(sliderItemContentTextTitle);
    sliderItemContent.appendChild(sliderItemContentTextSubtitle);
    sliderItemContent.appendChild(sliderItemContentTextDescr);
    sliderItemContent.appendChild(sliderItemContentButton);

    sliderItem.appendChild(sliderItemContent)

    backgroundDiv.appendChild(sliderItem)
    return backgroundDiv
};

(function () {
    window.sliderContainer =  document.querySelector('.slider-item-container');
    sliderContainer.appendChild(generatediv('left', 3, arrayOfSliderProd[3]));
    sliderContainer.appendChild(generatediv('current', 0, arrayOfSliderProd[0]));
    sliderContainer.appendChild(generatediv('right', 1, arrayOfSliderProd[1]));

})()

function showText(){
    let timeCount = 50;
    const itemTextArr = document.querySelectorAll('.slider-item-content p, .slider-item-content a');
    for(let i = itemTextArr.length-1; i>=0; i--){
        setTimeout(function(){
            itemTextArr[i].classList.add('center')
        } ,timeCount);
        timeCount+=50;
    }

}

let sliderInterval = setInterval(sliderNext, 6000)

function hideText(){
    let timeCount = 50;
    const itemTextArr = document.querySelectorAll('.slider-item-content p, .slider-item-content a');
    for(let i = itemTextArr.length-1; i>=0; i--){
        itemTextArr[i].classList.remove('center')
    }
}


function sliderNext() {
    const leftImg = document.querySelector('.slider-item-background.left');
    leftImg.remove();
    const curentImg = document.querySelector('.slider-item-background.current');
    curentImg.classList.add('left');
    curentImg.classList.remove('current');
    const rightImg = document.querySelector('.slider-item-background.right');
    rightImg.classList.add('current');
    rightImg.classList.remove('right');
    const rightImgIndex =  getNextIndex(rightImg, 'right');
    sliderContainer.appendChild(generatediv('right', rightImgIndex,  arrayOfSliderProd[rightImgIndex]));
    hideText();
    setTimeout(showText ,300)
}

function getNextIndex (el, direction) {
    const currentIndex = +el.getAttribute('data-index');
    if(direction==='right'){
    return arrayOfSliderProd[currentIndex+1] ? currentIndex+1 : 0
    }
    return arrayOfSliderProd[currentIndex-1] ? currentIndex-1 : arrayOfSliderProd.length-1

}

function sliderPrevious() {
    const rightImg = document.querySelector('.slider-item-background.right');
    rightImg.remove();
    const curentImg = document.querySelector('.slider-item-background.current');
    curentImg.classList.add('right');
    curentImg.classList.remove('current');
    const leftImg = document.querySelector('.slider-item-background.left');
    leftImg.classList.add('current');
    leftImg.classList.remove('left');
    const leftImgIndex =  getNextIndex(leftImg, 'left');
    sliderContainer.appendChild(generatediv('left', leftImgIndex,  arrayOfSliderProd[leftImgIndex]));
    hideText();
    setTimeout(showText ,300)

}
sliderPrevious();