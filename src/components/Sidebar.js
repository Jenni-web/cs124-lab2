//import React from 'react';
import './Sidebar.css';
import {useState} from 'react';
import { slide as Menu } from 'react-burger-menu';
import SidebarItem from './SidebarItem';
import AddListPopup from './AddListPopup';
import AddTaskIcon from '@mui/icons-material/AddTask';
import IconButton from '@mui/material/IconButton';
import AddList from './AddList';


export default function Sidebar(props) {
  const [showAddListPopup, setShowAddListPopup] = useState(false);

  function toggleModal() {
    setShowAddListPopup(!showAddListPopup);
  }
 

  return (
    <Menu aria-hidden="true">
      <div className='List'>
        <div className='add-list'>
          <h2 className='add-list-text'>LISTS</h2>
          <IconButton className='add-list-button' aria-label="open add list pop up" onClick={toggleModal}><AddTaskIcon style={{ fill: '#0072ea' }}/></IconButton>
        </div>

        <ul className={`${(props.lists.length >= 1) ? 'listItems-exist' : 'listItems'} ` } >
          {props.lists?.map((list) => (
                  <SidebarItem
                      key={list.id}
                      list={list}
                      user={props.user}
                      renameList={props.renameList}
                      addShareToList={props.addShareToList}
                      stopShareOfList={props.stopShareOfList}
                      db={props.db}
                      changeListId={props.changeListId}
                      currentListId={props.currentListId}
                      collectionName={props.collectionName}/>
              ))}
        </ul>
      </div>
      
      {showAddListPopup && <AddListPopup onClose={toggleModal} onAdd={props.addList}>
        <div>
          <AddList aria-hidden="true" addList={props.addList}/>
        </div>
      </AddListPopup>}
      
    </Menu>
  )
};

