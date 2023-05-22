import React, { useState } from "react";

type Props = {
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void;
};

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo>({
    _id: "",
    name: "",
    description: "",
    status: false,
  });

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <>
      <h2>Add Todo</h2>
      <form
        className="Form"
        onSubmit={(e) => {
          saveTodo(e, formData);
          setFormData({
            _id: "",
            name: "",
            description: "",
            status: false,
          });
        }}
      >
        <div className="Form--input">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleForm}
            value={formData ? formData.name : ""}
            type="text"
            id="name"
          />
        </div>
        <div className="Form--input">
          <label htmlFor="description">Description</label>
          <input
            onChange={handleForm}
            value={formData ? formData.description : ""}
            type="text"
            id="description"
          />
        </div>
        <button disabled={formData === undefined ? true : false}>
          Add Todo
        </button>
      </form>
    </>
  );
};

export default AddTodo;
