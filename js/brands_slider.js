"use strict";

{
  for (let abkor of document.querySelectorAll(".brands_slider_item_img a")) {
    abkor.ondragstart = function () {
      return false;
    };
    abkor.addEventListener("click", checkAnkorAction);
  }
  for (let img of document.querySelectorAll(".brands_slider_item_img a img")) {
    img.ondragstart = function () {
      return false;
    };
  }
  const brandsSliderBlock = document.querySelector(".brands_slider_block");
  const brandsSlider = document.querySelector(".brands_slider");
  const brandsSliderLine = document.querySelector(".brands_slider_line");
  let brandsSlides = document.querySelectorAll(".brands_slider_item");

  let activebrandSlide = 0;
  let startCord = null;
  let posX1 = null;
  let posX2 = null;
  let simple = /[-0-9.]+(?=px)/;
  let minimalShift = brandsSlides[0].offsetWidth * 0.3;
  let slideWidth = brandsSlides[0].offsetWidth;
  let matginShift =
    brandsSliderLine.scrollWidth - brandsSliderBlock.offsetWidth;
  let maxSliderIndex = matginShift / slideWidth;

  console.log(maxSliderIndex);

  brandsSliderLine.style.transform = `translateX(0px)`;

  function startbrandsSliderAction(event) {
    startCord = posX1 = event.clientX;

    document.addEventListener("pointermove", moveBrandsSlider);
    document.addEventListener("pointerup", stopBrandsSliderAction);

    if (brandsSliderLine.classList.contains("active")) {
      brandsSliderLine.classList.remove("active");
    }
  }

  function moveBrandsSlider(event) {
    posX2 = posX1 - event.clientX;
    posX1 = event.clientX;
    let transformValue = brandsSliderLine.style.transform;
    let transform = +transformValue.match(simple)[0];
    let shift = transform - posX2;

    if (shift < matginShift * -1) {
      shift = matginShift * -1;
    } else if (shift > 0) {
      shift = 0;
    } else {
      shift = shift;
    }

    brandsSliderLine.style.transform = `translateX(${shift}px)`;
  }

  function stopBrandsSliderAction() {
    document.removeEventListener("pointermove", moveBrandsSlider);
    document.removeEventListener("pointerup", stopBrandsSliderAction);
    corectSlider();
  }

  function corectSlider() {
    if (!brandsSliderLine.classList.contains("active")) {
      brandsSliderLine.classList.add("active");
    }

    let transformDate = brandsSliderLine.style.transform;
    let shift = +transformDate.match(simple)[0];
    let corection = Math.abs(Math.round(shift / slideWidth));
    console.log(corection);
    brandsSliderLine.style.transform = `translateX(-${
      corection * slideWidth
    }px)`;
    activebrandSlide = corection;
  }

  function checkAnkorAction(event) {
    let marker = startCord - posX1;

    if (Math.abs(marker) < 3) {
      return;
    } else {
      event.preventDefault();
    }
  }

  function resizeSliderCorection() {
    slideWidth = brandsSlides[0].offsetWidth;
    matginShift = brandsSliderLine.scrollWidth - brandsSliderBlock.offsetWidth;
    maxSliderIndex = matginShift / slideWidth;
    brandsSliderLine.style.transform = `translateX(-${
      activebrandSlide * slideWidth
    }px)`;
  }

  window.addEventListener("resize", resizeSliderCorection);

  brandsSlider.addEventListener("pointerdown", startbrandsSliderAction);
}
