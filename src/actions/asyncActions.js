// import axios from "axios";

// export const getUsers = (id, values) => async dispatch => {
//   dispatch(testRequest());
//   try {
//     // const response = await axios.post(routes.taskUrl(id), { task: values });
//     const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/users"
//     );
//     dispatch(testSuccess({ data: response.data }));
//   } catch (e) {
//     // Обязательно выводите ошибку, иначе вы не узнаете что пошло не так при отладке
//     console.log(e);
//     dispatch(testFailure());
//   }
// };
