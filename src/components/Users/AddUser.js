import React, { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {

  const userNameref = React.useRef('')
  const userAgeref = React.useRef('')
  const userCollegeref = React.useRef('')
  
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredUsername = userNameref.current.value
    const enteredAge = userAgeref.current.value 
    const enteredCollegeName = userCollegeref.current.value
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0 || enteredCollegeName.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge, enteredCollegeName);
    userNameref.current.value = ''
    userAgeref.current.value = ''
    userCollegeref.current.value = ''
    
  };

  

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={userNameref}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            ref = {userAgeref}
          />
          <label htmlFor="collegename">College Name</label>
          <input
            id="collegename"
            type="text"
            ref = {userCollegeref}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;