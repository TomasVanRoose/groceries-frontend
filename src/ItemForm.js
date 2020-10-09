import React from 'react';

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.onSubmitItem(this.state.value);
    this.setState({value: ''});
    event.preventDefault();
  }

  render() {
    return (
      <form className="uk-grid"
            onSubmit={this.handleSubmit}>
        <div className="uk-width-1-2">
          <input className="uk-input" type="text"
                placeholder="Tomaten, bloem, etc" 
                value={this.state.value}
                onChange={this.handleChange} />
        </div>
        <div className="uk-width-1-2">
          <button className="uk-button uk-button-primary">Voeg toe</button>
        </div>
      </form>
      );
  }
}
export default ItemForm;
