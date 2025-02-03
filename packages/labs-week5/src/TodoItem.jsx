import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

function TodoItem(props) {
    return (
        <li>
            <label className='mr-2' htmlFor={props.id}> 
                <input id={props.id} className="mr-1" type="checkbox" defaultChecked={props.completed} /> 
                {props.name}
            </label>
            <FontAwesomeIcon className="text-gray-600" title="delete" icon={faTrashCan} />
        </li>
    );
}

export default TodoItem;