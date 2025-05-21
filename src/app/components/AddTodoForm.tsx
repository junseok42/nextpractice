"use client"

import { useState } from "react"
import { addTodo, Todo } from "../lib/api";

export default function AddTodoForm({onAdd}: {onAdd: (todo:Todo)=> void}) {
    const [text,setText] = useState("");

    const handleSubmit = async (event : React.FormEvent) => {
        event.preventDefault();
        if(!text.trim()) return ;
       
        try{
            // 새 투두 추가 및 부모 컴포넌트 업데이트
            const newTodo = await addTodo({text});
            onAdd(newTodo);
            setText("");
        }catch (error){
            console.error(error);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                type="text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="할 일 입력"
                className="flex-1 px-3 py-2 border rounded"
            />
            <button type="submit" className="flex-none bg-blue-400 text-white px-4 rounded">추가</button>
        </form>
    )
}