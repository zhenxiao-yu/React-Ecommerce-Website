import React from 'react';
import { toast } from 'react-toastify';
import axios from 'commons/axios';

// Edit Inventory components
class EditInventory extends React.Component {
  //define inventory item status fields
  state = {
    id: '',
    name: '',
    price: '',
    tags: '',
    image: '',
    status: 'available'
  };


  componentDidMount() {
    //fields
    const { id, name, image, tags, price, status } = this.props.product;
    this.setState({
      id,
      name,
      image,
      tags,
      price,
      status
    });
  }

  //retrieve target item value and name
  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    //set name and value
    this.setState({
      [name]: value
    });
  };

   //handles the newly edited item
  submit = e => {
    e.preventDefault();
    const product = { ...this.state };
    axios.put(`products/${this.state.id}`, product).then(res => {
      //close panel
      this.props.close(res.data);
      toast.success('Item Information Edited');
    });
  };

  //Remove item from product list
  onDelete = () => {
    axios.delete(`products/${this.state.id}`).then(res => {
      this.props.deleteProduct(this.state.id);
      this.props.close();
      toast.success('Edit Success');
    });
  };

  //JFX
  render() {
    return (
      <div className="inventory">
        <p className="title has-text-centered">Inventory</p>
        <form onSubmit={this.submit}>
          <div className="field">
            <div className="control">
              <label className="label has-text-centered">Item Name</label>
              <textarea
                className="textarea"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label has-text-left">Price</label>
              <input
                type="number"
                className="input"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label has-text-centered">Tags</label>
              <input
                type="text"
                className="input"
                name="tags"
                value={this.state.tags}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Image</label>
              <input
                type="text"
                className="input"
                name="image"
                value={this.state.image}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Status</label>
              <div className="select is-fullwidth">
                <select
                  name="status"
                  value={this.state.status}
                  onChange={this.handleChange}
                >
                  <option>available</option>
                  <option>unavailable</option>
                </select>
              </div>
            </div>
          </div>
          <br />
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
            <div className="control">
              <button
                className="button is-danger"
                type="button"
                onClick={this.onDelete}
              >
                Delete
              </button>
            </div>
            <div className="control">
              <button
                className="button"
                type="button"
                onClick={() => {
                  this.props.close();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EditInventory;
