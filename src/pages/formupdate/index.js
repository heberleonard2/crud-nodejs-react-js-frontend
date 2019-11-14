import React, { Component } from "react";
import api from "../../services/api";

import "./styles.css";

export default class Product extends Component {
  state = {
    newTitle: "",
    newDescription: "",
    newUrl: "",
    product: []
  };
  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async () => {
    const id = this.props.match.params.id;
    const { data: criarproduto } = await api.get(`/products/${id}`);
    this.setState({ product: criarproduto });
  };
  updatedProducts = async e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    await api.put(`/products/${id}`, {
      title: this.state.newTitle,
      description: this.state.newDescription,
      url: this.state.newUrl
    });
    this.setState({
      //cria uma nova variavel
      //copia todo o conteudo que ja tem dentro dela
      //e adicionar o produto no final

      newTitle: "",
      newDescription: "",
      newUrl: ""
    });

    this.loadProducts();
  };
  render() {
    const { product } = this.state;
    return (
      <div className="product-list">
        <form onSubmit={this.updatedProducts}>
          <textarea
            //pegar o evento, dar um setState preenchendo uma variavel
            //chamada new Product, com o e.target.value que é o conteudo
            //dessa textarea
            onChange={e => this.setState({ newTitle: e.target.value })}
            value={this.state.newTitle}
          />
          <textarea
            onChange={e => this.setState({ newDescription: e.target.value })}
            value={this.state.newDescription}
          />
          <textarea
            onChange={e => this.setState({ newUrl: e.target.value })}
            value={this.state.newUrl}
          />
          <button type="submit">Atualizar</button>
        </form>
        <ul>
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <p>{product.url}</p>
          </article>
        </ul>
      </div>
    );
  }
}
