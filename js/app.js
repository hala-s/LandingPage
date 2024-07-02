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
let navLinks = [];

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
    const anchor = document.createElement('a');
    anchor.classList.add('menu__link');
    anchor.href = `#${section.id}`;
    anchor.textContent = section.dataset.nav;
    listItem.appendChild(anchor);
    fragment.appendChild(listItem);
  });
  navList.appendChild(fragment);

  // Get all navigation links
  navLinks = Array.from(navList.getElementsByClassName('menu__link'));
};

/**
 * Add class 'active' to section when near top of viewport
 * and highlight corresponding navigation link
 */
const highlightActiveSection = () => {
  sections.forEach((section, index) => {
    if (sectionIsInView(section)) {
      section.classList.add('active');
      navLinks[index].classList.add('active-link');
    } else {
      section.classList.remove('active');
      navLinks[index].classList.remove('active-link');
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
