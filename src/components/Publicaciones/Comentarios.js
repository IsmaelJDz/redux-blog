import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../General/Spinner';
import Fatal from '../General/Fatal';

const Comentarios = ({ comentarios, com_cargando, com_error }) => {

  if(com_error) {
    return <Fatal message={ com_error }/>
  }

  if(com_cargando && !comentarios.length) {
    return <Spinner />
  }

  const ponerComentarios = () => (
    comentarios.map((comentario) => (
      <li key={comentario.id} >
        <b>
          <u>
            { comentario.email }
          </u>
        </b>
        <br />
        { comentario.body }
      </li>
    ))
  )

  return (
    <ul>
      { ponerComentarios() }
    </ul>
  )
}

const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer;

export default connect(mapStateToProps, null)(Comentarios);
