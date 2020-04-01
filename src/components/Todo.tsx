import React, { useState, useReducer } from "react";

interface Todo {
  id: number;
  title: string;
  complete: boolean;
}

type Actions =
  | { type: "add"; title: string }
  | { type: "delete"; id: number }
  | { type: "complete"; id: number };

interface State {
  todos: Todo[];
  count: number;
}

const initialState: State = {
  todos: [],
  count: 0
};

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        count: state.count + 1,
        todos: [
          ...state.todos,
          { id: state.count, title: action.title, complete: false }
        ]
      };
    case "delete":
      return {
        ...state,
        todos: state.todos.filter(todo => {
          return todo.id !== action.id;
        })
      };
    case "complete":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, complete: true } : todo
        )
      };
  }
};

const Todo: React.FC = () => {
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState<string>("");
  // const [count, setCount] = useState<number>(1);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue((e.target.name = e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setValue("");
  };

  const addTodo = (title: string) => {
    if (title === "") {
      return;
    }

    // USESTATE
    // setCount(count + 1);
    // const newTodos: Todo[] = [...todos, { id: count, title, complete: false }];
    // setTodos(newTodos);
    // console.log(todos);

    // USEREDUCER
    dispatch({ type: "add", title });
  };

  const deleteTodo = (id: number) => {
    // USESTATE
    // let newTodos = todos.filter(todo => {
    //   return todo.id !== id;
    // });

    // setTodos(newTodos);

    // USEREDUCER
    dispatch({ type: "delete", id });
  };

  const setComplete = (id: number) => {
    // USESTATE
    // setTodos(
    //   todos.map(todo => (todo.id === id ? { ...todo, complete: true } : todo))
    // );

    // USEREDUCER
    dispatch({ type: "complete", id });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="value"
          value={value}
          placeholder="todo"
          onChange={e => handleChange(e)}
        />
        <button type="submit" onClick={() => addTodo(value)}>
          Add
        </button>
      </form>
      {state.todos.map(todo => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "50%"
            }}
            key={todo.title}
          >
            <div>{todo.title}</div>
            <div>{todo.complete.toString()}</div>
            <button onClick={() => setComplete(todo.id)}>complete</button>
            <button onClick={() => deleteTodo(todo.id)}>delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Todo;
