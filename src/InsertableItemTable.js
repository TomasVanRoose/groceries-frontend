import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import ItemForm from './ItemForm';
import ItemList from './ItemList';
import API from './api';

class InsertableItemTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
    this.handleNewItem = this.handleNewItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
    API.get(`items/`)
      .then(res => {
        const items = res.data;
        this.setState({ items });
      })
  }


  handleToggle(index) {
    const items = this.state.items;
    let item = {...items[index]};
    item.checked_off = !item.checked_off;

    API.put(`items/` + item.id, item);

    this.setState(state => {
      let copy = [...items];
      copy[index] = item;

      return {
        items: copy
      };
    });
  }

  handleEdit(label, index) {
    const items = this.state.items;
    let item = {...items[index]};
    item.name = label;

    API.put(`items/` + item.id, item);

    this.setState(state => {
      let copy = [...items];
      copy[index] = item;

      return {
        items: copy
      };
    });
  }

  handleNewItem(value) {
    const items = this.state.items;
    const newItem = {
      name: value,
      position: items.length,
    };

    API.post(`items/`, newItem)
      .then(res => {
        const item = res.data; 
        this.setState({ items: [...items, item], })
      });

  }

  handleRemoveItem(index) {
    const id = this.state.items[index].id;
    API.delete(`items/` + id)
      .then(res => API.get(`items/`))
      .then(res => {
        const items = res.data;
        this.setState({ items: items });
      });
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
                    onEdit={this.handleEdit}
                    onRemove={this.handleRemoveItem} />
        </DragDropContext>
        </div>
      </div>
    );
  }
}
export default InsertableItemTable;
