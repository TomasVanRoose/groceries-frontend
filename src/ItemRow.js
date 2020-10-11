import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

class ItemRow extends React.Component {

  constructor(props) {
    super(props);
    this.valueChanged = this.valueChanged.bind(this);
    this.escFunc = this.escFunc.bind(this);

    this.state = {
      isEditing: false,
      editValue: props.label,
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunc, false);
  }
  
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunc, false);
  }

  toggle() {
    this.props.onToggle(this.props.index);
  }

  valueChanged(event) {
    this.setState({editValue: event.target.value});
  }

  remove() {
    this.props.onRemove(this.props.index);
  }

  edit() {
    if (!this.props.checked) {
      this.setState({isEditing: true});
    }
  }

  save() {
    this.props.onEdit(this.state.editValue, this.props.index);
    this.setState({isEditing: false});
  }

  escFunc(event) {
    if (event.keyCode === 27 && this.state.isEditing) {
      this.setState({isEditing: false});
    }
  }

  render() {
    const itemName = this.props.checked ?
      <p>
        <span className="uk-text-success" uk-icon="icon: check"> </span>
        <s className="uk-text-muted">{this.props.label}</s>
      </p> :
      this.props.label;

    return (
      <Draggable draggableId={String(this.props.id)} index={this.props.index}>
      {(provided) => (
        <tr {...provided.draggableProps}
            ref={provided.innerRef}>
          <td {...provided.dragHandleProps}
              className="table-icon move">
            <span uk-icon="icon: table"></span>
          </td>
          {(this.state.isEditing) ? (
            <td>
              <input className="uk-input" type="text"
                     autoFocus
                     value={this.state.editValue}
                     onChange={this.valueChanged}
                     onKeyPress={event => {
                        if (event.key === 'Enter') {
                          this.save();
                        }
                    }}/>
            </td>
          ) : (
            <td className="pointer" onClick={() => this.toggle()}>
              {itemName}
            </td>
          )}
          {(!this.state.isEditing) ? (
            <td className={(this.props.checked) ? "" : "table-icon pointer"} onClick={() => this.edit()}>
              <span className={(this.props.checked) ? "uk-text-muted" : "uk-text-primary"} uk-icon="icon: pencil"></span>
            </td>
          ) : (
            <td className="table-icon pointer" onClick={() => this.save()}>
              <span className="" uk-icon="icon: check"></span>
            </td>
          )}
          {(!this.state.isEditing) ? (
            <td className={(this.props.checked) ? "" : "table-icon pointer"} onClick={() => this.remove()}>
              <span className={(this.props.checked) ? "uk-text-muted" : "uk-text-danger"} uk-icon="icon: trash"></span>
            </td>
          ) : (
            <td className="table-icon pointer" onClick={() => this.setState({isEditing: false})}>
              <span className="" uk-icon="icon: close"></span>
            </td>
          )}
        </tr>
      )}
      </Draggable>
    );
  }
}
export default ItemRow;
