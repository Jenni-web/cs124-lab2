import "./SortButton.css"

export default function SortButton(props) {
    return (
        <button onClick={props.sortedTask} className='sortBtn'>
            {props.text}
        </button>
    )
}
