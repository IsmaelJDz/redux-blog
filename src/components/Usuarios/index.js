import React, { Component } from "react";
import { connect } from "react-redux";
import * as usuariosActions from "../../actions/usuariosActions";
import { Spinner } from "../../components/General/Spinner";
import Fatal from "../General/Fatal";
import Tabla from "./Tabla";

class Usuarios extends Component {
  // state = {
  //   usuarios: []
  // };

  componentDidMount() {
    if (!this.props.usuarios.lenght) {
      this.props.traerTodos();
    }
  }

  ponerContenido = () => {
    if (this.props.cargando) {
      return <Spinner />;
    }

    if (this.props.error) {
      return <Fatal message={this.props.error} />;
    }

    return <Tabla />;
  };

  render() {
    return (
      <div>
        <h1>Usuarios</h1>
        {this.ponerContenido()}
      </div>
    );
  }
}

const mapStateToProps = reducers => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);
