"use strict";

{
  for (let img of document.querySelectorAll(".rated_slide_item_img img")) {
    img.ondragstart = function () {
      return false;
    };
  }

  const ratedSliderBlock = document.querySelector(".rated_slider_block");
  const ratedSlider = document.querySelector(".rated_slider");
  const ratedSliderLine = document.querySelector(".rated_slider_line");
  let ratedSlides = document.querySelectorAll(".rated_slider_item");

  const ratedSliderBtnsBlock = document.querySelector(".rated_slider_btns");
  let ratedSliderBtns = document.querySelectorAll(".rated_slider_btn");

  let activeRatedSlideIndex = 0;
  let ratedSlideWidth = ratedSlides[0].offsetWidth;
  let maxShiftValue = ratedSliderLine.scrollWidth - ratedSlider.offsetWidth;
  let startCords = null;
  let posX11 = null;
  let posX22 = null;
  let sample = /[-0-9.]+(?=px)/;

  ratedSliderLine.style.transform = `translateX(0px)`;

  function startSwaping(event) {
    startCords = posX11 = event.clientX;

    document.addEventListener("pointermove", movingRatedSlider);
    document.addEventListener("pointerup", stopMovingRatedSlider);

    if (ratedSliderLine.classList.contains("active")) {
      ratedSliderLine.classList.remove("active");
    }
  }

  function movingRatedSlider(event) {
    posX22 = posX11 - event.clientX;
    posX11 = event.clientX;
    let transformValue = ratedSliderLine.style.transform;
    let transform = transformValue.match(sample)[0];
    let newTransformValue = transform - posX22;

    if (newTransformValue < maxShiftValue * -1) {
      newTransformValue = maxShiftValue * -1;
    } else if (newTransformValue > 0) {
      newTransformValue = 0;
    } else {
      newTransformValue = newTransformValue;
    }

    ratedSliderLine.style.transform = `translateX(${newTransformValue}px)`;
  }

  function stopMovingRatedSlider() {
    document.removeEventListener("pointermove", movingRatedSlider);
    document.removeEventListener("pointerup", stopMovingRatedSlider);
    ratedSliderCorection();
  }

  function ratedSliderCorection() {
    if (!ratedSliderLine.classList.contains("active")) {
      ratedSliderLine.classList.add("active");
    }

    let limit = ratedSlideWidth * 0.25;
    let finishCord = startCords - posX11;
    let isSwap = Math.abs(finishCord) >= limit;

    if (isSwap) {
      if (startCords > posX11) {
        activeRatedSlideIndex =
          activeRatedSlideIndex < ratedSlides.length - 1
            ? ++activeRatedSlideIndex
            : ratedSlides.length - 1;
      } else if (startCords < posX11) {
        activeRatedSlideIndex =
          activeRatedSlideIndex == 0 ? 0 : --activeRatedSlideIndex;
      }
    }

    ratedSliderLine.style.transform = `translateX(-${
      activeRatedSlideIndex * ratedSlideWidth
    }px)`;

    for (let btn of ratedSliderBtns) {
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
      }
    }
    ratedSliderBtns[activeRatedSlideIndex].classList.add("active");
  }

  function actionForSliderBtns(event) {
    if (!event.target.closest(".rated_slider_btn")) {
      return;
    }

    if (!ratedSliderLine.classList.contains("active")) {
      ratedSliderLine.classList.add("active");
    }

    let target = event.target.closest(".rated_slider_btn");
    let btnIndex = target.dataset.index;

    if (btnIndex == activeRatedSlideIndex) {
      return;
    } else {
      activeRatedSlideIndex = btnIndex;
    }

    ratedSliderLine.style.transform = `translateX(-${
      activeRatedSlideIndex * ratedSlideWidth
    }px)`;

    for (let btn of ratedSliderBtns) {
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
      }
    }

    target.classList.add("active");
  }

  function resizeWindowCorectSlider() {
    ratedSlideWidth = ratedSlides[0].offsetWidth;
    maxShiftValue = ratedSliderLine.scrollWidth - ratedSlider.offsetWidth;

    ratedSliderLine.style.transform = `translateX(-${
      activeRatedSlideIndex * ratedSlideWidth
    }px)`;
  }

  window.addEventListener("resize", resizeWindowCorectSlider);
  ratedSliderBtnsBlock.addEventListener("click", actionForSliderBtns);

  ratedSlider.addEventListener("pointerdown", startSwaping);
}
