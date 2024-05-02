import React, { useEffect } from "react";
import useAddTodo from "../hooks/useAddTask";
import { IoTrashBin } from "react-icons/io5";
import { toast } from "react-toastify";
import useDeleteTask from "../hooks/useDeleteTasks";

const Todo = () => {
  const { setTodo, getTodos, getMyTasks } = useAddTodo();
  const { deleteTodo } = useDeleteTask();
  const [input, setInput] = React.useState("");

  const handleAddTask = async () => {
    if (!input.trim()) {
      toast.error("Please enter a task!", { position: "top-right" });
      return;
    }

    await setTodo(input);
    setInput("");
    getMyTasks();
  };

  useEffect(() => {
    getMyTasks();
  }, [deleteTodo]);

  const todos = getTodos || [];

  return (
    <div className="mx-auto w-[90%]">
      <div className="flex justify-center mt-10">
        <h1 className="font-bold text-xl">Task Management App</h1>
      </div>
      <div>
        <div className="flex gap-2 justify-center mb-4">
          <label htmlFor="">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              name="Todos"
              id=""
              className="p-2 mt-2 bg-slate-700 rounded-md mr-1 w-[70%] outline-none focus:border-2 focus:border-blue-500"
            />
            <button
              className="bg-blue-500 p-2 rounded-md hover:bg-blue-600 active:bg-blue-800"
              onClick={handleAddTask}
            >
              Add Task
            </button>
          </label>
        </div>
      </div>
      <div className="mx-auto bg-slate-600 flex flex-wrap justify-center p-4 rounded-md mt-2 w-[70%]">
        {getTodos?.map((todo, index) => (
          <div
            key={index}
            className="flex justify-between bg-slate-800 p-4 rounded-md m-2 w-[30%]"
          >
            <div>{todo.taskText}</div>
            <IoTrashBin
              className="mt-1 hover:text-red-600 cursor-pointer text-xl active:text-red-800"
              onClick={() => deleteTodo(todo.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
