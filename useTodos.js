import { useEffect, useReducer } from "react"
import { todoReducer } from "../08-useReducer/todoReducer"


const useTodos = ( ) => {


    const initialState = []

    const init = () => {
        return JSON.parse ( localStorage.getItem('todos') ) || [];
    }

    const [todos, dispatch] = useReducer( todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ));
    },[todos])


    const handleNewTodo = ( todo ) => {
        // se define el caso asignado en el reducer y si inicializa el payload con el valor que se actualizara
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch (action);
    }

    const handleDeleteTodo = ( id ) => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: id
        }
        dispatch (action);
    }

    const handleToggleTodo = ( id ) => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id
        }
        dispatch (action);
    }

    const todosCount = todos.length
    const pendingTodosCount = todos.filter( todos => !todos.done ).length

    return {
        todos,
        handleDeleteTodo,
        handleNewTodo,
        handleToggleTodo,
        todosCount,
        pendingTodosCount
    }
}


export default useTodos
