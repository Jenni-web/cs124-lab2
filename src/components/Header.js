import './Header.css';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { signOut } from "firebase/auth";

export default function Header (props) {
    return (
        <header className='header'>
            <ListAltIcon id='listIcon'/>
            <h1>{props.title}</h1>
            <>{props.user.email}</>
            <br/>
            <br/>
            <button type="button" onClick={() => signOut(props.auth)} id='signOut'>Sign out</button>
        </header>
    )
}