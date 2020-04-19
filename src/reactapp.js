////////////////////////////////////////////////////////////////////////////////// Instructions
////////////////////////////////////////////////////////////////////////////////
function Instructions(props) {

  const titleInstructions = (
    <h2 className="consignes__title">Consignes</h2> 
  );

  const listInstructions = (
    <ul className="consignes__list">
      {props.instructions.map(instruction => (
        <li key={instruction.id}>{instruction.content}</li>
      ))}
    </ul>
  );

  return (
    <div className="consignes__content">
      {titleInstructions}
      {listInstructions}
    </div>
  );
}

const instructions = [
  {
    id: 1,
    content: 'Choisir le type linear ou radial.'
  },
  {
    id: 2,
    content: 'Choisir la direction.'
  },
  {
    id: 3,
    content: 'Choisir la première couleur.'
  },
  {
    id: 4,
    content: 'Choisir la seconde couleur.'
  },
  {
    id: 5,
    content: 'Le rendu visuel apparait, ainsi que la ligne de CSS correspondant.'
  },
  {
    id: 6,
    content: 'Il est possible d\'ajouter le gradient à votre collection, laquelle est stockée dans le cache du navigateur.'
  },
  {
    id: 7,
    content: 'Pour supprimer la collection, il suffit d\'appuyer sur le bouton \'Supprimer ma collection.'
  }
]

function Down() {
  return <span class="icon-arrow-down2"></span>
}

function Up() {
  return <span class="icon-arrow-up2"></span>
}

class ToggleInstructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <div
          className={
            this.state.isToggleOn
              ? "consignes"
              : "consignes is-down"
          }
        >
          <Instructions instructions={instructions} />
          <button  
            type="button" 
            class="btn btn-consignes" 
            onClick={this.handleClick}>
          {this.state.isToggleOn ? (
              <Down />
          ) : (
              <Up />
          )}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <ToggleInstructions />, 
  document.getElementById('instructions')
);

////////////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////////////