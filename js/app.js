/**
 * Manipulating the DOM exercise.
 * This exercise programmatically builds the navigation menu,
 * scrolls to anchors from the navigation, and highlights
 * the section in the viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 */

/**
 * Define Global Variables
 */
const sections = Array.from(document.querySelectorAll('section'));
const navList = document.getElementById('navbar__list');

/**
 * Check if a section is in the viewport
 * @param {HTMLElement} section 
 */
const sectionIsInView = section => {
  const rect = section.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Build the navigation menu
 */
const createNavMenu = () => {
  const fragment = new DocumentFragment();
  sections.forEach(section => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>`;
    fragment.appendChild(listItem);
  });
  navList.appendChild(fragment);
};

/**
 * Add class 'active' to section when near top of viewport
 */
const highlightActiveSection = () => {
  sections.forEach(section => {
    if (sectionIsInView(section)) {
      section.classList.add('your-active-class');
    } else {
      section.classList.remove('your-active-class');
    }
  });
};

/**
 * Scroll to anchor ID using scrollIntoView event
 * @param {Event} event 
 */
const smoothScrollToSection = event => {
  if (event.target.nodeName === 'A') {
    event.preventDefault();
    const targetSection = document.querySelector(event.target.getAttribute('href'));
    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

/**
 * Event listeners
 */
// Build menu when the DOM content is loaded
document.addEventListener('DOMContentLoaded', createNavMenu);

// Scroll to section on link click
navList.addEventListener('click', smoothScrollToSection);

// Set sections as active on scroll
document.addEventListener('scroll', highlightActiveSection);
