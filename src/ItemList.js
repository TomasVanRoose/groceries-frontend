import React from 'react';
import ItemRow from './ItemRow';
import { Droppable } from 'react-beautiful-dnd';
 
class ItemList extends React.Component {
  render() {
    const onToggle = this.props.onToggle;
    const onRemove = this.props.onRemove;

    const rows = [];
    this.props.items.forEach((item, index) => {
      rows.push(
        <ItemRow key={item.id}
                 id={item.id}
                 label={item.name}
                 checked={item.checked}
                 index={index} 
                 onToggle={onToggle}
                 onRemove={onRemove} />
      );
    });

    return (
      <Droppable droppableId="drop">
      {(provided) => (
        <table {...provided.droppableProps}
               ref={provided.innerRef}
               className="uk-table uk-table-middle uk-table-divider"
               id="sortable-table">
          <tbody>
            {rows}
            {provided.placeholder}
          </tbody>
        </table>
      )}
      </Droppable>
    );
  }
}
export default ItemList;