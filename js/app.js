/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navList = document.getElementById('navbar__list');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// function createNavItem(section){
//     const navItem = document.createElement('li');
//     const navLink = document.createElement('a');
//     // use getAttribute to access data attribute
//     navLink.textContent = section.getAttribute('data-nav');
//     navLink.href = `#${section.id}`;
//     navLink.classList.add('menu__link');
//     navItem.appendChild(navLink);
//     return navItem;
// }

/**
 * Check if a section is in the viewport
 * @param {HTMLElement} section 
 */
const isInViewport = (section) => {
    const rect = section.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight / 2;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * Build the navigation menu
 */
const buildNav = () => {
    const fragment = document.createDocumentFragment();
    sections.forEach((section) => {
      const listItem = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.classList.add('menu__link');
      anchor.href = `#${section.id}`;
      anchor.textContent = section.dataset.nav;
      listItem.appendChild(anchor);
      fragment.appendChild(listItem);
    });
    navList.appendChild(fragment);
  };


// Add class 'active' to section when near top of viewport
const setActiveSection = () => {
    sections.forEach((section) => {
      if (isInViewport(section)) {
        section.classList.add('your-active-class');
      } else {
        section.classList.remove('your-active-class');
      }
    });
  };

// Scroll to anchor ID using scrollTO event
const scrollToSection = (event) => {
    event.preventDefault();
    if (event.target.nodeName === 'A') {
      const targetSection = document.querySelector(event.target.getAttribute('href'));
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', buildNav);

// Scroll to section on link click
navList.addEventListener('click', scrollToSection);

// Set sections as active
document.addEventListener('scroll', setActiveSection);


