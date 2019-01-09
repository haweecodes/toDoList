import React, {Component} from 'react';
import logo from './logo.svg';
// import './App.css';
import {connect} from 'react-redux';
import {addTodo} from './action'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todolist: [],
            value: ''
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleAdd(e) {
        e.preventDefault();
        this.props.dispatch(addTodo(this.state.value))
        if (this.state.value.trim() !== "") {
            this.setState(state => ({
                todolist: state.todolist.concat(this.state.value),
                value: ''
            }))
        }
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    handleDelete = (value) => {
        const filteredItems = this.state.todolist.filter(item => {
            return item !== value
        })
        this.setState({
            todolist: filteredItems,
        })
    }

    render() {
        return (
            <div className="App">
                <main className={'we-container'}>

                        <input className={'we-textBox'} type="text" value={this.state.value}
                               onChange={this.handleChange}/>
                        <button className={'we-button'} onClick={this.handleAdd}>
                            <div className={'we-button-content'}>
                                Add
                            </div>
                        </button>

                        <div className={'we-list-container'}>
                            <List items={this.state.todolist} deleteItem={this.handleDelete}/>
                        </div>


                </main>
            </div>
        );
    }
}

class List extends Component {
    render() {
        return (
            <ul>
                {
                    this.props.items.map((item, index) => (
                        <li key={index}>{index + 1 + '.'} {item} <span
                            onClick={() => this.props.deleteItem(item)}>x</span></li>
                    ))
                }
            </ul>
        )
    }
}

export default connect()(App);
