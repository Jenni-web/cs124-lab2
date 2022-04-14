import './AddListPopup.css';

function AddListPopup(props) {
    return <div className={"backdrop"}>
        <div className="modal">
            {props.children}
            <button className={"alert-close"} type={"button"}
                aria-label="Close add list pop up"
                    onClick={props.onClose}>
                Close
            </button>
        </div>
    </div>
}

export default AddListPopup;