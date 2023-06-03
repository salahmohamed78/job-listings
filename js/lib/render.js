import { Create } from "./data-transformation.js";

class Render {
  //

  static renderElement(element, wrapperSelector, mode = "append") {
    const wrapper = document.querySelector(wrapperSelector);
    if (mode === "write") {
      wrapper.replaceChildren();
    }
    wrapper.append(element);
  }

  static renderElements(elements, wrapperSelector, mode = "append") {
    const wrapper = document.querySelector(wrapperSelector);
    const documentFragment = document.createDocumentFragment();
    for (let ele of elements) {
      documentFragment.append(ele);
    }

    if (mode === "write") {
      wrapper.replaceChildren();
    }

    wrapper.append(documentFragment);
    return documentFragment;
  }

  //   static renderJobsToPage(jobs) {
  //     const df = Create.createJobCardsList(jobs);
  //     const jobsWrapper = document.querySelector(".jobs");
  //     jobsWrapper.append(df);
  //     return df;
  //   }
  //   //

  static renderTagToSelectedTagsWrapper(clickedTag) {
    const clickedTagCategory = clickedTag.getAttribute("data-category");
    const clickedTagValue = clickedTag.getAttribute("data-value");
    const wrapper = document.querySelector(".filter__tags");

    if (
      wrapper.querySelector(`[data-category=${clickedTagCategory}]`) &&
      wrapper.querySelector(`[data-value=${clickedTagValue}]`)
    ) {
      console.log("tag already exist");
      return;
    }
    const newSelectedTagEle = Create.createSelectedTag(clickedTag);
    wrapper.append(newSelectedTagEle);
  }

  //  Delete

  static deleteSelctedTagViaDeleteBtn(deleteBtn) {
    deleteBtn.parentElement.remove();
  }

  //

  static hideElement(input) {
    if (typeof input === "string") {
      document.querySelector(input).classList.add("hide");
    } else if (input.nodeType === 1) {
      input.classList.add("hide");
    }
  }
  static showElement(input) {
    if (typeof input === "string") {
      document.querySelector(input).classList.remove("hide");
    } else if (input.nodeType === 1) {
      input.classList.remove("hide");
    }
  }

  static clear(selector) {
    const ele = document.querySelector(selector);
    ele.replaceChildren();
  }

  //
}

export { Render };
