import './SidebarItem.css';
import {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import DeletePopup from './DeletePopup';

export default function SidebarItem (props) {
	const [showDeletePopup, setShowDeletePopup] = useState(false);

	function toggleModal() {
		setShowDeletePopup(!showDeletePopup);
	}

	return (
		<div>
			
			<li className="menu-item">
				<label className='radio-button'>
					<input type="radio" name="sidebar-item" 
						checked = {props.list.id === props.currentListId? true : false}
						aria-label={(props.list.text? props.list.text : "list")  + " selected"}
						onChange={(e) => props.changeListId(props.list.id)}/>
					<span className='checkmark'></span>
				</label>
				<input type='text'
					className='individual-list'
					aria-label={("list " + (props.list.text? props.list.text : "blank"))}
					onChange={(e) => props.renameList(props.list.id, e.target.value)}
					value={props.list.text} 
				/>
				<IconButton onClick={toggleModal} aria-label="open delete list pop up" className='trash-can'><DeleteIcon style={{ fill: '#0072ea' }}/></IconButton>
			</li>
			<p> </p>
			
			{showDeletePopup && <DeletePopup className='delete-popup' onClose={toggleModal} list={props.list} db={props.db}>
      			</DeletePopup>}
			
		</div>
	)
}