
/*----------------TEXT TYPING----------------*/
const texts = ['Jhoan', 'Amezcua', 'García'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

(function type(){
    if(count === texts.length){
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0,++index);
    
    document.querySelector('.typing').textContent = letter;
    if(letter.length === currentText.length){
        count++;
        index=0;
    }
    setTimeout(type, 300);
}());
/*----------------MENÚ DE NAVEGACIÓN----------------*/
(()=>{
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavMenu = document.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavMenu.addEventListener("click", hideNavMenu);
    function showNavMenu(){
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }
    function hideNavMenu(){
        navMenu.classList.remove("open");
        fadeOutEffect()
        bodyScrollingToggle();
    }
    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(()=>{
            document.querySelector(".fade-out-effect").classList.remove("active");
        },300)
    }
    document.addEventListener("click", (event)=>{
        if(event.target.classList.contains('link-item')){
            if(event.target.hash !==""){
                event.preventDefault();
                const hash = event.target.hash;
                //DESACTIVAR SECTION ACTIVA
                document.querySelector('.section.active').classList.add('hide');
                document.querySelector('.section.active').classList.remove('active');
                //ACTIVAR NUEVA SECTION
                document.querySelector(hash).classList.add('active');
                document.querySelector(hash).classList.remove('hide');
                //DESACTIVAR MENU NAV LINK-ITEM
                navMenu.querySelector(".active").classList.add('outer-shadow','hover-in-shadow');
                navMenu.querySelector(".active").classList.remove('active','inner-shadow');
                if(navMenu.classList.contains("open")){
                    //ACTIVAR NUEVO LINK ITEM
                    event.target.classList.add("active","inner-shadow");
                    event.target.classList.remove("outer-shadow","hover-in-shadow");
                    //ESCONDER MENU
                    hideNavMenu();
                }else{
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item)=>{
                        if(hash === item.hash){
                            item.classList.add("active","inner-shadow");
                            item.classList.remove("outer-shadow","hover-in-shadow"); 
                        }
                    })
                    fadeOutEffect();
                }
                window.location.hash = hash;
            }
        }
    })
})();
/*----------------ABOUT SECTION TABS----------------*/
(()=>{
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event)=>{
        if(event.target.classList.contains("tab-item") && !event.target.classList.contains("active")){
            const target = event.target.getAttribute("data-target");
            //DESACTIVAR ITEM
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            //ACTIVAR NUEVO ITEM
            event.target.classList.add("active", "outer-shadow");
            //DESACTIVAR PESTAÑA ACTUAL
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            //ACTIVAR NUEVA PESTAÑA
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();

function bodyScrollingToggle(){
    document.body.classList.toggle("hidden-scrolling");
}
/*----------------PORTAFOLIO FILTROS Y POPUP----------------*/
(()=>{
    const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll('.portfolio-item'),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;
    /*FILTER PORTFOLIO ITEM*/
    filterContainer.addEventListener("click", (event)=>{
        if(event.target.classList.contains("filter-item") && !event.target.classList.contains("active")){
            /* DESACTIVAR FILTER-ITEM */
            filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
            /* ACTIVAR NEW FILTER-ITEM */
            event.target.classList.add("active","outer-shadow");
            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item)=>{
              if(target === item.getAttribute("data-category") || target === 'Todo'){
                  item.classList.remove("hide");
                  item.classList.add("show");
                }
                else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                }    
            })
        }
    })
    portfolioItemsContainer.addEventListener("click", (event)=>{
        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            //OBTENER EL INDICE DEL PORTAFOLIO
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img")
            .getAttribute("data-screenshots");
            //CONVERTIR SCREENSHOTS EN ARRAYS
            screenshots = screenshots.split(",");
            if(screenshots.length === 1){
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }
            else{
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideShow();
            popupDetails();
        }
    })
    closeBtn.addEventListener("click",()=>{
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })
    function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }
    function popupSlideShow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        //ACTIVAR LOAD HASTA QUE LA IMAGEN CARGUE
        popup.querySelector(".pp-loader").classList.add(".active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            popup.querySelector(".pp-loader").classList.remove(".active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " de " + screenshots.length;
    }
    //SIGUIENTE SLIDE
    nextBtn.addEventListener("click",()=>{
        if(slideIndex === screenshots.length - 1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        popupSlideShow();
    })
    prevBtn.addEventListener("click",()=>{
        if(slideIndex === 0){
            slideIndex = screenshots.length-1;
        }
        else{
            slideIndex--;
        }
        popupSlideShow();
    })
    function popupDetails(){
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category;
    }
    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })
    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsContainer.classList.remove("active");
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus")
            projectDetailsContainer.style.maxHeight = 0 + "px";            
        }
        else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus")
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";    
            popup.scrollTo(0,projectDetailsContainer.offsetTop);        
        }
    }
})();
/*----------------ICONOS ANIMATION----------------*/
(()=>{
    var IconMail = Snap("#iconMail");
    var mail = Snap.select("#Mail")
    IconMail.hover(function(){
      mail.animate({d:"M24 3l-3.195 11.716-4.329-3.855 4.154-4.385-5.568 3.849-3.843-.934 12.781-6.391zm-7.988 8.876v4.124l1.735-2.578-1.735-1.546zm-4.136 5.684c-.646.405-1.312.765-1.986 1.069l.492 1.184c.675-.303 1.343-.658 1.992-1.056l-.498-1.197zm3.124-2.408c-.59.581-1.363 1.171-2.042 1.67l.505 1.214c.486-.346 1.087-.758 1.537-1.146v-1.738zm-5.808 5.137c-1.294.457-2.52.711-3.643.711-3.069 0-5.549-1.787-5.549-4.83 0-1.348.457-2.511 1.326-3.392 1-1 2.315-1.489 4.001-1.489 2.533 0 4.338 1.631 4.338 3.903 0 1.022-.369 1.957-1.033 2.62-.564.565-1.305.892-2.032.892-.425 0-.772-.163-.936-.424-.054-.087-.065-.142-.098-.337-.413.478-.848.685-1.457.685-1.076 0-1.761-.804-1.761-2.044 0-1.837 1.206-3.359 2.652-3.359.609 0 .913.152 1.207.609l.108-.38h1.285c-.065.217-.261.88-.315 1.12-.706 2.612-.695 2.504-.695 2.74 0 .447.616.27.967-.011.533-.413.881-1.218.881-2.055 0-1-.468-1.87-1.25-2.359-.489-.293-1.175-.457-1.946-.457-2.294 0-3.903 1.522-3.903 3.675 0 3.446 3.626 4.262 7.361 2.996l.492 1.186zm-3.397-5.282c0-.446-.25-.75-.631-.75-.413 0-.794.271-1.065.783-.261.489-.435 1.13-.435 1.631 0 .576.217.88.631.88.401 0 .782-.315 1.064-.87.262-.511.436-1.174.436-1.674z"},
        200,mina.ease);
    },function(){
      mail.animate({d:"M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"},
        200,mina.ease);
    });
    var IconCel = Snap("#IconCel");
    var Cel = Snap.select("#Cel")
    IconCel.hover(function(){
      Cel.animate({d:"M2.001 9.352c0 1.873.849 2.943 1.683 3.943.031 1 .085 1.668-.333 3.183 1.748-.558 2.038-.778 3.008-1.374 1 .244 1.474.381 2.611.491-.094.708-.081 1.275.055 2.023-.752-.06-1.528-.178-2.33-.374-1.397.857-4.481 1.725-6.649 2.115.811-1.595 1.708-3.785 1.661-5.312-1.09-1.305-1.705-2.984-1.705-4.695-.001-4.826 4.718-8.352 9.999-8.352 5.237 0 9.977 3.484 9.998 8.318-.644-.175-1.322-.277-2.021-.314-.229-3.34-3.713-6.004-7.977-6.004-4.411 0-8 2.85-8 6.352zm20.883 10.169c-.029 1.001.558 2.435 1.088 3.479-1.419-.258-3.438-.824-4.352-1.385-.772.188-1.514.274-2.213.274-3.865 0-6.498-2.643-6.498-5.442 0-3.174 3.11-5.467 6.546-5.467 3.457 0 6.546 2.309 6.546 5.467 0 1.12-.403 2.221-1.117 3.074zm-7.424-2.429c0-.206-.061-.378-.184-.517-.125-.139-.318-.255-.584-.349-.242-.085-.393-.155-.455-.208-.129-.108-.133-.292.018-.394.075-.051.18-.077.312-.077.217 0 .428.046.627.14l.15-.524c-.221-.1-.475-.149-.768-.149-.336 0-.605.082-.807.244s-.303.37-.303.622c0 .39.273.675.822.858.184.061.311.121.385.179.156.123.146.338-.012.446-.082.056-.195.083-.342.083-.255 0-.504-.062-.752-.188l-.137.542c.244.123.527.184.846.184.371 0 .662-.083.869-.248.211-.164.315-.379.315-.644zm3.656.846l-.154-2.875h-.906l-.613 1.983-.508-1.983h-.895l-.184 2.875h.615l.102-2.321h.008s.352 1.439.59 2.273h.516c.396-1.209.631-1.968.699-2.273h.014c0 .406.021 1.18.067 2.321h.649zm2.451-.846c0-.209-.064-.386-.189-.527-.124-.14-.322-.259-.59-.353-.237-.084-.389-.154-.449-.205-.123-.103-.125-.273.016-.369.072-.049.176-.074.305-.074.232 0 .435.052.637.147l.158-.556-.012-.006c-.221-.1-.48-.15-.774-.15-.338 0-.612.083-.815.248-.205.165-.311.379-.311.634 0 .396.281.688.836.872.179.061.306.12.379.177.146.115.14.318-.012.42-.078.054-.19.081-.333.081-.274 0-.521-.072-.761-.195l-.145.574c.273.136.559.19.863.19.374 0 .67-.084.879-.251.211-.167.318-.388.318-.657z"},
        200,mina.easeIn);
    },function(){
      Cel.animate({d:"M17.5 2c.276 0 .5.224.5.5v19c0 .276-.224.5-.5.5h-11c-.276 0-.5-.224-.5-.5v-19c0-.276.224-.5.5-.5h11zm2.5 0c0-1.104-.896-2-2-2h-12c-1.104 0-2 .896-2 2v20c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2v-20zm-9.5 1h3c.276 0 .5.224.5.501 0 .275-.224.499-.5.499h-3c-.275 0-.5-.224-.5-.499 0-.277.225-.501.5-.501zm1.5 18c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm5-3h-10v-13h10v13z"},
        200,mina.ease);
    });
})();
/*----------------MOSTRAR O ESCONDER SECCIONES----------------*/
(()=>{
    const sections = document.querySelectorAll(".section");
    sections.forEach((section)=>{
        if(!section.classList.contains("active")){
            section.classList.add("hide");
        }
    })
})();
window.addEventListener("load", ()=>{
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";
    }, 600);
})
/*----------------------ENVIAR MSJ----------------------*/
const $form = document.querySelector("#form");
const $btnMailTo = document.querySelector("#send")
$form.addEventListener("submit", EnviarMsj)
function EnviarMsj(event){
    event.preventDefault();
    const form = new FormData(this);
    $btnMailTo.setAttribute('href',`mailto:jhoan.amezcua.6914@gmail.com?subject=${form.get('asunto')}&body=${form.get('mensaje')}`)
    $btnMailTo.click();
}