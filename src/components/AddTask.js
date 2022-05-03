import './AddTask.css';
import {useState} from 'react';

export default function AddTask(props) {
    const [text, setText] = useState('')

    function addTaskName (e) {
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
        <div className='form'>
            <input type='text'
                   placeholder='todo...'
                   className='input'
                   value={text}
                   aria-label={(text? text : "Add task name")}
                   onChange={(e) => setText(e.target.value)}/>
            <button onClick={addTaskName} aria-label="add new task" className="addBtn">Add</button>
        </div>
    )
}
