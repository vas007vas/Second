"use strict";

{
  let counters = document.querySelectorAll(".counter");

  function isVisible(item) {
    let viewportHight = document.documentElement.clientHeight;
    let elem = item.getBoundingClientRect();
    let topVisibility = elem.top > 0 && elem.top < viewportHight - 100;
    let bottomVisibility = elem.bottom > 0 && elem.bottom < viewportHight - 100;

    console.log(elem.top);
    return topVisibility || bottomVisibility;
  }

  function runCounter(item) {
    let finalValue = parseInt(item.innerHTML);
    let startValue = 0;
    let startTime = new Date();
    let duration = item.hasAttribute("data-duration")
      ? +item.dataset.duration
      : 1000;
    let freshValue = 0;
    let step = null;
    let coof = 0;

    function reWrite() {
      if (freshValue < finalValue) {
        step = (new Date() - startTime) / duration;
        coof = Math.min(step, 1);
        freshValue = Math.round(coof * finalValue);
        item.innerHTML = freshValue + "+";
        console.log(step);
        setTimeout(reWrite, 0);
      }
    }
    reWrite();
  }

  function checkVisibleSounters() {
    if (counters.length) {
      for (let item of counters) {
        if (item.classList.contains("done")) {
          continue;
        }
        let goRun = isVisible(item);
        if (goRun) {
          runCounter(item);
          item.classList.add("done");
        }
      }
    }
  }
  window.addEventListener("scroll", checkVisibleSounters);
}
