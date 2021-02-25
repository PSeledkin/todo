import React, { Component } from "react";
import "./SearchPanel.css";
class SearchPanel extends Component {
  state = {
    term: "",
  };
  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  };
  render() {
    return (
      <input
        className="form-control search-input"
        placeholder="search"
        onChange={this.onSearchChange}
        value={this.state.term}
      />
    );
  }
}

export default SearchPanel;
