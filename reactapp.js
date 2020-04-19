var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

////////////////////////////////////////////////////////////////////////////////// Instructions
////////////////////////////////////////////////////////////////////////////////
function Instructions(props) {

  var titleInstructions = React.createElement(
    "h2",
    { className: "consignes__title" },
    "Consignes"
  );

  var listInstructions = React.createElement(
    "ul",
    { className: "consignes__list" },
    props.instructions.map(function (instruction) {
      return React.createElement(
        "li",
        { key: instruction.id },
        instruction.content
      );
    })
  );

  return React.createElement(
    "div",
    { className: "consignes__content" },
    titleInstructions,
    listInstructions
  );
}

var instructions = [{
  id: 1,
  content: 'Choisir le type linear ou radial.'
}, {
  id: 2,
  content: 'Choisir la direction.'
}, {
  id: 3,
  content: 'Choisir la première couleur.'
}, {
  id: 4,
  content: 'Choisir la seconde couleur.'
}, {
  id: 5,
  content: 'Le rendu visuel apparait, ainsi que la ligne de CSS correspondant.'
}, {
  id: 6,
  content: 'Il est possible d\'ajouter le gradient à votre collection, laquelle est stockée dans le cache du navigateur.'
}, {
  id: 7,
  content: 'Pour supprimer la collection, il suffit d\'appuyer sur le bouton \'Supprimer ma collection.'
}];

function Down() {
  return React.createElement("span", { "class": "icon-arrow-down2" });
}

function Up() {
  return React.createElement("span", { "class": "icon-arrow-up2" });
}

var ToggleInstructions = function (_React$Component) {
  _inherits(ToggleInstructions, _React$Component);

  function ToggleInstructions(props) {
    _classCallCheck(this, ToggleInstructions);

    var _this = _possibleConstructorReturn(this, (ToggleInstructions.__proto__ || Object.getPrototypeOf(ToggleInstructions)).call(this, props));

    _this.state = { isToggleOn: true };
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(ToggleInstructions, [{
    key: "handleClick",
    value: function handleClick() {
      this.setState(function (state) {
        return {
          isToggleOn: !state.isToggleOn
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        {
          className: this.state.isToggleOn ? "consignes" : "consignes is-down"
        },
        React.createElement(Instructions, { instructions: instructions }),
        React.createElement(
          "button",
          {
            type: "button",
            "class": "btn btn-consignes",
            onClick: this.handleClick },
          this.state.isToggleOn ? React.createElement(Down, null) : React.createElement(Up, null)
        )
      );
    }
  }]);

  return ToggleInstructions;
}(React.Component);

ReactDOM.render(React.createElement(ToggleInstructions, null), document.getElementById('instructions'));

////////////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////////////