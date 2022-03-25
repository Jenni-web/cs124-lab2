import './HideButton.css';

export default function HideButton(props) {
    return (
        <button onClick={props.hideTask}
                className='hideBtn'>
            {props.text}
        </button>
    )
}
