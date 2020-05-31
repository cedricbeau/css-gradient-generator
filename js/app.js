
var gradientTool = {

  theValues: document.querySelectorAll('.gradient-value'),
  theLinear: document.getElementById('theLinear'),
  theRadial: document.getElementById('theRadial'),
  theGradientResult: document.getElementById('theGradientResult'),
  textResult: document.querySelector('.text-result'),
  myCollection: document.getElementById('myCollection'),
  addToCollection: document.getElementById('addToCollection'),
  clearMyCollection: document.getElementById('clearMyCollection'),


  init: function() {

    let self = this;

    this._getCollection();

    // Add
    this.addToCollection.addEventListener('click', function(){
      self._addCollection();
    })

    // Clear
    this.clearMyCollection.addEventListener('click', function(){
      self._clearCollection();
    })
  },

  /**
   * Check type of gradient
   */
  _checkTypeGradient: function (event) {

    let self = event.target,
        theLinearField = document.getElementById('theLinearField'),
        theRadialField = document.getElementById('theRadialField');

    //Linear
    if(self.id === 'theLinear') {
      theRadialField.style.display = 'none';
      theLinearField.style.display = 'flex';
    }
    //Radial
    if(self.id === 'theRadial') {
      theLinearField.style.display = 'none';
      theRadialField.style.display = 'flex';
    }

  },

  /**
   *
   * @param {object} emptyVar
   */
  _loopValues: function(newValue) {

    for(let i=0;i<this.theValues.length;i++){

      let linearDirection = this.theValues[0].value,
          radialDirection = this.theValues[1].value,
          couleur1 = this.theValues[2].value,
          couleur2 = this.theValues[3].value;

      ///Linear
      if(this.theLinear.checked === true) {
        newValue = 'linear-gradient('+linearDirection+', '+couleur1+', '+couleur2+')';
      }

      ///Radial
      if(this.theRadial.checked === true) {
        newValue = 'radial-gradient('+radialDirection+', '+couleur1+', '+couleur2+')';
      }
    }

    return newValue;
  },

  /**
   * Change value
   */
  _changeValue: function () {

    let hexValue

    this.theGradientResult.style.backgroundImage = this._loopValues(hexValue);
    this.textResult.innerText = this._loopValues(hexValue);
    this.addToCollection.style.opacity = 1;
    this.addToCollection.style.pointerEvents = 'all';
  },

  /**
   *
   * @param {*} event
   */
  _validate: function (event){

    let _this = event.target,
        self = this;

    _this.innerHTML = '<span class="icon-checkmark"></span>Ajouté !';
    _this.style.color = '#fff';
    _this.style.backgroundColor = '#4CAF50';

    window.setTimeout(function(){
      _this.innerHTML = '<span class="icon-plus"></span>Ajouter à ma collection';
      _this.style.opacity = 0;
      _this.style.pointerEvents = 'none';
      self.textResult.innerText = '';
    }, 2000)
  },

  /**
   * Add to collection
   */
  _addCollection: function() {

    let hexValue;

    this.theGradientResult.style.backgroundImage = this._loopValues(hexValue);
    this._storeFormValue();
    this._createItem();
  },


  /**
   *  Store Form Values
   */
  _storeFormValue: function () {

    //RGB
    let rgbValue = window.getComputedStyle(this.theGradientResult, null).getPropertyValue('background-image');
    window.localStorage.myRgbColor = rgbValue;

    for(let i=0;i<this.theValues.length;i++){

      let linearDirection = this.theValues[0].value,
          radialDirection = this.theValues[1].value,
          couleur1 = this.theValues[2].value,
          couleur2 = this.theValues[3].value;

      if(this.theLinear.checked === true) {
        window.localStorage.myHexColor = 'linear-gradient('+linearDirection+', '+couleur1+', '+couleur2+')';
      }

      if(this.theRadial.checked === true) {
        window.localStorage.myHexColor = 'radial-gradient('+radialDirection+', '+couleur1+', '+couleur2+')';
      }
    }
  },

  /**
   *
   * @param {*} HTML Markup
   * @param {string} className
   */
  _createElement: function(el, elClass) {

    newElement = document.createElement(el);
    newElement.classList = elClass;
    return newElement;
  },

  /**
   *  Create item
   */
  _createItem: function (){

    let storedHex = window.localStorage.myHexColor,
        storedRgb = window.localStorage.myRgbColor;

    let newItem = this._createElement('div', 'collection-item');

    let newItemColor = this._createElement('div', 'item-color');
    newItemColor.style.backgroundImage = storedHex;

    let newItemTextHex =  this._createElement('div', 'color-hex');
    newItemTextHex.innerText = storedHex;

    let newItemTextRgb =this._createElement('div', 'color-rgb');
    newItemTextRgb.innerText = storedRgb;

    newItem.appendChild(newItemColor);
    newItem.appendChild(newItemTextHex);
    newItem.appendChild(newItemTextRgb);

    this.myCollection.appendChild(newItem);
    this.clearMyCollection.style.display = 'flex';
    this._storeCollection();
  },

  /**
   * Store collection
   */
  _storeCollection: function (){
    window.localStorage.myCollection = myCollection.innerHTML;
  },

  /**
   * Get collection
   */
  _getCollection: function (){
    let storedCollection = window.localStorage.myCollection;
    if(!storedCollection){
      this.clearMyCollection.style.display = 'none';
      return
    } else {
      this.myCollection.innerHTML = storedCollection;
      this.clearMyCollection.style.display = 'flex';
    }
  },

  /**
   * Clear collection
   */
  _clearCollection: function () {

    var self = this;

    self.theGradientResult.style.backgroundColor = '#333';
    self.textResult.innerText = '';

    self.addToCollection.style.opacity = 0;
    self.addToCollection.style.pointerEvents = 'none';

    localStorage.clear();
    self.myCollection.innerHTML = '';
    self.clearMyCollection.style.display = 'none';
  }
}

gradientTool.init();