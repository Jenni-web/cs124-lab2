import './SidebarItem.css';
import {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import DeletePopup from './DeletePopup';
import ShareListPopup from './ShareListPopup';
import AddSharePeople from './AddSharePeople';

export default function SidebarItem (props) {
	const [showDeletePopup, setShowDeletePopup] = useState(false);
	const [showSharePopup, setShowSharePopup] = useState(false);

	function deleteListToggleModal() {
		setShowDeletePopup(!showDeletePopup);
	}
	function shareListToggleModal() {
		setShowSharePopup(!showSharePopup);
	}

	return (
		<div>
			
			<li className="menu-item">
				<label className='radio-button'>
					<input type="radio" name="sidebar-item" 
						checked = {props.list.id === props.currentListId}
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
				<IconButton onClick={deleteListToggleModal} aria-label="open delete list pop up" className='trash-can'><DeleteIcon style={{ fill: '#0072ea' }}/></IconButton>
				<IconButton onClick={shareListToggleModal} aria-label="open share list pop up" className='share'><ShareIcon style={{ fill: '#0072ea' }}/></IconButton>
			</li>
			<p> </p>
			
			{showDeletePopup && <DeletePopup className='delete-popup' onClose={deleteListToggleModal} list={props.list} db={props.db} collectionName={props.collectionName}>
      			</DeletePopup>}
			{showSharePopup && <ShareListPopup className='share-popup' onClose={shareListToggleModal} list={props.list}>
				<div>
					<AddSharePeople addShareToList={props.addShareToList} list={props.list}/>
				</div>

      			</ShareListPopup>}
			
		</div>
	)
}