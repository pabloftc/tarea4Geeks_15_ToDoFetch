import React, { useState } from "react";

function Todo({ todos, completeTodo, removeTodo }) {
	const [edit, setEdit] = useState({
		id: null,
		value: "",
	});

	return todos.map((todo, index) => (
		<div
			className={todo.isComplete ? "todo-row complete" : "todo-row"}
			key={index}>
			<div key={todo.id} onClick={() => completeTodo(todo.id)}>
				{todo.label}
			</div>
			<div className="icon">
				<button
					onClick={() => removeTodo(todo.id)}
					className="delete-icon">
					X
				</button>
			</div>
		</div>
	));
}

export default Todo;
