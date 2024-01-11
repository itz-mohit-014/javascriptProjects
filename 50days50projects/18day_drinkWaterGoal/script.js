const waterGlassWrapper = document.getElementById("waterGlassWrapper");
const waterTank = document.querySelector(".water-tank");
const remainEl = waterTank.children[0];
const drinkEl = waterTank.children[1];

function drinkedWater(e) {
  if (e.currentTarget == e.target) return;

  let waterGlass = e.target.closest("div.glassOfWater");
  waterGlass.classList.toggle("drinked");

  updatePreviousGlass(waterGlass);
  updateWaterFillTank(waterGlass);
}

function updatePreviousGlass(waterGlass) {
  if (waterGlass.classList.contains("drinked")) {
    let drinkWaterGlasses = waterGlass.dataset.value;
    for (let i = 0; i < drinkWaterGlasses; i++) {
      waterGlass.parentElement.children[i].classList.add("drinked");
    }
  } else {
    let drinkWaterGlasses = waterGlass.dataset.value;
    for (let i = drinkWaterGlasses; i < 8; i++) {
      waterGlass.parentElement.children[i].classList.remove("drinked");
    }
  }
}

function updateWaterFillTank(glassEl) {
  let glassElValue = glassEl.dataset.value;
  let oneGlass = 100 / 8; // 12.5

  let emptyGlasses = 0;
  for (let i = 0; i < waterGlassWrapper.children.length; i++) {
    if (!waterGlassWrapper.children[i].classList.contains("drinked")) {
      emptyGlasses++;
    }
  }

  if (glassEl.classList.contains("drinked")) {
    drinkEl.style.height = `${oneGlass * glassElValue}%`;
    drinkEl.innerHTML = `${oneGlass * glassElValue}%`;

    remainEl.style.height = ` ${100 - oneGlass * glassElValue}%`;
    remainEl.innerHTML = ` ${
      2 - (250 * glassElValue) / 1000
    }L <p>Remained</p> `;
  } else {
    drinkEl.style.height = `${100 - oneGlass * emptyGlasses}%`;
    drinkEl.innerHTML = `${100 - oneGlass * emptyGlasses}%`;
    remainEl.style.height = ` ${oneGlass * emptyGlasses}%`;
    remainEl.innerHTML = ` ${(250 * emptyGlasses) / 1000}L <p>Remained</p> `;
  }
}

waterGlassWrapper.addEventListener("click", drinkedWater);
