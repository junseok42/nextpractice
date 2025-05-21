'use client';

import TodoItem from './TodoItem';
import { Todo,deleteTodo } from '../lib/api';

export default function TodoList({
        todos,
        setTodos,
    }: { // setTodos 받아와서 state 변화시키기 . . .
        todos: Todo[];
        setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}) {
  // 삭제하고 업데이트
  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id)); //id랑 다른거만 보여주기(db 업데이트 전에)
    } catch {
      alert('삭제 실패');
    }
  };
  // Todo done 여부 업데이트하기
  const handleToggle = (updated: Todo) => {
    setTodos(todos.map(todo => (todo.id === updated.id ? updated : todo)));
  };
  // 매번 update가 일어날 때마다 db 값을 받아서 반영 할수도 있으나 . . . 처음엔 그렇게 만듬.
  // 성능 측면에서 안좋다고 합니다.
  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onChange={handleToggle}
        />
      ))}
    </div>
  );
}
