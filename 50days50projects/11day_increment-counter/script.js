const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  let start = 0;
  let target = Number(counter.getAttribute("data-target"));
  let increment = target / 100;
  function updateValue() {
    if (start == target) {
      clearInterval(ref);
    }
    counter.innerHTML = start;
    start += increment;
  }

  let ref = setInterval(updateValue, 5);
});
