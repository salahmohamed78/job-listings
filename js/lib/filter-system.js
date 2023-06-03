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
        job.classList.remove("hide");
      } else {
        job.classList.add("hide");
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

export { FilterSystem };
