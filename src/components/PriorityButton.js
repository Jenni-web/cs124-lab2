import "./PriorityButton.css";

export default function PriorityButton(props) {
    const priorityLabel = props.task.priorityLevel === 1 ? "High" : props.task.priorityLevel === 2 ? "Medium" : "Low"
    return (
        <button onClick={(e) => {props.changePriority(props.task.id, props.task.priorityLevel)}} className={`priBtn ${priorityLabel}`}>
            {props.text}
        </button>
    )
}