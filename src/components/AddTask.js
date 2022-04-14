import './AddTask.css';
import {useState} from 'react';

export default function AddTask(props) {
    const [text, setText] = useState('')

    function onSubmit (e) {
        e.preventDefault()
        if(props.currentListId==='none') {
            alert('Please add a list and select it.')
            return
        } else if(!text) {
            alert('Please add a task.')
            return
        }
        props.addTask(text)
        setText('')
    }


    return (
        <form className='form' onSubmit={onSubmit}>
            <input type='text'
                   placeholder='todo...'
                   className='input'
                   value={text}
                   aria-label={(text? text : "Add task name")}
                   onChange={(e) => setText(e.target.value)}/>
            <input type='submit'
                   value='Add'
                   aria-label="add new task"
                   className='addBtn'/>
        </form>
    )
}
