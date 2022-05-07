import './ShareListPopup.css';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function ShareListPopup(props) {
    return <div className={"sharelist-backdrop"}>
        <div className="sharelist-modal" aria-modal="true">
            {props.children}
            <div className="sharelist">
                <hr/>
                <p style={{ margin: '3px', color: 'white' }}>Currently sharing with</p>
                <ul className="email-group">
                    {props.list.sharedWith.map((email) => (
                    <li key={email} className="email-individual">
                        {email}
                        {email !== props.user.email && 
                        <IconButton onClick={() => props.stopShareOfList(props.list, email)}>
                            <DeleteIcon style={{ fill: '#0072ea' }}/>
                        </IconButton>}
                    </li>

                    )
                    )}
                </ul>
            </div>
            <button className={"sharelist-close"} type={"button"}
                aria-label="Close share list pop up"
                    onClick={props.onClose}>
                Close
            </button>
        </div>
    </div>
}