import React, { Component } from "react";
import { connect } from "react-redux";

class Guardar extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Guardar Tarea</h1>
        Usuario id:
        <input type="number" value={this.props.usuario_id} />
        <br />
        <br />
        Titulo:
        <input value={this.props.titulo} />
        <br />
        <br />
        <button>Guardar</button>
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, null)(Guardar);
