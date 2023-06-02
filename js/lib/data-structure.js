class Item {
  constructor(obj, elementFactoryFunction) {
    this._object = obj;
    this.element = elementFactoryFunction(obj);
  }
  _object;
  _element;

  set object(obj) {
    this._object = obj;
  }

  set element(ele) {
    if (ele.nodeType === 1) {
      this._element = ele;
    } else {
      console.log("trying to asign a nonelement to an element");
    }
  }

  get object() {
    return this._object;
  }

  get element() {
    return this._element;
  }
}

class Items {
  constructor(objects, elementFactoryFunction) {
    for (let obj of objects) {
      const item = new Item(obj, elementFactoryFunction);
      this._list.push(item);
    }
    this._length = this._list.length;
  }
  _list = [];
  _length;
  _renderedQuantity = 0;
  _howManyToRender = 10;

  get elements() {
    return this._list.map((item) => {
      return item.element;
    });
  }

  getElements(requestedQuantity = this._howManyToRender) {
    let elementsList = [];

    if (requestedQuantity < 1) {
      console.log(
        `Entered number is ${requestedQuantity}. Requested quantity cant be 0 or less`
      );
      // return at least empty list to avoid error in the render function that will expect this function as an argument that equalls to a list
      return elementsList;
    }

    let avaliableQuantity = this._length - this._renderedQuantity;
    if (requestedQuantity > avaliableQuantity) {
      requestedQuantity = avaliableQuantity;
    }

    for (let i = 0; i < requestedQuantity; i++) {
      let currentElemet = this._list[i + this._renderedQuantity].element;
      elementsList.push(currentElemet);
    }

    this._renderedQuantity += requestedQuantity;

    return elementsList;
  }

  get elementsInADocumentFragment() {
    const df = document.createDocumentFragment();

    for (let obj of this._list) {
      df.append(obj.element);
    }
    return df;
  }
}

export { Item, Items };
