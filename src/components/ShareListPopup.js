import './ShareListPopup.css';

export default function ShareListPopup(props) {
    return <div className={"sharelist-backdrop"}>
        <div className="sharelist-modal" aria-modal="true">
            {props.children}
            <p>Currently sharing with</p>
            {props.list.sharedWith}
            <button className={"sharelist-close"} type={"button"}
                aria-label="Close share list pop up"
                    onClick={props.onClose}>
                Close
            </button>
        </div>
    </div>
}