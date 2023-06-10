const root = document.documentElement;
const header = document.querySelector("header");

const bgHeight = header.clientHeight;

root.style.setProperty("--bgHeight", `${bgHeight}px`);

/*

//////////////////////////////////////////

*/
let data = {};

//

import { fetchData } from "./lib/fetch.js";
import { Item, Items } from "./lib/data-structure.js";
import { FilterSystem } from "./lib/filter-system.js";
import { Render } from "./lib/render.js";
import { Create } from "./lib/data-transformation.js";

const filterSystem = new FilterSystem();

fetchData("https://salahmohamed78.github.io/job-listings/data.json").then((jobs) => {
  data = new Items(jobs, Create.createJobCard);
  Render.renderElements(data.getElements(), ".jobs");
  setTimeout(() => {
    Render.renderElements(data.getElements(data.length), ".jobs");
  }, 0);
});

//

document.addEventListener("click", documentOnClickCallBack);

// functions

function documentOnClickCallBack(e) {
  const target = e.target;
  if (target.classList.contains("job__tag")) {
    addFilterTagAndFilter(target);
  } else if (target.classList.contains("removeTag")) {
    removeFilterTagAndFilter(target);
  } else if (target.classList.contains("clearBtn")) {
    console.log("clear btn pressed");
    clearFilter();
  }
}

function addFilterTagAndFilter(tagElement) {
  const category = tagElement.getAttribute("data-category");
  const value = tagElement.getAttribute("data-value");
  Render.showElement(".filter-wrapper");
  Render.renderTagToSelectedTagsWrapper(tagElement);
  filterSystem.add(category, value);

  const JobElementsList = document.querySelectorAll(".job");
  filterSystem.filterJobs(JobElementsList);
}

function removeFilterTagAndFilter(closeBtn) {
  const tagElement = closeBtn.parentElement;
  const category = tagElement.getAttribute("data-category");
  const value = tagElement.getAttribute("data-value");
  Render.deleteSelctedTagViaDeleteBtn(closeBtn);
  filterSystem.remove(category, value);

  const JobElementsList = document.querySelectorAll(".job");
  filterSystem.filterJobs(JobElementsList);
  const tagsWrapper = document.querySelector(".filter__tags");

  if (!tagsWrapper.querySelector(".filter__tag")) {
    Render.hideElement(".filter-wrapper");
  }
}

function clearFilter() {
  Render.clear(".filter__tags");
  Render.hideElement(".filter-wrapper");
  filterSystem.reset();
  const JobElementsList = document.querySelectorAll(".job");
  filterSystem.filterJobs(JobElementsList);
}
