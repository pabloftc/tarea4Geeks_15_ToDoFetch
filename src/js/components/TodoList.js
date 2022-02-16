import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

function TodoList() {
	const [todos, setTodos] = useState([]);
	const url = "https://assets.breatheco.de/apis/fake/todos/user/pabloftc";

	async function initAPI(address) {
		let response = await fetch(address, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		});
		response = await response.json();
		let secondResponse = await fetch(address, {
			method: "POST",
			body: JSON.stringify([]),
			headers: { "Content-Type": "application/json" },
		});
		secondResponse = await secondResponse.json();
	}

	useEffect(() => {
		initAPI(url);
	}, []);

	sendGETRequest(url);

	function sendGETRequest(address) {
		fetch(address)
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then((responseAsJson) => console.log(responseAsJson))
			.catch((error) => {
				console.log("Looks like there was a problem: \n", error);
			});
	}

	const updateTodos = (todos) => {
		let requestOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(todos),
		};

		fetch(url, requestOptions)
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	};

	const addTodo = (todo) => {
		if (!todo.label) {
			return;
		}
		const newTodos = [todo, ...todos];

		setTodos(newTodos);
		updateTodos(newTodos);
	};

	const removeTodo = (id) => {
		const removeArr = [...todos].filter((todo) => todo.id !== id);
		setTodos(removeArr);
		updateTodos(removeArr);
	};

	const completeTodo = (id) => {
		let updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.isComplete = !todo.isComplete;
			}
			return todo;
		});
		setTodos(updatedTodos);
		updateTodos(updatedTodos);
	};

	const leftItems = todos.length === 0 || todos.length > 1 ? "items" : "item";

	return (
		<div>
			<h1>To-Do List</h1>
			<TodoForm onSubmit={addTodo} />
			<Todo
				todos={todos}
				completeTodo={completeTodo}
				removeTodo={removeTodo}
			/>
			<p className="left-items">{`There are ${todos.length} ${leftItems} To Do`}</p>
		</div>
	);
}

export default TodoList;
