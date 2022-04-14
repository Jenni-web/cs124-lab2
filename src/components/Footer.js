import TaskDelButton from './TaskDelButton'
import HideButton from './HideButton'
import SortButton from './SortButton'
import './Footer.css';

export default function Footer(props) {
    const sortLabel = props.sortBy === "text" ? "Sort By: Name" : props.sortBy === "priorityLevel" ? "Sort By: Priority" : "Sort By: Time Created"
    // {props.currentListId == 'none' ? 'hidden' : 'footer'}

    return (
        <footer className='footer'>
            <HideButton text={props.showComplete ? "Show" : "Hide"} hideTask={props.hideTask}/>
            <TaskDelButton text='Delete' deleteCompletedTasks={props.deleteCompletedTasks}/>
            <SortButton text={sortLabel} sortedTask={props.sortedTask}/>
        </footer>
    )
}