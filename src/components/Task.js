import './Task.css'
import PriorityButton from './PriorityButton'
import TaskCompleteBtn from './TaskCompleteBtn'

export default function Task (props) {
    const priorityLabel = props.task.priorityLevel === 1 ? "High Priority" : props.task.priorityLevel === 2 ? "Medium Priority" : "Low Priority"
    return (
        <li className={`individual-task ${props.task.hidden ? 'hidden' : ''}`}>
                <TaskCompleteBtn completedTask={props.completedTask} task={props.task}/>
                <input type='text'
                    className={`lsItem ${props.task.complete ? 'complete' : ''} ` }
                    aria-label={(props.task.complete ? 'completed task ' : 'uncompleted task ') + props.task.text}
                    onChange={(e) => props.renameTask(props.task.id, e.target.value)}
                    value={props.task.text}
                />
                <PriorityButton text={priorityLabel} changePriority={props.changePriority} task={props.task}/>

        </li>
    )
}