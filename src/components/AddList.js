import './AddList.css';
import {useState} from 'react';

export default function AddList(props) {
    const [text, setText] = useState('')

    function onSubmit (e) {
        e.preventDefault()
        if(!text) {
            alert('Please add a list name.')
            return
        }
        props.addList(text)
        setText('')
    }

    return (
        <form className='list-form' onSubmit={onSubmit}>
            <input type='text'
                   placeholder='list name...'
                   className='list-input'
                   aria-label={(text? text : "Add list name")}
                   value={text}
                   onChange={(e) => setText(e.target.value)}/>
            <input type='submit'
                   value='Add'
                   aria-label="add new list"
                   className='addListBtn'/>
        </form>
    )
}
