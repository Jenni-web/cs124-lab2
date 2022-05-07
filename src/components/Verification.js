import './Verification.css';

export default function Verification(props) {
    return <div className="verification-backdrop">
        <div className="verification-modal" aria-modal="true">
            <p>Please verify your email before continuing.</p>
            <button className="verification-button" type="button"
            onClick={() => props.verifyEmail(props.user, props.auth)}>
                Send Email Verification
            </button>
        </div>
    </div>
}