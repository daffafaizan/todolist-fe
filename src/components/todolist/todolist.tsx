"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

import Title from "../utils/title";
import TodolistCard from "./todolistcard";
import NewTaskForm from "./forms/newtaskform";
import AnimatedComponents from "../animations/animatedcomponents";

interface Todo {
  id: string;
  title: string;
  content: string;
  priority: string;
  completed: boolean;
}

function Todolist() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/todolist`;
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleGetAllTodo = useCallback(async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        setTodos(data.todolists);
      } else {
        console.log("Todolist fetch failed.");
      }
    } catch (err) {
      console.log("Error during fetch in the database: ", err);
    }
  }, [url]);

  useEffect(() => {
    handleGetAllTodo();
  }, [handleGetAllTodo]);

  const handleAddTodo = async () => {
    try {
      if (title == "") {
        toast.error("Title cannot be empty!");
      } else {
        const response = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title,
            content: content,
            priority: "Low",
            completed: false,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setTodos([...todos, data.todolist]);
          toast.success("Task added!");
        } else {
          console.log("Todolist create failed.");
        }
      }
    } catch (err) {
      console.log("Error during create in the database: ", err);
    }
  };

  const handleEditTodo = async (
    id: string,
    title: string,
    content: string,
    priority: string,
    completed: boolean,
  ) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      let newTitle: string | undefined;
      let newContent: string | undefined;
      if (title == "") {
        if (content == "") {
          newTitle = todo?.title;
          newContent = todo?.content;
        } else {
          newTitle = todo?.title;
          newContent = content;
        }
      } else {
        if (content == "") {
          newTitle = title;
          newContent = todo?.content;
        } else {
          newTitle = title;
          newContent = content;
        }
      }

      const editedTodo = {
        id: id,
        title: newTitle,
        content: newContent,
        priority: priority,
        completed: completed,
      };
      setTodos((prevState: any) =>
        prevState.map((todo: any) =>
          todo["id"] === editedTodo["id"] ? editedTodo : todo,
        ),
      );
      const response = await fetch(`${url}/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          content: content,
          priority: priority,
          completed: completed,
        }),
      });
      if (response.ok) {
        toast.success("Successfully edited todo!");
      } else {
        console.log("Todolist edit failed.");
      }
    } catch (err) {
      console.log("Error during edit in the database: ", err);
    }
  };

  const handleSelectPriority = async (id: string, priority: string) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      const editedTodo = {
        id: id,
        title: todo?.title,
        content: todo?.content,
        priority: priority,
        completed: todo?.completed,
      };
      setTodos((prevState: any) =>
        prevState.map((todo: any) =>
          todo["id"] === editedTodo["id"] ? editedTodo : todo,
        ),
      );
      const response = await fetch(`${url}/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priority: priority,
        }),
      });
      if (response.ok) {
        toast.success(`Task set to ${priority} priority!`);
      } else {
        console.log("Todolist priority change failed.");
      }
    } catch (err) {
      console.log("Error during priority edit in the database: ", err);
    }
  };

  const handleDelete = async (id: string) => {
    const newTodos = todos.filter((todo: any) => todo.id !== id);
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setTodos(newTodos);
        toast.success("Task deleted!");
      } else {
        console.log("Todolist delete failed.");
      }
    } catch (err) {
      console.log("Error during delete in the database: ", err);
    }
  };

  const handleToggleCompleted = async (id: string) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      const editedTodo = {
        id: id,
        title: todo?.title,
        content: todo?.content,
        priority: todo?.priority,
        completed: !todo?.completed,
      };
      setTodos((prevState: any) =>
        prevState.map((todo: any) =>
          todo["id"] === editedTodo["id"] ? editedTodo : todo,
        ),
      );
      const response = await fetch(`${url}/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: editedTodo.completed,
        }),
      });
      if (response.ok && todo?.completed == true) {
        toast.success("Task unfinished!");
      } else if (response.ok && todo?.completed == false) {
        toast.success("Task finished!");
      } else {
        console.log("Todolist completion change failed.");
      }
    } catch (err) {
      console.log("Error during completion edit in the database: ", err);
    }
  };

  return (
    <AnimatedComponents>
      <div
        id="SimpleTodolist"
        className="min-h-screen flex flex-col items-center justify-center py-20"
      >
        <Title>Todo List</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {todos.map((todo) => (
            <TodolistCard
              key={todo.id}
              todo={todo}
              handleEdit={handleEditTodo}
              handleDelete={handleDelete}
              handleToggleCompleted={handleToggleCompleted}
              handleSelectPriority={handleSelectPriority}
            ></TodolistCard>
          ))}
          <NewTaskForm
            ButtonCloseText="Add"
            ButtonText="Add task"
            setTitle={setTitle}
            setContent={setContent}
            handleClick={handleAddTodo}
          />
        </div>
      </div>
    </AnimatedComponents>
  );
}

export default Todolist;
