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
                {props.list.sharedWith.map((email) => (
                <li key={email} className="individual-email">
                    {email}
                    {email !== props.user.email && 
                    <IconButton onClick={() => props.stopShareOfList(props.list, email)}>
                        <DeleteIcon style={{ fill: '#0072ea' }}/>
                    </IconButton>}
                </li>

                )
                )}
            </div>
            <button className={"sharelist-close"} type={"button"}
                aria-label="Close share list pop up"
                    onClick={props.onClose}>
                Close
            </button>
        </div>
    </div>
}