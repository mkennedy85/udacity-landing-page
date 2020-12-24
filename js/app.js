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
const mobileNavButton = document.querySelector('#mobile__nav')

// Validates whether the element passed to it is in the viewport
let isInViewport = function (elem) {
  let rect = elem.getBoundingClientRect();
  if (rect.top > 0) {
    if (rect.y < (rect.height + 20)) {
      return true
    }
  } else {
    return false
  }
};

// Add class 'active' to section when near top of viewport
let addActiveClass = function () {
  for (let section of sections) {
    let container = section.querySelector('.landing__container');
    if (isInViewport(container)) {
      section.classList.add('your-active-class');
      document.querySelector(`#${section.id}__item`).classList.add('active');
    } else {
      section.classList.remove('your-active-class');
      document.querySelector(`#${section.id}__item`).classList.remove('active');
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
};

// Show nav bar
let showMobileNavBar = function (e) {
  e.preventDefault();
  navHeader.style.display = "block";
};

// Show nav bar
let hideMobileNavBar = function () {
  let mediaWidth = window.matchMedia("(max-width: 1000px)")
  if (mediaWidth.matches) {
    navHeader.style.display = "none";
  }
};

// Build the navigation menu
let buildNavMenu = function () {
  let navFragment = document.createDocumentFragment();
  for (let section of sections) {
    let navItem = document.createElement('li');
    let navItemLink = document.createElement('a');
  
    navItem.id = `${section.id}__item`;
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
  let mediaWidth = window.matchMedia("(max-width: 1000px)")
  if (window.scrollY === 0) {
    navHeader.style.opacity = 1;
  } else if (mediaWidth.matches) {
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
window.addEventListener("load", hideMobileNavBar);
window.addEventListener("scroll", addActiveClass);
window.addEventListener("scroll", dimNavHeader);
window.addEventListener("scroll", hideMobileNavBar);
navHeader.addEventListener("mouseover", showNavHeader);
scrollToTopButton.addEventListener("click", function (event) {scrollToTop(event);});
mobileNavButton.addEventListener("click", function (event) {showMobileNavBar(event);})