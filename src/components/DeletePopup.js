import './DeletePopup.css';
import {useCollectionData} from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc, query } from "firebase/firestore";

const collectionName = "List-Collection";
const subCollectionName = "Tasks-Collection";

export default function DeletePopup(props) {
    const qTask = query(collection(props.db, collectionName, props.list.id, subCollectionName))
    const [tasks, loadingtasks, errortasks] = useCollectionData(qTask);

    function deleteList() {
        tasks.forEach(task => deleteDoc(doc(props.db, collectionName, props.list.id, subCollectionName, task.id)));
        deleteDoc(doc(props.db, collectionName, props.list.id))

        // Does not work because currentListId does not get re-rendered in time
        // if (props.lists.length===0) {
        //     props.changeListId('none');
        // } else {
        //     props.changeListId(props.lists[0].id);
        // }

    }

    if (loadingtasks) {
        return <p className = "hide">"loadings Tasks..."</p>
    }
    if (errortasks) {
        return (
            <p>Error: {JSON.stringify(errortasks)}</p>
        )
    }    

    return <div className={"delete-backdrop"}>
        <div className="delete-modal">
            <p>Are you sure want to delete this list?</p>
            <button className={"alert-cancel"} type={"button"}
                    onClick={props.onClose}>
                Cancel
            </button>
            <button className={"alert-confirm"} type={"button"}
                    onClick={deleteList}>
                Yes
            </button>
        </div>
    </div>
}