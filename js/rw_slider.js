"use strict";

{
  const rwSlider = document.querySelector(".recent_work_slider_block");
  const rwSliderLine = document.querySelector(".recent_work_slider_line");
  let rwSlides = document.querySelectorAll(".recent_work_slider_item");

  const rwSliderNextBtn = document.querySelector(".rw_slider_next_btn");
  const rwSliderPrevBtn = document.querySelector(".rw_slider_prev_btn");

  const rwSliderBtnsBlock = document.querySelector(".recent_work_slider_btns");
  let rwSliderBtns = document.querySelectorAll(".rw_slider_btn");

  let rwCloneSlides = [];

  let activeSlideIndex = 0;

  if (rwSlides) {
    for (let slide of rwSlides) {
      let clone = slide.cloneNode(true);

      rwCloneSlides.push(clone);
    }
  }

  function nextRwSlide() {
    rwSliderNextBtn.removeEventListener("click", nextRwSlide);
    rwSliderPrevBtn.removeEventListener("click", prevRwSlide);

    if (!rwSliderLine.classList.contains("active")) {
      rwSliderLine.classList.add("active");
    }
    let rwSlides = document.querySelectorAll(".recent_work_slider_item");
    let slideWidth = rwSlides[0].offsetWidth;
    let slidesForEdit = [];

    for (let slide of rwCloneSlides) {
      let clone = slide.cloneNode(true);
      slidesForEdit.push(clone);
    }

    rwSliderLine.append(slidesForEdit[activeSlideIndex]);

    rwSliderLine.style.transform = `translateX(-${slideWidth}px)`;

    setTimeout(() => {
      rwSliderLine.classList.remove("active");

      rwSlides[0].remove();
      rwSliderLine.style.transform = ``;

      if (activeSlideIndex < rwCloneSlides.length - 1) {
        activeSlideIndex++;
      } else {
        activeSlideIndex = 0;
      }

      for (let button of rwSliderBtns) {
        if (button.classList.contains("active")) {
          button.classList.remove("active");
        }
      }
      rwSliderBtns[activeSlideIndex].classList.add("active");
      rwSliderPrevBtn.addEventListener("click", prevRwSlide);

      rwSliderNextBtn.addEventListener("click", nextRwSlide);
    }, 300);
  }

  function prevRwSlide() {
    rwSliderPrevBtn.removeEventListener("click", prevRwSlide);
    rwSliderNextBtn.removeEventListener("click", nextRwSlide);

    if (rwSliderLine.classList.contains("active")) {
      rwSliderLine.classList.remove("active");
    }

    let rwSlides = document.querySelectorAll(".recent_work_slider_item");

    if (activeSlideIndex == 0) {
      activeSlideIndex = rwCloneSlides.length - 1;
    } else {
      activeSlideIndex--;
    }

    let slideWidth = rwSlides[0].offsetWidth;
    let slidesForEdit = [];

    for (let slide of rwCloneSlides) {
      let clone = slide.cloneNode(true);
      slidesForEdit.push(clone);
    }

    rwSliderLine.style.transform = `translateX(-${slideWidth}px)`;
    rwSliderLine.prepend(slidesForEdit[activeSlideIndex]);

    setTimeout(() => {
      rwSliderLine.classList.add("active");
      rwSliderLine.style.transform = ``;
    }, 0);

    setTimeout(() => {
      rwSlides[rwSlides.length - 1].remove();

      for (let button of rwSliderBtns) {
        if (button.classList.contains("active")) {
          button.classList.remove("active");
        }
      }
      rwSliderBtns[activeSlideIndex].classList.add("active");
      rwSliderNextBtn.addEventListener("click", nextRwSlide);
      rwSliderPrevBtn.addEventListener("click", prevRwSlide);
    }, 300);
  }

  rwSliderNextBtn.addEventListener("click", nextRwSlide);
  rwSliderPrevBtn.addEventListener("click", prevRwSlide);

  function leftRunRwSlider(count) {
    rwSliderNextBtn.removeEventListener("click", nextRwSlide);
    rwSliderPrevBtn.removeEventListener("click", prevRwSlide);
    rwSliderBtnsBlock.removeEventListener("click", actionForRwSliderBtns);

    if (!rwSliderLine.classList.contains("active")) {
      rwSliderLine.classList.add("active");
    }
    let rwSlides = document.querySelectorAll(".recent_work_slider_item");
    let slideWidth = rwSlides[0].offsetWidth;
    let slidesForEdit = [];
    let count1 = count;
    let count2 = count;
    let sliderShift = slideWidth * count;

    for (let slide of rwCloneSlides) {
      let clone = slide.cloneNode(true);
      slidesForEdit.push(clone);
    }

    let arrowForInsert = [];

    while (count1) {
      arrowForInsert.push(slidesForEdit[activeSlideIndex]);

      if (activeSlideIndex < rwCloneSlides.length - 1) {
        activeSlideIndex++;
      } else {
        activeSlideIndex = 0;
      }
      count1--;
    }

    rwSliderLine.append(...arrowForInsert);
    rwSliderLine.style.transform = `translateX(-${sliderShift}px)`;

    setTimeout(() => {
      if (rwSliderLine.classList.contains("active")) {
        rwSliderLine.classList.remove("active");
      }

      while (count2) {
        rwSlides = document.querySelectorAll(".recent_work_slider_item");

        rwSlides[0].remove();
        sliderShift -= slideWidth;
        rwSliderLine.style.transform = `translateX(-${sliderShift}px)`;
        count2--;
      }
      rwSliderNextBtn.addEventListener("click", nextRwSlide);
      rwSliderPrevBtn.addEventListener("click", prevRwSlide);
      rwSliderBtnsBlock.addEventListener("click", actionForRwSliderBtns);
    }, 300);
  }

  function rightRunRwSlider(count) {
    rwSliderNextBtn.removeEventListener("click", nextRwSlide);
    rwSliderPrevBtn.removeEventListener("click", prevRwSlide);
    rwSliderBtnsBlock.removeEventListener("click", actionForRwSliderBtns);

    if (rwSliderLine.classList.contains("active")) {
      rwSliderLine.classList.remove("active");
    }

    let rwSlides = document.querySelectorAll(".recent_work_slider_item");
    let slideWidth = rwSlides[0].offsetWidth;
    let slidesForEdit = [];
    let count1 = count;
    let count2 = count;
    let sliderShift = slideWidth * count;

    for (let slide of rwCloneSlides) {
      let clone = slide.cloneNode(true);
      slidesForEdit.push(clone);
    }

    let arrowForInsert = [];

    while (count1) {
      if (activeSlideIndex == 0) {
        activeSlideIndex = rwCloneSlides.length - 1;
      } else {
        activeSlideIndex--;
      }
      arrowForInsert.unshift(slidesForEdit[activeSlideIndex]);
      count1--;
    }

    rwSliderLine.prepend(...arrowForInsert);
    rwSliderLine.style.transform = `translateX(-${sliderShift}px)`;

    setTimeout(() => {
      if (!rwSliderLine.classList.contains("active")) {
        rwSliderLine.classList.add("active");
      }
      rwSliderLine.style.transform = ``;
    }, 0);

    setTimeout(() => {
      while (count2) {
        rwSlides = document.querySelectorAll(".recent_work_slider_item");
        rwSlides[rwSlides.length - 1].remove();
        count2--;
      }
      rwSliderNextBtn.addEventListener("click", nextRwSlide);
      rwSliderPrevBtn.addEventListener("click", prevRwSlide);
      rwSliderBtnsBlock.addEventListener("click", actionForRwSliderBtns);
    }, 300);
  }

  function actionForRwSliderBtns(event) {
    if (!event.target.closest(".rw_slider_btn")) {
      return;
    }

    let target = event.target.closest(".rw_slider_btn");

    let btnIndex = target.dataset.index;

    if (activeSlideIndex == btnIndex) {
      return;
    }

    let count =
      btnIndex > activeSlideIndex
        ? btnIndex - activeSlideIndex
        : activeSlideIndex - btnIndex;

    console.log(btnIndex);
    let correctFunction =
      btnIndex > activeSlideIndex ? leftRunRwSlider : rightRunRwSlider;

    correctFunction(count);

    if (rwSliderBtns.length) {
      for (let button of rwSliderBtns) {
        if (button.classList.contains("active")) {
          button.classList.remove("active");
        }
      }
    }
    target.classList.add("active");
  }

  rwSliderBtnsBlock.addEventListener("click", actionForRwSliderBtns);
}
