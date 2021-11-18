import { getUsers } from '../../api/api';
import { toast } from 'react-toastify'

export const GET_USERS_STARTED = 'GET_USERS_STARTED'
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const GET_USERS_ERROR = 'GET_USERS_ERROR'

export const DELETE_USERS_SUCCESS = 'DELETE_USERS_SUCCESS'
export const DELETE_USERS_STARTED = 'DELETE_USERS_STARTED'
export const DELETE_USERS_ERROR = 'DELETE_USERS_ERROR'

const usersActions = {

    getUsers: () => async (dispatch) => {
        try {
          dispatch({
            type: GET_USERS_STARTED,
          });
          let response = await getUsers()
          dispatch({
            type: GET_USERS_SUCCESS,
            payload: {
                data: response,
              },
          });
        } catch (error) {
          toast.error('ERROR GETTING USERS'+error)
          dispatch({
            type: GET_USERS_ERROR,
          });
        }
    },
    deleteUser: (userID) => async (dispatch) =>{
      try{
        dispatch({
          type: DELETE_USERS_STARTED,
        });
        // await deleteUser(userID);
        dispatch({
          type: DELETE_USERS_SUCCESS,
          payload: {
            message: 'deleted successfully',
          }
        });
      }catch(err){
        dispatch({
          type: DELETE_USERS_ERROR,
        })
      }
    }  
  };

export default usersActions;



