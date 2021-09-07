const styleSwitcherToggler = document.querySelector('.style-switcher-toggler');
styleSwitcherToggler.addEventListener('click', ()=>{
    document.querySelector('.style-switcher').classList.toggle('open');
})
window.addEventListener('scroll', ()=>{
    if( document.querySelector('.style-switcher').classList.toggle('open')){
        document.querySelector('.style-switcher').classList.remove('open');
    }
})
/*------------------------COLORS------------------------*/
const alternateStyle = document.querySelectorAll('.alternate-style');
function setActiveStyle(color){
    localStorage.setItem("color",color);
    changeColor();
}
function changeColor(){
    alternateStyle.forEach((style)=>{
        if(localStorage.getItem("color") === style.getAttribute("title")){
            style.removeAttribute("disabled");
        }else{
            style.setAttribute("disabled","true");
        }
    })
}
if(localStorage.getItem("color") !== null){
    changeColor();
}
/*------------------------DARK/NIGHT------------------------*/
const dayNight = document.querySelector(".day-night");
const socialN = document.querySelector(".social-links");
dayNight.addEventListener("click",()=>{
    document.body.classList.toggle("dark")
    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark")
    }
    else{
        localStorage.setItem("theme", "light")
    }
    updateIcon();
})
function themeMode(){
    if(localStorage.getItem("theme")!==null){
        if(localStorage.getItem("theme")=== "light"){
            document.body.classList.remove("dark");
        }else{
            document.body.classList.add("dark");
        }
    }
    updateIcon();
}
themeMode();
function updateIcon(){
    if(document.body.classList.contains("dark")){
        dayNight.querySelector("i").classList.remove("fa-moon");
        dayNight.querySelector("i").classList.add("fa-sun");
        socialN.querySelector(".fa-instagram").classList.add("dark");
        socialN.querySelector(".Insta").classList.add("dark");
        socialN.querySelector(".fa-facebook-f").classList.add("dark");
        socialN.querySelector(".Face").classList.add("dark");
        socialN.querySelector(".fa-whatsapp").classList.add("dark");
        socialN.querySelector(".Whats").classList.add("dark");
        socialN.querySelector(".fa-linkedin-in").classList.add("dark");
        socialN.querySelector(".Link").classList.add("dark");
    }else{
        dayNight.querySelector("i").classList.remove("fa-sun");
        dayNight.querySelector("i").classList.add("fa-moon");
        socialN.querySelector(".fa-instagram").classList.remove("dark");
        socialN.querySelector(".Insta").classList.remove("dark");
        socialN.querySelector(".fa-facebook-f").classList.remove("dark");
        socialN.querySelector(".Face").classList.remove("dark");
        socialN.querySelector(".fa-whatsapp").classList.remove("dark");
        socialN.querySelector(".Whats").classList.remove("dark");
        socialN.querySelector(".fa-linkedin-in").classList.remove("dark");
        socialN.querySelector(".Link").classList.remove("dark");
    }
}
// window.addEventListener("load",()=>{
//     if(document.body.classList.contains("dark")){
//         dayNight.querySelector("i").classList.add("fa-sun");
//         socialN.querySelector(".fa-instagram").classList.add("dark");
//         socialN.querySelector(".Insta").classList.add("dark");
//         socialN.querySelector(".fa-facebook-f").classList.add("dark");
//         socialN.querySelector(".Face").classList.add("dark");
//         socialN.querySelector(".fa-whatsapp").classList.add("dark");
//         socialN.querySelector(".Whats").classList.add("dark");
//         socialN.querySelector(".fa-linkedin-in").classList.add("dark");
//         socialN.querySelector(".Link").classList.add("dark");
//     }else{
//         dayNight.querySelector("i").classList.add("fa-moon");
//         socialN.querySelector(".fa-instagram").classList.remove("dark");
//         socialN.querySelector(".Insta").classList.remove("dark");
//         socialN.querySelector(".fa-facebook-f").classList.remove("dark");
//         socialN.querySelector(".Face").classList.remove("dark");
//         socialN.querySelector(".fa-whatsapp").classList.remove("dark");
//         socialN.querySelector(".Whats").classList.remove("dark");
//         socialN.querySelector(".fa-linkedin-in").classList.remove("dark");
//         socialN.querySelector(".Link").classList.remove("dark");
//     }
// })
/*----------------DARK NIGHT TOTAL----------------*/

