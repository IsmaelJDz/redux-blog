// export const traerTodos = () => (dispatch) => {
//   dispatch({
//     type:'TRAER_USUARIOS',
//     payload: [1,2,4]
//   })
// }

export const traerTodos = (payload) => ({
  type:'TRAER_USUARIOS',
  payload
})