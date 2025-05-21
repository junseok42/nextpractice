'use client'

import { useEffect, useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import { fetchTodos, Todo } from "./lib/api";

export default function Home() {
  const [todos,setTodos] = useState<Todo[]>([]);
  //처음 컴포넌트 초기화될때 받아오기
  useEffect(() => {
    fetchTodos().then((data)=>{
      setTodos(data);
      console.log("todo 데이터 수집 완료 : ",data);
    }).catch(console.error);
  },[]);
  //Todo state 관리
  const handleAddTodo = (todo : Todo) => {
    setTodos((prev) => [...prev, todo]);
  };

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <AddTodoForm onAdd = {handleAddTodo}/>
      <TodoList todos={todos} setTodos={setTodos} />
    </main>
  );
}