import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import "./styles.css";

export default class Main extends Component {
  state = {
    newTitle: "",
    newDescription: "",
    newUrl: "",
    products: []
  };
  //metodo exibido assim que o componente é renderizado
  //em tela
  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async () => {
    const { data: criarproduto } = await api.get("/products");
    this.setState({ products: criarproduto });
  };

  criarProduto = async e => {
    e.preventDefault();
    const { data: criarproduto } = await api.post("/products", {
      title: this.state.newTitle,
      description: this.state.newDescription,
      url: this.state.newUrl
    });
    this.setState({
      //cria uma nova variavel
      //copia todo o conteudo que ja tem dentro dela
      //e adicionar o produto no final

      products: [...this.state.products, criarproduto],

      newTitle: "",
      newDescription: "",
      newUrl: ""
    });
  };
  deleteProducts = async id => {
    await api.delete(`/products/${id}`);
    this.setState({
      products: this.state.products.filter(item => item.id !== id)
    });
    this.loadProducts();
  };

  render() {
    return (
      <div className="product-list">
        <form id="new-post" onSubmit={this.criarProduto}>
          <input
            type="text"
            name="description"
            placeholder="Titulo do post"
            //pegar o evento, dar um setState preenchendo uma variavel
            //chamada new Product, com o e.target.value que é o conteudo
            //dessa textarea
            onChange={e => this.setState({ newTitle: e.target.value })}
            value={this.state.newTitle}
          />
          <input
            type="text"
            name="description"
            placeholder="Descrição do post"
            onChange={e => this.setState({ newDescription: e.target.value })}
            value={this.state.newDescription}
          />
          <input
            type="text"
            name="description"
            placeholder="Url do post"
            onChange={e => this.setState({ newUrl: e.target.value })}
            value={this.state.newUrl}
          />
          <button type="submit">Criar Post</button>
        </form>

        <ul>
          {this.state.products.map(product => (
            <article key={product._id}>
              <strong>{product.title}</strong>
              <p>{product.description}</p>
              <p>{product.url}</p>
              <button onClick={() => this.deleteProducts(product._id)}>
                Deletar
              </button>
              <Link to={`/products/${product._id}`}>Atualizar</Link>
            </article>
          ))}
        </ul>
      </div>
    );
  }
}
