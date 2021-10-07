import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddNewUser.module.css';
import ErrorModal from '../UI/ErrorModal';
import { useState } from 'react';

const AddUser = (props) => {
  const [enteredUserName, setEnteredUserName] = useState('');
  const [enteredUserAge, setEnteredUserAge] = useState('');
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    if (enteredUserName.trim().length == 0 || enteredUserAge.trim().length == 0) {
      setError({
        title: 'Invalid Input',
        message: 'Please input valid name and age',
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please input valid age (>0)',
      });
      return;
    }
    setEnteredUserName('');
    setEnteredUserAge('');
    props.onAddUser(enteredUserName, enteredUserAge);
  };

  const usernameChangeHandler = (event) => {
    setEnteredUserName(event.target.value);
  };
  const userageChangeHandler = (event) => {
    setEnteredUserAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor='username'>Username</label>
          <input id='username' type='text' value={enteredUserName} onChange={usernameChangeHandler} />

          <label htmlFor='age'>Age(Years)</label>
          <input id='age' type='number' value={enteredUserAge} onChange={userageChangeHandler} />
          <Button type='submit' onConfirm={errorHandler}>
            Add Username
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
