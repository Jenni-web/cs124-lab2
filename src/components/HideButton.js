import './HideButton.css';

export default function HideButton(props) {
    return (
        <button onClick={props.hideTask}
                className='hideBtn'
                aria-label={props.text + " completed task"}>
            {props.text}
        </button>
    )
}
