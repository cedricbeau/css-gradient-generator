'use strict';

let theValues = document.querySelectorAll('.gradient-value')
let theLinear = document.getElementById('theLinear')
let theRadial = document.getElementById('theRadial')

let theGradientResult = document.getElementById('theGradientResult')
let textResult = document.querySelector('.text-result')

let myCollection = document.getElementById('myCollection')

let addToCollection = document.getElementById('addToCollection')
let clearMyCollection = document.getElementById('clearMyCollection')

/**
 * Change value
 */
function changeValue() {

  let hexValue

  for(let i=0;i<theValues.length;i++){

    let linearDirection = theValues[0].value
    let radialDirection = theValues[1].value
    let couleur1 = theValues[2].value
    let couleur2 = theValues[3].value
    ///Linear
    if(theLinear.checked === true) {
      hexValue = 'linear-gradient('+linearDirection+', '+couleur1+', '+couleur2+')'
    }
    ///Radial
    if(theRadial.checked === true) {
      hexValue = 'radial-gradient('+radialDirection+', '+couleur1+', '+couleur2+')'
    }
    theGradientResult.style.backgroundImage = hexValue
    textResult.innerText = hexValue
  }

  addToCollection.style.opacity = 1
  addToCollection.style.pointerEvents = 'all'
}

/**
 * Check type of gradient
 */
checkTypeGradient()
function checkTypeGradient() {

  let checkRadio = document.querySelectorAll('.check-radio')
  let theLinearField = document.getElementById('theLinearField')
  let theRadialField = document.getElementById('theRadialField')

  for(let i=0; i<checkRadio.length; i++) {

    checkRadio[i].addEventListener('click', function() {
      //Linear
      if(checkRadio[i].id === 'theLinear') {
        theRadialField.style.display = 'none'
        theLinearField.style.display = 'flex'
      }
      //Radial
      if(checkRadio[i].id === 'theRadial') {
        theLinearField.style.display = 'none'
        theRadialField.style.display = 'flex'
      }
    })
  }
}

/**
 *
 * @param {*} event
 */
function validate(event){

  var self = event.target

  self.innerHTML = '<span class="icon-checkmark"></span>Ajouté !'
  self.style.color = '#fff'
  self.style.backgroundColor = '#4CAF50'

  window.setTimeout(function(){
    self.innerHTML = '<span class="icon-plus"></span>Ajouter à ma collection'
    self.style.color = '#666'
    self.style.backgroundColor = '#ddd'
    self.style.opacity = .5
    self.style.pointerEvents = 'none'
    textResult.innerText = ''
  }, 2000)
}

/**
 * Add to collection
 */
addToCollection.addEventListener('click', function(e){

  e.preventDefault

  for(let i=0;i<theValues.length;i++){

    let linearDirection = theValues[0].value
    let radialDirection = theValues[1].value
    let couleur1 = theValues[2].value
    let couleur2 = theValues[3].value
    let hexValue

    if(theLinear.checked === true) {
      hexValue = 'linear-gradient('+linearDirection+', '+couleur1+', '+couleur2+')'
    }

    if(theRadial.checked === true) {
      hexValue = 'radial-gradient('+radialDirection+', '+couleur1+', '+couleur2+')'
    }

    theGradientResult.style.backgroundImage = hexValue
  }

  storeFormValue()
  createItem()
})

/**
 *  Store Form Values
 */
function storeFormValue() {

  //RGV
  let rgbValue = window.getComputedStyle(theGradientResult, null).getPropertyValue('background-image')
  window.localStorage.myRgbColor = rgbValue

  for(let i=0;i<theValues.length;i++){

    let linearDirection = theValues[0].value
    let radialDirection = theValues[1].value
    let couleur1 = theValues[2].value
    let couleur2 = theValues[3].value

    if(theLinear.checked === true) {
      window.localStorage.myHexColor = 'linear-gradient('+linearDirection+', '+couleur1+', '+couleur2+')'
    }

    if(theRadial.checked === true) {
      window.localStorage.myHexColor = 'radial-gradient('+radialDirection+', '+couleur1+', '+couleur2+')'
    }
  }
}

/**
 *  Create item
 */
function createItem(){

  let storedHex = window.localStorage.myHexColor
  let storedRgb = window.localStorage.myRgbColor

  let newItem = document.createElement('div')
  newItem.classList = 'collection-item'
  newItem.addEventListener('click', function(){
    this.classList.toggle('is-focused')
  })

  let newItemColor = document.createElement('div')
  newItemColor.classList = 'item-color'
  newItemColor.style.backgroundImage = storedHex

  let newItemTextHex = document.createElement('div')
  newItemTextHex.classList = 'color-hex'
  newItemTextHex.innerText = storedHex

  let newItemTextRgb = document.createElement('div')
  newItemTextRgb.classList = 'color-rgb'
  newItemTextRgb.innerText = storedRgb

  newItem.appendChild(newItemColor)
  newItem.appendChild(newItemTextHex)
  newItem.appendChild(newItemTextRgb)
  myCollection.appendChild(newItem)

  clearMyCollection.style.display = 'inline-block'

  storeCollection()
}

/**
 * Store collection
 */
function storeCollection(){
  window.localStorage.myCollection = myCollection.innerHTML
}

/**
 * Get collection
 */
function getCollection(){
  let storedCollection = window.localStorage.myCollection
  if(!storedCollection){
    clearMyCollection.style.display = 'none'
    return
  } else {
    myCollection.innerHTML = storedCollection
    clearMyCollection.style.display = 'inline-block'
  }
}
getCollection()

/**
 * Clear collection
 */
function clearCollection() {

  theGradientResult.style.backgroundColor = '#333'
  textResult.innerText = ''

  addToCollection.style.opacity = 0
  addToCollection.style.pointerEvents = 'none'

  localStorage.clear()
  myCollection.innerHTML = ''
  clearMyCollection.style.display = 'none'
}

clearMyCollection.addEventListener('click', clearCollection, false)

