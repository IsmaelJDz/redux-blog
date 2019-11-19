import axios from "axios";
import { ACTUALIZAR, 
  PUBLICACIONES_ERROR, 
  PUBLICACIONES_CARGANDO, 
  COMENTARIOS_CARGANDO,
  COMENTARIOS_ERROR,
  COMENTARIOS_ACTUALIZAR, 
} from "../types/publicacionesTypes";
  
import * as usuariosTypes from "../types/usuariosTypes";

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = key => async (dispatch, getState) => {

  dispatch({
    type: PUBLICACIONES_CARGANDO
  });

  const { usuarios } = getState().usuariosReducer;
  const { publicaciones } = getState().publicacionesReducer;
  const usuario_id = usuarios[key].id;

  try {
    const respuesta = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`
    );

    const nuevas = respuesta.data.map((publicacion) => (
      {
        ...publicacion,
        comentarios: [],
        abierto: false
      }
    ))
  
    const publicaciones_actualizadas = [...publicaciones, nuevas];
  
    dispatch({
      type: ACTUALIZAR,
      payload: publicaciones_actualizadas
    });
  
    // El -1 es porque la primera vez no hay publicaciones
    // La segunda hay una publicacion y el lenght va a dar 1 resultado, pero se coloca en la casilla [0]
    const publicaciones_key = publicaciones_actualizadas.length - 1;
  
    // todos los usuarios del reducer se añaden a un array y se guardan en la variable usuarios_actualizados
    const usuarios_actualizados = [...usuarios];
  
    // De todos los usuarios bucas por el id = key, va ser igual al objeto de todo lo que tiene el usuario y le añadimos la publicacion key
      usuarios_actualizados[key] = {
        ...usuarios[key],
        publicaciones_key: publicaciones_key
      };
  
    dispatch({
      type: USUARIOS_TRAER_TODOS,
      payload: usuarios_actualizados
    });
  } catch (error) {
    dispatch({
      type: PUBLICACIONES_ERROR,
      payload: "Publicaciones no disponibles."
    })
  }

};

export const abrirCerrar = (publicaciones_key, com_key) => (dispatch, getState) => {
   const { publicaciones } = getState().publicacionesReducer;
   const seleccionada = publicaciones[publicaciones_key][com_key];
   
   const actualizada = {
     ...seleccionada,
     abierto: !seleccionada.abierto
   }

   const publicaciones_actualizadas = [...publicaciones];
   publicaciones_actualizadas[publicaciones_key] = [
     ...publicaciones[publicaciones_key]
   ];
   publicaciones_actualizadas[publicaciones_key][com_key] = actualizada;

   dispatch({
    type: ACTUALIZAR,
    payload: publicaciones_actualizadas
  });

}

export const traerComentarios = (publicaciones_key, com_key) => async (dispatch, getState) => {

  dispatch({
    type: COMENTARIOS_CARGANDO
  });

  const { publicaciones } = getState().publicacionesReducer;
  const seleccionada = publicaciones[publicaciones_key][com_key];

   try {
      const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`);

      const actualizada = {
      ...seleccionada,
      comentarios: respuesta.data
      } 
  
    //Todo lo que publicaciones tiene a la variable publicaciones actualizadas
      const publicaciones_actualizadas = [...publicaciones];
  
    //A las publicaciones actualizadas en la casilla especifica le vamos a poner 
    //Todo lo que tiene, publicaciones originales de esa casilla en especifico
      publicaciones_actualizadas[publicaciones_key] = [
        ...publicaciones[publicaciones_key]
      ];
  
    //Un nivel mas adentro y la otra casilla donde esta esa unica publicacion que se le le dio click
    //La voy a actualizar con mi constante actualizada, en donde ya se cambiaron los comentarios
      publicaciones_actualizadas[publicaciones_key][com_key] = actualizada;
  
      dispatch({
        type: COMENTARIOS_ACTUALIZAR,
        payload: publicaciones_actualizadas
      });
   } catch (error) {
     dispatch({
      type: COMENTARIOS_ERROR,
      payload: "Comentarios no disponibles."
     })
   }

}
