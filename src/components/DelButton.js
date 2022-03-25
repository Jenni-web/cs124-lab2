import './DelButton.css';

export default function DelButton(props) {
    return (
        <button onClick={props.deleteCompletedTask} className='dltBtn'>
            {props.text}
        </button>
    )
}
