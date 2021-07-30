import React from "react";
import { toast } from "react-toastify";
import axios from "commons/axios";

// Add Inventory components
class AddInventory extends React.Component {
  //define new item status fields
  state = {
    name: "",
    price: "",
    tags: "",
    image: "",
    status: "available",
  };

  //retrieve target item value and name
  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    //set name and value
    this.setState({
      [name]: value,
    });
  };

  //handles the newly submitted item
  submit = (e) => {
    e.preventDefault();
    const product = { ...this.state };
    axios.post("products", product).then((res) => {
      this.props.close(res.data);
      toast.success("Add Success");
    });
  };

  //JFX
  render() {
    return (
      <div className="inventory">
        {/* header */}
        <p className="title has-text-centered">Inventory</p>
        <form onSubmit={this.submit}>

          <div className="field">
            <div className="control">
              {/* Item Name */}
              <label className="label has-text-left">Item Name</label>
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
              {/* Item Price */}
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
              {/* Item Tag */}
              <label className="label has-text-left">Tags</label>
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
              {/* Item Image */}
              <label className="label has-text-left">Image</label>
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
              {/* Item Availiablity */}
              <label className="label has-text-left">Status</label>
              <div className="select is-fullwidth">
                <select
                  name="status"
                  value={this.state.status}
                  onChange={this.handleChange}
                >
                  {/* dropdown options */}
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

export default AddInventory;
