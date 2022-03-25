import './Task.css'
import { useDoubleTap } from 'use-double-tap';
import PriorityButton from './PriorityButton'

export default function Task (props) {
    const onDoubleTap = useDoubleTap((event) => 
        props.completedTask(props.task.id, props.task.complete)
    ) 
    const priorityLabel = props.task.priorityLevel === 1 ? "High Priority" : props.task.priorityLevel === 2 ? "Medium Priority" : "Low Priority"
    return (
        <li className={`${props.task.hidden ? 'hidden' : ''}`}>
        <input type='text'
            className={`lsItem ${props.task.complete ? 'complete' : ''} ` }
            onChange={(e) => props.renamedTask(props.task.id, e.target.value)}
            {...onDoubleTap}
            value={props.task.text}
        />
        <PriorityButton text={priorityLabel} prioritizedTask={props.prioritizedTask} task={props.task}/>
        </li>
    )
}