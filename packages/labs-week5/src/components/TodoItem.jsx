import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

function TodoItem(props) {
    return (
        <li>
            <label className='mr-2' htmlFor={props.id}> 
                <input
                    id={props.id}
                    className="mr-1"
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                /> 
                {props.name}
            </label>
            <button onClick={() => props.deleteTask(props.id)}>
                <FontAwesomeIcon className="text-gray-600" title="delete" icon={faTrashCan} />
            </button>
        </li>
    );
}

export default TodoItem;