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

  // classList.replace('bm-cross-button', 'bm-no-button')
  // document.getElementsByClassName("bm-cross-button").className.replace('bm-cross-button', 'bm-no-button')
  //.replace("bm-cross-button", "bm-no-button")
  
  return (
    <Menu aria-hidden="true">
      {/* {
        showPopup ? (document.getElementsByClassName("bm-cross-button")[0].className = 'bm-cross-button')
         : console.log()
      } */}
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
                      renameList={props.renameList}
                      db={props.db}
                      changeListId={props.changeListId}
                      currentListId={props.currentListId}/>
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

