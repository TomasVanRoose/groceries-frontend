import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import ItemForm from './ItemForm';
import ItemList from './ItemList';

class InsertableItemTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
    this.handleNewItem = this.handleNewItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

    const items = props.items.slice();
    items.sort((a, b) => a.position - b.position);

    this.state = {
      items: items
    };
  }

  handleToggle(index) {
    this.setState(state => {
      const items = state.items;
      let copy = [...items];
      let item = {...items[index]};
      item.checked = !item.checked;
      copy[index] = item;

      return {
        items: copy
      };
    });
  }

  handleNewItem(value) {
    this.setState(state => {
      const items = state.items;
      const newItem = {
        id: items.length,
        name: value,
        checked: false,
        position: items.length,
      };
      const newItems = [...items, newItem];

      return {
        items: newItems,
      };
    });
  }

  handleRemoveItem(index) {
    // TODO uptdate sort orders
    this.setState(state => {
      const items = state.items.filter((_, j) => index !== j);
      return {
        items: items
      }
    });
  }

  onDragEnd(result) {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (destination.index === source.index) {
      return;
    }
    const newItems = Array.from(this.state.items);
    const [old] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, old);

    this.setState({items: newItems});
  }

  render() {
    return (
      <div className="uk-section uk-section-default">
        <div className="uk-container uk-container-xsmall">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <ItemForm onSubmitItem={this.handleNewItem} />
          <ItemList items={this.state.items}
                    onToggle={this.handleToggle}
                    onRemove={this.handleRemoveItem} />
        </DragDropContext>
        </div>
      </div>
    );
  }
}
export default InsertableItemTable;
