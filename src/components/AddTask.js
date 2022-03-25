import './AddTask.css';
import {useState} from 'react'

export default function AddTask(props) {
    const [text, setText] = useState('')

    function onSubmit (e) {
        e.preventDefault()
        if(!text) {
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
                   onChange={(e) => setText(e.target.value)}/>
            <input type='submit'
                   value='Add'
                   className='addBtn'/>
        </form>
    )
}
