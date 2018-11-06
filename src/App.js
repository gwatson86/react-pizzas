import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
const URL = "http://localhost:3000/pizzas"
class App extends Component {
  state = {
    pizzas: [],
    pizza: {}
  }

  componentDidMount() {
    fetch(URL)
    .then(response => response.json())
    .then(pizzas => this.setState({ pizzas }))
  }

  populateEditForm = pizza => {
    this.setState({ pizza })
  }

  changeTopping = event => {
    let topping = event.target.value
    this.setState(prevState => {
      return {pizza: {...prevState.pizza, topping: topping}}
    })
  }

  changeSize = event => {
    let size = event.target.value
    this.setState(prevState => {
      return {pizza: {...prevState.pizza, size: size}}
    })
  }

  changeVegetarian = event => {
    let vegetarian = event.target.value === "Vegetarian"
    this.setState(prevState => {
      return {pizza: {...prevState.pizza, vegetarian: vegetarian}}
    })
  }

  editPizza = pizza => {
    const data = {
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian
    }

    fetch(`${URL}/${pizza.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(pizza => {
      const updatedPizzas = this.state.pizzas.map(p => {
        if (pizza.id === p.id) {
          return pizza;
        } else {
          return p;
        }
      })
      this.setState({
        pizzas: updatedPizzas
      })
    });
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm
          pizza={this.state.pizza}
          editPizza={this.editPizza}
          changeTopping={this.changeTopping}
          changeSize={this.changeSize}
          changeVegetarian={this.changeVegetarian} />
        <PizzaList pizzas={this.state.pizzas} populateEditForm={this.populateEditForm} />
      </Fragment>
    );
  }
}

export default App;
