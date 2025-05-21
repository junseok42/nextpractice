'use client'

import { changeTodoDone, Todo } from "../lib/api"

export default function TodoItem({
  todo,
  onDelete,
  onChange,
}: {
  todo: Todo;
  onDelete: (id: string) => void;
  onChange: (updated: Todo) => void;
}){
    const handleToggle = async () => {
        try {
            const updated = await changeTodoDone(todo.id!, !todo.done);
            onChange(updated);
        } catch {
            // 예외처리 . . . 
        }
    };

    return (
        <div className="flex justify-between items-center border-blue-100 bg-blue-200 py-2 hover:brightness-75 rounded-xl mb-1">
            <span
            onClick={handleToggle}
            className={`ml-4 cursor-pointer flex-grow ${todo.done ? 'line-through text-gray-400' : ''}`}>
                {todo.text}
            </span>
            <button onClick={() => onDelete(todo.id!)} className="text-red-500 ml-2 mr-4">
                삭제
            </button>
        </div>
    )
}