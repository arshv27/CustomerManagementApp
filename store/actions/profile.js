export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const INC_COUNT = 'INC_COUNT';
export const CREATE_PROFILE ='CREATE_PROFILE';

export const fetchProfile = () => {
  return async (dispatch, getState) => {
      const token = getState().auth.token;
      const userId = getState().auth.userId;

      try {
          const response = await fetch(
              `https://shop-app-77d6d.firebaseio.com/profiles/${userId}.json?auth=${token}`
          );

          if (!response.ok) {
              throw new Error('Something went wrong!');
          }
          const resData = await response.json();

          for(const key in resData){
              dispatch({
                  type : CREATE_PROFILE,
                  profileData: {
                      firstName : resData[key]["firstName"],
                      lastName : resData[key]["lastName"],
                      employeeID : resData[key]["employeeID"],
                      tripCount : resData[key]["trip_count"],
                      firebase_id : key
                  }
              });
              console.log(key);
          }
      }
      catch(err){

          throw err;
      }
  }
};

export const updateProfile = (firstName, lastName, employeeID) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const firebase_id = getState().profile.firebase_id;
        const response = await fetch(
            `https://shop-app-77d6d.firebaseio.com/profiles/${userId}/${firebase_id}.json?auth=${token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    employeeID
                })
            }
        );

        const resData = await response.json();

        dispatch({
            type : UPDATE_PROFILE,
            profileData: {
                firstName,
                lastName,
                employeeID
            }
        });
    };
};

export const createProfile = (firstName, lastName, employeeID) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const trip_count = 0;
        const response = await fetch(
            `https://shop-app-77d6d.firebaseio.com/profiles/${userId}.json?auth=${token}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    employeeID,
                    trip_count,
                })

            }
        );

        const resData = await response.json();
        console.log(resData);

        dispatch({
            type : CREATE_PROFILE,
            profileData: {
                firstName,
                lastName,
                employeeID,
                trip_count,
                firebase_id : resData.name
            }
        });
    };
};
