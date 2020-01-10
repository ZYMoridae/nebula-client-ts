import Zjax from "../utils/zjax";
import Utils from "../utils/Utils";
import ActionType from "./ActionType";

export const fetchAllTeacherFulfilled = (results: any, totalPages: number, totalElements: number) => {
  return {
    type: ActionType.TEACHER.GET_ALL.FULFILLED,
    fetchAllTeacherPending: false,
    fetchAllTeacherFulfilled: true,
    teachers: results,
    totalPages: totalPages,
    totalElements: totalElements,
    receivedAt: Date.now()
  };
};

export const fetchAllTeacherPending = () => {
  return {
    type: ActionType.TEACHER.GET_ALL.PENDING,
    fetchAllTeacherPending: true,
    fetchAllTeacherFulfilled: false
  };
};

export const fetchAllTeacherError = (error: any) => {
  return {
    type: ActionType.TEACHER.GET_ALL.ERROR,
    fetchAllTeacherPending: false,
    fetchAllTeacherFulfilled: true,
    error: error
  };
};

export const fetchAllTeacher = (
  page: number,
  perPage: number,
  orderBy: string
) => {
  return function(dispatch: any) {
    dispatch(fetchAllTeacherPending());

    let options = {
      method: Zjax.HTTP.METHOD.GET
    };

    Zjax.request({
      url: `/api/teachers?page=${page -
        1}&size=${perPage}&sort=${orderBy}&keyword`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        let userList: any = [];
        Object.keys(response.data._embedded).forEach(key => {
          if (Array.isArray(response.data._embedded[key])) {
            userList = userList.concat(response.data._embedded[key]);
          }
        });

        userList = userList.sort(function(a: any, b: any) {
          return a.id - b.id || a.name.localeCompare(b.name);
        });

        dispatch(
          fetchAllTeacherFulfilled(userList, response.data.page.totalPages, response.data.page.totalElements)
        );
      },
      failureCallback: (error: any) => {
        dispatch(fetchAllTeacherError(error));
      }
    });
  };
};