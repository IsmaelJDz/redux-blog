import {
  ACTUALIZAR,
  PUBLICACIONES_CARGANDO,
  PUBLICACIONES_ERROR,
  COMENTARIOS_CARGANDO,
  COMENTARIOS_ERROR,
  COMENTARIOS_ACTUALIZAR,
} from "../types/publicacionesTypes";

const INITIAL_STATE = {
  publicaciones: [],
  cargando: false,
  error: "",
  com_cargando: false,
  com_error: false,
};

export default (state = INITIAL_STATE, action) => {
  //console.log("payload:",action)
  switch (action.type) {
    case ACTUALIZAR:
      return {
        ...state,
        publicaciones: action.payload,
        cargando: false,
        error: ""
      };

    case PUBLICACIONES_CARGANDO:
      return {
        ...state,
        cargando: true
      };

    case PUBLICACIONES_ERROR:
      return {
        ...state,
        error: action.payload,
        cargando: false,
      };

    case COMENTARIOS_ACTUALIZAR:
      return {
        ...state,
        publicaciones: action.payload,
        com_cargando: false,
        com_error: ""
      };

      case COMENTARIOS_CARGANDO:
      return {
        ...state,
        com_cargando: true
      };

    case COMENTARIOS_ERROR:
      return {
        ...state,
        com_error: action.payload,
        com_cargando: false,
      };

    default:
      return state;
  }
};
