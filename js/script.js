"use strict";

// MENU FUNCTIONALITY

const menuBtn = document.querySelector(".menu_icon");
const menu = document.querySelector(".menu_block");
let logoMenuLine = document.querySelector(".logo_menu_block");
let scrollBarWidth;
function hideBodyScrole() {
  let windowWidth = window.innerWidth;
  let workAreaWidth = document.body.clientWidth;
  scrollBarWidth = windowWidth - workAreaWidth;
  console.log(scrollBarWidth);

  if (scrollBarWidth) {
    document.body.style.paddingRight = scrollBarWidth + "px";
    logoMenuLine.style.paddingRight = scrollBarWidth + "px";
  }
  document.body.style.overflow = "hidden";
}
function showBodyScrole() {
  if (scrollBarWidth) {
    document.body.style.paddingRight = "";
    logoMenuLine.style.paddingRight = "";
  }
  document.body.style.overflow = "";
}

function showHideMenu() {
  if (!menuBtn || !menu) {
    return;
  }

  if (
    !menuBtn.classList.contains("active") ||
    !menu.classList.contains("visible")
  ) {
    menuBtn.classList.add("active");
    menu.classList.add("visible");
    hideBodyScrole();
    logoMenuLine.style.backgroundColor = "rgb(230, 78, 78)";
  } else if (
    menuBtn.classList.contains("active") ||
    menu.classList.contains("visible")
  ) {
    menuBtn.classList.remove("active");
    menu.classList.remove("visible");
    showBodyScrole();
    logoMenuLine.style.backgroundColor = "";
  } else {
    return;
  }
}

menuBtn.addEventListener("click", showHideMenu);

menu.addEventListener("click", (event) => {
  if (!event.target.closest("a") || !menu.classList.contains("visible")) {
    return;
  }
  showHideMenu();
});

function changeMenuPanelBackground() {
  let windowHight = document.documentElement.clientHeight - 80;

  let pageScrollValue = window.pageYOffset;

  if (
    pageScrollValue >= windowHight &&
    !logoMenuLine.classList.contains("active")
  ) {
    logoMenuLine.classList.add("active");
  } else if (
    pageScrollValue < windowHight &&
    logoMenuLine.classList.contains("active")
  ) {
    logoMenuLine.classList.remove("active");
  } else {
    return;
  }
}

window.addEventListener("scroll", changeMenuPanelBackground);

//observer for target sections

let observerOptions = {
  root: null,
  threshold: 0.25,
};

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let entryTarget = entry.target;
      if (!entryTarget.classList.contains("visible")) {
        entryTarget.classList.add("visible");
      }
      observer.unobserve(entryTarget);
    }
  });
}, observerOptions);

let targetSections = document.querySelectorAll(".target_section");
targetSections.forEach((section) => {
  observer.observe(section);
});

//observer for elements

let optionforElementObserver = {
  root: null,
  threshold: 0.4,
};

let elementObserver = new IntersectionObserver((entries, elementObserver) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let target = entry.target;
      target.setAttribute("data-for-observer", "visible");
      elementObserver.unobserve(target);
    }
  });
}, optionforElementObserver);

let elementsForObserver = document.querySelectorAll("[data-for-observer]");

if (elementsForObserver.length) {
  elementsForObserver.forEach((item) => {
    elementObserver.observe(item);
  });
}
