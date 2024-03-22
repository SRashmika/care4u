const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft;

//get the number of cards that can fit in the carousel ar once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

//insert copies of the last few cards to begining of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
//insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

//Add event listeners for the aroow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () =>{
       carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
})

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    //records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () =>{
    isDragging = false;
    carousel.classList.remove("dragging");
}

// const autoPlay = () => {
//     if(window.innerWidth<800) return; //Return if window is smaller than 800
//     //Autoplay the carousel after every 2500ms
//     timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
// }

const infiniteScroll = () => {
    //If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2*carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    //If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
document.addEventListener("scroll", infiniteScroll);






    
  
    //company-details-hadmi
    var sp= document.getElementById('company-menu');
            var combtns =sp.getElementsByClassName('company-btn');

            for(var i=0; i<btns.length; i++){
                btns[i].addEventListener('click', function(){
                    var current = document.getElementsByClassName("active");
                    current[0].className = current[0].className.replace(" active");
                    this.className +=" active";
                })
            }

    // applications
    const downloadBtn = document.querySelector(".company-appli-download-btn");
const fileLink = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.dayjob.com%2Fwp-content%2Fuploads%2F2022%2F10%2FPictorial-CV-template.jpg&tbnid=TFLmbnImWgWDHM&vet=12ahUKEwjkpfH437CBAxWRh2MGHcnqC4MQMygJegQIARBC..i&imgrefurl=https%3A%2F%2Fwww.dayjob.com%2Fcv-template-236%2F&docid=-jA6IR2IVdmJQM&w=702&h=884&q=cv%20image&ved=2ahUKEwjkpfH437CBAxWRh2MGHcnqC4MQMygJegQIARBC";
const initTimer = () =>{
    if(downloadBtn.classList.contains("disable-timer")){
        return(location.href = fileLink)
    }
    let timer = downloadBtn.dataset.timer;
    // console.log(timer)
    downloadBtn.classList.add("timer");
    downloadBtn.innerHTML = "Your file will download in few seconds..." ;

    const initCounter = setInterval(() =>{
        if(timer > 0){
          timer--
        return downloadBtn.innerHTML = "Your file will download in few seconds...";
        }
        clearInterval(initCounter);
        location.href = fileLink;
        downloadBtn.textContent = "Your file is downloading...";

        setTimeout(() => {
            downloadBtn.classList.replace("timer", "disable-timer");
            downloadBtn.innerHTML = '<span class="material-symbols-outlined">download</span><span class="text">Download Again</span>';

        },3000);
        
    },1000);

};

downloadBtn.addEventListener("click", initTimer)