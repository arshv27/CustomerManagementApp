export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const INC_COUNT = 'INC_COUNT';

export const fetchProfile = () => {
  return async dispatch => {
      try {
        const response = await fetch(
            'https://shop-app-77d6d.firebaseio.com/users/'
        );
      }
      catch(err){
          console.log(err);
          console.log("Could not load profile");
      }
  }
};


export const createProfile = (firstName, lastName, employeeID) => {
    return async dispatch => {
        try {
            console.log("A small step for man, a giant leap for mankind :)")
            // const response = await fetch(
            //     'https://shop-app-77d6d.firebaseio.com/users/'
            // );
        }
        catch(err){
            console.log(err);
            console.log("Could not load profile");
        }
    }
};
