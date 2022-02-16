import React, { useState } from "react";
import { nanoid } from "nanoid";

function TodoForm(props) {
	const [input, setInput] = useState("");

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		props.onSubmit({
			id: nanoid(),
			label: input,
			done: false,
		});

		setInput("");
	};

	return (
		<form className="todo-form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Add a todo"
				value={input}
				name="label"
				className="todo-input"
				onChange={handleChange}
			/>
			<button className="todo-button">+</button>
		</form>
	);
}

export default TodoForm;
