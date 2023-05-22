import React from "react";

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (_id: string) => void;
  openModal: () => void;
  closeModal: () => void;
  setItemToEdit: (todo: ITodo) => void;
};

const Todo: React.FC<Props> = ({
  todo,
  updateTodo,
  deleteTodo,
  openModal,
  setItemToEdit,
}) => {
  const checkTodo: string = todo.status ? `line-through` : "";

  const dateTime = new Date(todo.updatedAt ?? "");

  const date = dateTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = dateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="Card">
      <div className="Card--text">
        <h1 className={checkTodo}>
          {todo.name}
          <button
            className="style__edit-btn"
            onClick={() => {
              openModal();
              setItemToEdit(todo);
            }}
          >
            <img
              alt="edit"
              src="https://img.icons8.com/color/48/pencil-tip.png"
            />
          </button>
        </h1>
        <span className={checkTodo}>{todo.description}</span>
        <br></br>
        <span className="style__date-time">
          Last updated:&nbsp;
          {date}&nbsp;
          {time}
        </span>
      </div>
      <div className="Card--button">
        <button
          onClick={() => updateTodo(todo)}
          className={todo.status ? `hide-button` : "Card--button__done"}
        >
          Complete
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className="Card--button__delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
