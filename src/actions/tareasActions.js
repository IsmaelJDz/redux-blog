import axios from "axios";
import {
  TRAER_TODAS,
  CARGANDO,
  ERROR,
  CAMBIO_USUARIO_ID,
  CAMBIO_TITULO,
  TAREA_AGREGADA
} from "../types/tareasTypes";

export const traerTodas = () => async dispatch => {
  dispatch({
    type: CARGANDO
  });

  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    //Normalizacion de la respuesta
    const tareas = {};
    respuesta.data.map(
      tar =>
        (tareas[tar.userId] = {
          ...tareas[tar.userId],
          [tar.id]: {
            ...tar
          }
        })
    );

    dispatch({
      type: TRAER_TODAS,
      payload: tareas
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Información de tareas no disponible."
    });
  }
};

export const cambioUsuarioId = usuario_id => dispatch => {
  dispatch({
    type: CAMBIO_USUARIO_ID,
    payload: usuario_id
  });
};

export const cambioTtitulo = titulo => dispatch => {
  dispatch({
    type: CAMBIO_TITULO,
    payload: titulo
  });
};

export const agregar = nueva_tarea => async dispatch => {
  dispatch({
    type: CARGANDO
  });

  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      nueva_tarea
    );

    console.log(response.data);

    dispatch({
      type: TAREA_AGREGADA
    });
  } catch (error) {
    console.log("error");
  }

  dispatch({
    type: ERROR,
    payload: "Intente más tarde."
  });
};
