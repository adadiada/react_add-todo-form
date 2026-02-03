import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Todo } from './api/types';
import { User } from './api/types';
import { UserInfo } from './components/UserInfo';

export const initialTodos = todosFromServer.map(todo => {
  const user = usersFromServer.find(u => u.id === todo.userId) || null;
  return {
    ...todo,
    user,
  };
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const [title, setTitle] = useState<string>('');
  const [hasTitleError, setHasTitleError] = useState<boolean>(false);

  const [userId, setUserId] = useState<number>(0);
  const [hasUserIdError, setHasUserIdError] = useState<boolean>(false);

  const handeleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handeleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
  };

  const handeleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
      return;
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handeleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handeleTitleChange}
          />

          {hasTitleError ? <span className="error">Please enter a title</span> : null}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handeleUserIdChange}
          >
            {hasUserIdError ? <span className="error">Please choose a user</span> : null}
            <option value="0" disabled>
              Choose a user
            </option>
          </select>
        </div>

        <TodoList todos={todos} />
        <UserInfo user={user} />

        <button
          type="submit"
          data-cy="submitButton">
          Add
        </button>
      </form>
    </div>
  );
};
