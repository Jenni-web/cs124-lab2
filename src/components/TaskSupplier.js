import {useState} from 'react';
import AddTask from './AddTask';
import Tasks from './Tasks';
import Footer from './Footer';
import './TaskSupplier.css';

import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {useCollectionData} from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc, query, serverTimestamp, setDoc, orderBy, updateDoc } from "firebase/firestore";

const collectionName = "List-Collection";
const subCollectionName = "Tasks-Collection";

export default function TaskSupplier(props) {

    const [showComplete, setShowComplete] = useState(false);
    const [sortBy, setSortBy] = useState("created");

    const qTask = query(collection(props.db, collectionName, props.currentListId, subCollectionName), orderBy(sortBy))
    const [tasks, loadingTasks, errorTasks] = useCollectionData(qTask);

    // Add task
    function addTask (taskName) {
        const uniqueId = generateUniqueID();
        setDoc(doc(props.db, collectionName, props.currentListId, subCollectionName, uniqueId),
            {
                id: uniqueId,
                text: taskName,
                complete: false,
                priorityLevel: 1,
                created: serverTimestamp(),
            });
    }

    // Delete task
    function deleteCompletedTasks () {

        tasks.forEach(task => task.complete && deleteDoc(doc(props.db, collectionName, props.currentListId, subCollectionName, task.id)));
    }

    // Hide Task
    function hideTask () {
        setShowComplete(!showComplete)
    }

    // Rename Task
    function renameTask (id, value) {
        updateDoc(doc(props.db, collectionName, props.currentListId, subCollectionName, id), {text: value});
    }

    // Complete Task
    function completedTask (id, value) {
        setDoc(doc(props.db, collectionName, props.currentListId, subCollectionName, id), {complete: !value}, {merge: true});
    }

    // Prioritize Task
    function changePriority (id, value) {
        let priority = value
        if (value === 1) {   /* 1 is most urgent, 3 is least urgent*/ 
            priority = 2
        } else if (value === 2) {
            priority = 3
        } else {
            priority = 1
        }
        setDoc(doc(props.db, collectionName, props.currentListId, subCollectionName, id), {priorityLevel : priority}, {merge: true});
    }

    // Sort Task
    function sortedTask() {
        if (sortBy === "text") {
            setSortBy("priorityLevel")
        } else if (sortBy === "priorityLevel") {
            setSortBy("created")
        } else {
            setSortBy("text")
        }
    }

    // Loading Screen
    if (loadingTasks) {
        return "loading Tasks..";
    }

    // Error Screen
    if (errorTasks) {
        return (
        <p>Error: {JSON.stringify(errorTasks)}</p>
		)
    }

    let filteredList = tasks
    if (showComplete) {
        filteredList = tasks.filter(task => !task.complete);
    }

    return (
        <div>
            {
                props.currentListId === 'none' ? 
                (<div className='beginning'>
                    <p> Please add or select a list to start adding tasks! </p>
                </div>)
                : 
                (<div>
                <AddTask addTask={addTask} currentListId={props.currentListId}/>
                <Tasks tasks={filteredList} className='lsItems'
                    completedTask={completedTask}
                    renameTask={renameTask}
                    changePriority={changePriority}
                    currentListId={props.currentListId}/>
                <Footer showComplete={showComplete} 
                sortBy={sortBy} 
                hideTask={hideTask} 
                deleteCompletedTasks={deleteCompletedTasks}
                sortedTask={sortedTask}
                currentListId={props.currentListId}/>
                </div>)
            }
        </div>
    );

}