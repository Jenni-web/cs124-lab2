import './ErrorPopup.css';

export default function ErrorPopup() {
    return <div className={"backdrop"}>
    <div className="modal">
        <p>Please select a list</p>
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