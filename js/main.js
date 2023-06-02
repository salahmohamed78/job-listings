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

fetchData("../data.json").then((jobs) => {
  data = new Items(jobs, Create.createJobCard);
  Render.renderElements(data.getElements(), ".jobs");
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
}

function clearFilter() {
  const selectedTagsWrapper = document.querySelector(".filter__tags");
  Render.clear(selectedTagsWrapper);
  filterSystem.reset();
  const JobElementsList = document.querySelectorAll(".job");
  filterSystem.filterJobs(JobElementsList);
}
