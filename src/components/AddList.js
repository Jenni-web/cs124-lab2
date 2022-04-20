import './AddList.css';
import {useState} from 'react';

export default function AddList(props) {
    const [text, setText] = useState('')

    function addListName (e) {
        e.preventDefault()
        if(!text) {
            alert('Please add a list name.')
            return
        }
        props.addList(text)
        setText('')
    }

    return (
        <div className='list-form'>
            <input type='text'
                   placeholder='list name...'
                   className='list-input'
                   aria-label={(text? text : "Add list name")}
                   value={text}
                   onChange={(e) => setText(e.target.value)}/>
            <button onClick={addListName} aria-label="add new list" className="addListBtn">Add</button>
        </div>
    )
}
