import './Header.css';
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function Header (props) {
    return (
        <header className='header'>
            <ListAltIcon id='listIcon'/>
            <h1>{props.title}</h1>
        </header>
    )
}