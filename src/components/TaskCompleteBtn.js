import "./TaskCompleteBtn.css"
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

export default function TaskCompleteBtn(props) {
    return (
        <IconButton className="complete-button" onClick={(e) => props.completedTask(props.task.id, props.task.complete)}>
            {props.task.complete ? <DoneIcon/> : <CloseIcon/>}
        </IconButton>
    )
}