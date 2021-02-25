import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import ItemAddForm from "../item-add-form/item-add-form";
import ItemStatusFilter from "../item-status-filter/item-status-filter";
import SearchPanel from "../SearchPanel/SearchPanel";
import TodoList from "../TodoList/TodoList";
import "./app.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoData: [
        this.createTodoItem("Drink Coffee"),
        this.createTodoItem("Make Awesome App"),
        this.createTodoItem("Have a lunch"),
      ],
      term: "",
      filter: "all"
    };
  }
  maxId = 1;

  search (arr, word) {
    if (word.length === 0 ) {
      return arr;
    }
    return arr.filter((el) => el.label.toLowerCase().search(word.toLowerCase()) > -1)
  }

  filter (arr, filter) {
    switch (filter) {
      case "all" : return arr;
      case "active" : return arr.filter(el => !el.done);
      case "done" : return arr.filter(el => el.done);
      default : return arr;
    }
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }
  toggleProperty(arr, id, propName) {
    const oldObj = arr.find((elem) => elem.id === id);
    const newObj = { ...oldObj, [propName]: !oldObj[propName] };
    let newArr = [...arr];
    newArr.splice(
      arr.findIndex((elem) => elem.id === id),
      1,
      newObj
    );
    return {
      todoData: newArr,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const arr = todoData.filter((el) => el.id !== id);
      return {
        todoData: arr,
      };
    });
  };
  addItem = (text) => {
    this.setState(({ todoData }) => {
      const arr = [...todoData, this.createTodoItem(text)];
      return {
        todoData: arr,
      };
    });
  };
  onToggleDone = (id) => {
    this.setState(this.toggleProperty(this.state.todoData, id, "done"));
  };

  onToggleImportant = (id) => {
    this.setState(
      this.setState(this.toggleProperty(this.state.todoData, id, "important"))
    );
  };

  onSearchChange = (term) => {
    this.setState({ term });
  }
  onFilterChange = (filter) => {
    this.setState({ filter });
  }
  render() {
    const {todoData, term, filter} = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader todo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}

export default App;
