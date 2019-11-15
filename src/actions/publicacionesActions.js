import { TRAER_POR_USUARIO } from "../types/publicacionesTypes";
import * as usuariosTypes from "../types/usuariosTypes";

import axios from "axios";

export const traerPorUsuario = id => async (dispatch, getState) => {
  const { usuarios } = getState().usuariosReducer;
  const { publicaciones } = getState().publicacionesReducer;
  const usuario_id = usuarios[id].id;

  const respuesta = await axios.get(
    `http://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`
  );

  const publicaciones_actualizadas = [...publicaciones, respuesta.data];

  // El -1 es porque la primera vez no hay publicaciones
  // La segunda hay una publicacion y el lenght va a dar 1 resultado, pero se coloca en la casilla [0]
  const publicaciones_key = publicaciones_actualizadas.length - 1;

  // todos los usuarios del reducer se añaden a un array y se guardan en la variable usuarios_actualizados
  const usuarios_actualizados = [...usuarios];

  // De todos los usuarios bucas por el id = key, va ser igual al objeto de todo lo que tiene el usuario y le añadimos la publicacion key
  usuarios_actualizados[id] = {
    ...usuarios[id],
    publicaciones_key
  };

  dispatch({
    type: TRAER_POR_USUARIO,
    payload: publicaciones_actualizadas
  });
};
