import React from "react";
import { connect } from "react-redux";

const Tabla = props => {
  console.log(props);
  const ponerFilas = () =>
    props.usuarios.map(usuario => (
      <tr key={usuario.id}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
      </tr>
    ));

  return (
    <div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>

        <tbody>{ponerFilas()}</tbody>
      </table>
    </div>
  );
};

const MapStateToProps = reducers => {
  return reducers.usuariosReducer;
};

export default connect(MapStateToProps, null)(Tabla);
