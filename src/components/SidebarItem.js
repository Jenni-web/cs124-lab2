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
			{
				showDeletePopup ? 
				(<DeletePopup className='delete-popup' onClose={toggleModal} list={props.list} lists={props.lists} db={props.db} changeListId={props.changeListId}>
      			</DeletePopup>)
				:
				(<div>
					<li className="menu-item">
					<label className='radio-button'>
						<input type="radio" name="sidebar-item"
							onClick={(e) => props.changeListId(props.list.id)}/>
						<span className='checkmark'></span>
					</label>
					<input type='text'
						className='individual-list'
						onChange={(e) => props.renameList(props.list.id, e.target.value)}
						value={props.list.text} 
					/>
					<IconButton onClick={toggleModal} className='trash-can'><DeleteIcon style={{ fill: '#0072ea' }}/></IconButton>
					</li>
					<p> </p>
				</div>)
			}
			
		</div>
	)
}