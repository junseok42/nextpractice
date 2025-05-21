// id, done은 optional
export interface Todo {
    id? : string;
    text : string;
    done? : boolean;
}

const API_URL = "http://localhost:3001/todos";

// todo 데이터 받아오기 !
export async function fetchTodos(): Promise<Todo[]> {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error("데이터 불러오기에 실패했습니다.");
    return res.json();
}

//todo 데이터 추가하기. json-server 반환값이 추가한 데이터임을 참고..
export async function addTodo(todo:Todo) {
    const res = await fetch(API_URL, {
        method:"POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(todo),
    });
    if (!res.ok) throw new Error("새 todo를 추가하는데 실패했습니다.....");
    return res.json();
}

//todo 데이터 삭제
export async function deleteTodo(id:string) : Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
        method : 'DELETE',
    });

    if (!res.ok) {
        throw new Error('삭제 실패 . . .');
    } 
}

//완료 여부 변경

export async function changeTodoDone(id:string, done: boolean) : Promise<Todo> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done }),
    });

    if (!res.ok) throw new Error('성공 여부 업데이트 실패!');
    return res.json();
}