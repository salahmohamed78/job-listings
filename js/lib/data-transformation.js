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

export { Create };
