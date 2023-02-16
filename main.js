'ust strict';


// Make Navbar transparent when you scroll
document.addEventListener('scroll', () => {
    const scroll_y = window.scrollY;
    const navbar_id= document.getElementById('navbar');
    const start_y = navbar_id.getBoundingClientRect().height;
    const end_y = navbar_id.getBoundingClientRect().bottom;
    const height = end_y - start_y;

    if (scroll_y > height) {
        navbar_id.classList.add('navbar__transparent');
    } else {
        navbar_id.classList.remove('navbar__transparent');
    }
});


function scrollIntoView(selector) {

    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});

}

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');

const navbarMenu_1 = document.querySelector('.navbar__menu__item');
const navbarMenuItem = document.querySelectorAll('.navbar__menu__item');

console.log(navbarMenu_1);
console.log(navbarMenuItem);
console.log(navbarMenuItem[1].dataset.link);

navbarMenu.addEventListener('click', (event) => {
    
    const target = event.target;
    const link = target.dataset.link;
    
    if (link == null) {
        return;
    }
    // console.log(target.dataset.link);

    scrollIntoView('#' + link);
    
});

//  move to contact btn
move_to_contact = document.querySelector('.home__contact');

move_to_contact.addEventListener('click', () =>{
    
    scrollIntoView('#contact');

});

// make home slowly fade to transparent as the window scrolls down.home_contact
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    // console.log(1 - window.scrollY / homeHeight);
    home.style.opacity = 1 - window.scrollY / homeHeight;
})

// make arrow btn
arrow = document.querySelector('.arrow__btn');
arrow.addEventListener('click', () => {
    scrollIntoView('#Home');
})

document.addEventListener('scroll', () => {
    if(homeHeight / 2 < window.scrollY){
        arrow.classList.add('visible');
    } else{
        arrow.classList.remove('visible');
    }
});

// make prohect event
const workBtnContainer = document.querySelector('.work__catagories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;

    if (filter == null) {
        return;
    } else {

        projects.forEach((project => {
            setTimeout(() => {

                if(filter === '*' || filter === project.dataset.type) {
                    project.classList.remove('invisible');
                    
                }else {
    
                        project.classList.add('invisible');
                    
                }
                    
                }, 100);
                
                
        }));

    }
    if (filter == '*') {
        project.classList.add('project_visible');
    }
});

