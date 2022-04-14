// import './ListDelButton.css';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function ListDelButton(props) {
    return (
        <IconButton onClick={(e) => {props.deleteList(props.list.id)}}>
            <DeleteIcon style={{ fill: '#0072ea' }}/>
        </IconButton>
    )
}
