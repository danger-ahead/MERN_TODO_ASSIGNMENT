import React, { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import {
  getTodos,
  addTodo,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
} from "./API";
import Modal from "react-modal";

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [itemToEdit, setItemToEdit] = useState<ITodo | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUpdateTodoInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (itemToEdit) {
      setItemToEdit({
        ...itemToEdit,
        [e.currentTarget.id]: e.currentTarget.value,
      });
    }
  };

  const fetchTodos = (): void => {
    getTodos()
      .then(({ data: { todos } }: ITodo[] | any) => {
        setTodos(todos);
      })
      .catch((err: Error) => {
        console.log(err);
        setTodos([]);
      });
  };

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault();
    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Todo not saved");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTodoStatus = (todo: ITodo): void => {
    updateTodoStatus(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="App">
      <h1>Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodoStatus}
          deleteTodo={handleDeleteTodo}
          todo={todo}
          openModal={openModal}
          closeModal={closeModal}
          setItemToEdit={setItemToEdit}
        />
      ))}
      <Modal className="style__edit-modal" isOpen={isOpen}>
        <div className="style__edit-modal__header">
          <h1>Todos</h1>
          <button onClick={closeModal} className="style__edit-modal__close-btn">
            <img
              alt="close"
              src="https://img.icons8.com/color/48/delete-sign--v1.png"
            />
          </button>
        </div>
        <form className="Form">
          <div className="Form--input">
            <label htmlFor="name">Name</label>
            <input
              value={itemToEdit?.name}
              onChange={handleUpdateTodoInput}
              type="text"
              id="name"
            />
          </div>
          <div className="Form--input">
            <label htmlFor="description">Description</label>
            <input
              value={itemToEdit?.description}
              onChange={handleUpdateTodoInput}
              type="text"
              id="description"
            />
          </div>
          <button
            onClick={() => {
              if (itemToEdit) {
                handleUpdateTodo({
                  ...itemToEdit,
                  name: itemToEdit.name,
                  description: itemToEdit.description,
                });
              }
              closeModal();
            }}
          >
            Update Todo
          </button>
        </form>
      </Modal>
    </main>
  );
};

export default App;
