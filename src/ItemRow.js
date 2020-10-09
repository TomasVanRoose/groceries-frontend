import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

class ItemRow extends React.Component {
  
  toggle() {
    this.props.onToggle(this.props.index);
  }

  remove() {
    this.props.onRemove(this.props.index);
  }

  edit() {
  }

  render() {
    const itemName = this.props.checked ?
      <p>
        <span className="uk-text-success" uk-icon="icon: check"></span>
        <s> {this.props.label}</s>
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
          <td className="pointer" onClick={() => this.toggle()}>
            {itemName}
          </td>
          <td className="table-icon pointer" onClick={() => this.edit()}>
            <span className="uk-text-primary" uk-icon="icon: pencil"></span>
          </td>
          <td className="table-icon pointer" onClick={() => this.remove()}>
            <span className="uk-text-danger" uk-icon="icon: trash"></span>
          </td>
        </tr>
      )}
      </Draggable>
    );
  }
}
export default ItemRow;
