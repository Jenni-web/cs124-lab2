import './Tasks.css';
import Task from './Task';

export default function Tasks (props){
    return (
        <div>
            <ul className='lsItems'>
                {props.tasks?.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        completeTask={props.completeTask}
                        renameTask={props.renameTask}
                        changePriority={props.changePriority}/>
                ))}
            </ul>
        </div>
    )
}
