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

const navMenu = document.getElementById('navbar__list');
const navHeader = document.querySelector('header.page__header');
const sections = document.querySelectorAll('section');
const scrollToTopButton = document.querySelector('#scroll__to__top')

// Validates whether the element passed to it is in the viewport
let isInViewport = function (elem) {
  let bounding = elem.getBoundingClientRect();
  return (
      bounding.top >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
};

// Add class 'active' to section when near top of viewport
let addActiveClass = function () {
  for (let section of sections) {
    let container = section.querySelector('.landing__container');
    if (isInViewport(container)) {
      section.classList.add('your-active-class');
    } else {
      section.classList.remove('your-active-class');
    }
  };
};

// Smooth scrolling event listener added to navigaion menu links (not supported by Safari)
let smoothScrolling = function (e, section) {
  e.preventDefault();
  scrollTo({
    top: section.offsetTop,
    behavior: "smooth"
  });
};

// Scroll to top button
let scrollToTop = function (e) {
  e.preventDefault();
  scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Build the navigation menu
let buildNavMenu = function () {
  let navFragment = document.createDocumentFragment();
  for (let section of sections) {
    let navItem = document.createElement('li');
    let navItemLink = document.createElement('a');
  
    navItemLink.innerHTML = section.dataset.nav;
    navItemLink.href = `#${section.id}`;
    navItemLink.classList.add("menu__link");
    navItemLink.addEventListener("click", function(event) {smoothScrolling(event, section);})
    navItem.appendChild(navItemLink);
    navFragment.appendChild(navItem);
  };
  
  navMenu.appendChild(navFragment);
};

// Hide navigation bar unless page loaded or mouseover event
let dimNavHeader = function () {
  if (window.scrollY === 0) {
    navHeader.style.opacity = 1;
  } else {
    navHeader.style.opacity = 0.1;
  };
};

let showNavHeader = function () {
  navHeader.style.opacity = 1;
  setTimeout(dimNavHeader, 3000);
};

// Adding events
window.addEventListener("load", buildNavMenu);
window.addEventListener("load", addActiveClass);
window.addEventListener("load", showNavHeader);
window.addEventListener("scroll", addActiveClass);
window.addEventListener("scroll", dimNavHeader);
navHeader.addEventListener("mouseover", showNavHeader);
scrollToTopButton.addEventListener("click", function (event) {scrollToTop(event);})