import { Create } from "./data-transformation.js";

class Render {
  // new

  static renderElement(element, wrapperSelector) {
    const wrapper = document.querySelector(wrapperSelector);
    wrapper.append(element);
  }

  static renderElements(elements, wrapperSelector) {
    const wrapper = document.querySelector(wrapperSelector);
    const documentFragment = document.createDocumentFragment();
    for (let ele of elements) {
      documentFragment.append(ele);
    }
    wrapper.append(documentFragment);
    return documentFragment;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // old

  //

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

  static hideElement(ele) {
    ele.classList.add("hide");
  }
  static showElement(ele) {
    ele.classList.remove("hide");
  }

  static clear(ele) {
    ele.replaceChildren();
  }

  //
}

export { Render };
