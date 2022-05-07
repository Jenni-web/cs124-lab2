import './AddSharePeople.css';
import {useState} from 'react';

export default function AddSharePeople(props){
    const [shareEmail, setShareEmail] = useState('')

    function addShareEmail(e) {
        e.preventDefault()
        if (!shareEmail) {
            alert('Please add an email.')
        }
        props.addShareToList(props.list, shareEmail)
        setShareEmail('')

    }

    return (
        <div className='sharelist-form'>
            <input type='text'
                   placeholder='email address...'
                   className='email-input'
                   aria-label={(shareEmail? shareEmail : "Add email to share to")}
                   value={shareEmail}
                   onChange={(e) => setShareEmail(e.target.value)}/>
            <button onClick={addShareEmail} aria-label="add new email to share" className="shareListBtn">Share</button>
        </div>
    )
}