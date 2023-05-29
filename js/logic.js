/*

create a template to hold the obj data

style the template using css using classes

fetch the data from json file

I will have an array of objects /

Loop through the array and do the following for each object of the objects:
    copy the template
    fill the template with the info from in the object
    append the object to a document fragment

append the document fragment to the cards wrapper container

*/

async function fetchData(req) {
  try {
    const res = await fetch(req);
    if (res.ok === false) {
      throw new Error("Internal http code error");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

class Create {
  static createJobCard(job) {
    let template =
      document.querySelector(".template-job").content.firstElementChild;
    let newJobEle = template.cloneNode(true);
    Create._fillJobCard(job, newJobEle);
    return newJobEle;
  }

  static _fillJobCard(job, ele) {
    ele.setAttribute("data-id", job.id);
    ele.setAttribute("data-company", job.company);
    ele.setAttribute("data-new", job.new);
    ele.setAttribute("data-featured", job.featured);
    ele.setAttribute("data-position", job.position);
    ele.setAttribute("data-role", job.role);
    ele.setAttribute("data-level", job.level);
    ele.setAttribute("data-postedAt", job.postedAt);
    ele.setAttribute("data-contract", job.contract);
    ele.setAttribute("data-location", job.location);
    ele.setAttribute("data-languages", job.languages.join(" "));
    ele.setAttribute("data-tools", job.tools);
    //

    const company = ele.querySelector(".company-name");
    company.textContent = job.company;

    //

    const logo = ele.querySelector(".company__logo");
    logo.src = job.logo;

    //

    const newTag = ele.querySelector(".new");
    if (job.new) {
      newTag.textContent = "NEW!";
    } else {
      newTag.classList.add("hide");
    }

    //

    const featuredTag = ele.querySelector(".featured");
    if (job.new) {
      featuredTag.textContent = "FEATURED";
    } else {
      featuredTag.classList.add("hide");
    }

    //

    const position = ele.querySelector(".position");
    position.textContent = job.position;

    //

    const time = ele.querySelector(".time");
    time.textContent = job.postedAt;

    //

    const contract = ele.querySelector(".contract");
    contract.textContent = job.contract;

    //

    const location = ele.querySelector(".location");
    location.textContent = job.location;

    const tagWrapper = ele.querySelector(".job__tags");
    const tagTemplate =
      ele.querySelector(".template-jobTag").content.firstElementChild;

    //role category
    tagWrapper.append(this.createJobCardTag(tagTemplate, "role", job.role));
    //level category
    tagWrapper.append(this.createJobCardTag(tagTemplate, "level", job.level));

    for (let language of job.languages) {
      tagWrapper.append(
        this.createJobCardTag(tagTemplate, "languages", language)
      );
    }

    for (let tool of job.tools) {
      tagWrapper.append(this.createJobCardTag(tagTemplate, "tools", tool));
    }

    // end of function
  }

  static createJobCardsList(jobs) {
    const df = new DocumentFragment();
    for (let job of jobs) {
      df.append(this.createJobCard(job));
    }
    return df;
  }

  static createJobCardTag(template, category, value) {
    let newEle = template.cloneNode(true);
    newEle.setAttribute("data-category", category);
    newEle.setAttribute("data-value", value);
    newEle.textContent = value;

    return newEle;
  }

  static createSelectedTag(clickedTagEle) {
    const template = document.querySelector(".template-selectedTags").content
      .firstElementChild;
    const newSelectedTagEle = template.cloneNode(true);
    newSelectedTagEle.setAttribute(
      "data-category",
      clickedTagEle.getAttribute("data-category")
    );
    newSelectedTagEle.setAttribute(
      "data-value",
      clickedTagEle.getAttribute("data-value")
    );

    const newSelectedTagText =
      newSelectedTagEle.querySelector(".filter__tagName");
    newSelectedTagText.textContent = clickedTagEle.textContent;

    return newSelectedTagEle;
  }
  // end of class
}

class Render {
  //
  static renderJobsToPage(jobs) {
    const df = Create.createJobCardsList(jobs);
    const jobsWrapper = document.querySelector(".jobs");
    jobsWrapper.append(df);
    return df;
  }
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

class FilterSystem {
  _selectedTags = {
    role: new Set(),
    level: new Set(),
    languages: new Set(),
    tools: new Set(),
  };

  _filterJob(jobElement) {
    for (let category in this._selectedTags) {
      for (let value of this._selectedTags[category]) {
        let jobDataAttribute = jobElement.getAttribute(`data-${category}`);
        if (jobDataAttribute.includes(value) === false) {
          return false;
        }
      }
    }

    return true;
  }

  // public methods
  add(category, value) {
    this._selectedTags[category].add(value);
  }

  remove(category, value) {
    this._selectedTags[category].delete(value);
  }

  filterJobs(jobs) {
    for (let job of jobs) {
      let matches = this._filterJob(job);
      if (matches === true) {
        Render.showElement(job);
      } else {
        Render.hideElement(job);
      }
    }
  }

  reset() {
    this._selectedTags = {
      role: new Set(),
      level: new Set(),
      languages: new Set(),
      tools: new Set(),
    };
  }
}

export { fetchData, Render, FilterSystem };
