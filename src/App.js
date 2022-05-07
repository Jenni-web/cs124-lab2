import './index.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskSupplier from './components/TaskSupplier';
import TabList from './components/TabList';
import Verification from './components/Verification';

import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {useCollectionData} from "react-firebase-hooks/firestore";
import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { sendEmailVerification, getAuth, signOut } from "firebase/auth";
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';

// Our web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJOGQftqdeOAdZZK5rf9tDX6kNIqSHK7Y",
    authDomain: "cs124-lab3-4fb9a.firebaseapp.com",
    projectId: "cs124-lab3-4fb9a",
    storageBucket: "cs124-lab3-4fb9a.appspot.com",
    messagingSenderId: "589751471381",
    appId: "1:589751471381:web:98f3927ee0b5a7b2ff2d1c"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();

// const collectionName = "List-AuthenticationRequired";
const collectionName = "List-SharingAllowed";

function App(props) {
    const [user, loading, error] = useAuthState(auth);

    function verifyEmail(user, auth) {
        sendEmailVerification(user);
        signOut(auth);
    }

    if (loading) {
        return <p>Checking...</p>;
    } else if (user) { // if user is signed in
        
        if (!user.emailVerified) {
            console.log("email not verified")
           return <Verification verifyEmail={verifyEmail} auth={auth} user={user}/>

        } else {
            return <div>
            <SignedInApp {...props} user={user}/>
        </div>
        }
        
    } else {
        return <>
            {error && <p className='error-message'>Error App: {error.message}</p>}
            <TabList className='tabs'>
                <SignIn key="Login" className='sign-in'/>
                <SignUp key="Register" className='sign-in'/>
            </TabList>
        </>
    }
}

function SignIn() {
    // SignIn w/ email and password
    const [signInWithEmailAndPassword, user1, loading1, error1] = useSignInWithEmailAndPassword(auth);
    
    // SignIn w/ Google
    const [signInWithGoogle,user2, loading2, error2] = useSignInWithGoogle(auth);
    
    // Keep track of email and passwords for the currently signed in user
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    // Checks to see if there is already a user
    if (user1 || user2) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading1 || loading2) {
        // loading
        return <p>Logging in…</p>
    }

    return <div className='tab-content'>
        <br/>
        {/* error */}
        {error1 && <p className='error-message'>Error logging in: {error1.message}</p>}
        {error2 && <p className='error-message'>Error logging in: {error2.message}</p>}

        {/* email */}
        <div className='form-group'>
            <label htmlFor='signInEmail'>Email adress</label>
            <input type="text" id='signInEmail' className='form-control' placeholder='name@example.com' 
            value={email} onChange={e=>setEmail(e.target.value)}/>
        </div>
        <br/>

        {/* password */}
        <label htmlFor='pw'>Password </label>
        <input type="text" id='pw' className='form-control' placeholder='password' value={pw}
               onChange={e=>setPw(e.target.value)}/>
        <br/>

        {/* sign in with email and pw */}
        <button className='signInEP' onClick={() =>signInWithEmailAndPassword(email, pw)}>
            Email Sign In
        </button>

        <hr/>
        {/* sign in via Google */}
        <button onClick={() => signInWithGoogle()}>
            Google Sign In
        </button>
        <br/>
        <br/>
    </div>
}

function SignUp() {
    // Creates user credentials to sign in
    const [createUserWithEmailAndPassword, userCredential, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    // If they already signed in
    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }


    return <div className='tab-content'>
        <br/>
        {/* If email already exists */}
        {error && <p className='error-message'>Error signing up: {error.message}</p>}

        {/* email */}
        <div className='form-group'>
            <label htmlFor='email'>Email adress</label>
            <input type="text" id='email' className='form-control' placeholder='name@example.com'
            value={email} onChange={e=>setEmail(e.target.value)}/>
        </div>
        <br/>

        {/* password */}
        <label htmlFor='pw'>Password</label>
        <input type="text" id='pw' value={pw} className='form-control'
        placeholder='password' onChange={e=>setPw(e.target.value)}/>
        <br/>

        {/* sign up with email and pw */}
        <button onClick={() => createUserWithEmailAndPassword(email, pw)}>
            Create User
        </button>
        <br/>
        <br/>

    </div>
}

function SignedInApp(props) {
    // const qList = query(collection(db, collectionName), where("owner", "==", props.user.uid));
    const qList = query(collection(db, collectionName), where("sharedWith", "array-contains", props.user.email));

    const [lists, loading, error] = useCollectionData(qList);
    const [currentListId, setCurrentListId] = useState('none')

    const currentListIdExist = lists?.filter(list=> list.id === currentListId)
    if (currentListId !== 'none' && currentListIdExist.length === 0) {
        if (lists.length===0) {
            setCurrentListId('none');
        } else {
            setCurrentListId(lists[0].id);
        }
    }

    // Add List
    function addList(listName) {
        const uniqueId = generateUniqueID();
        // when finish adding the document, then set the currentListId to uniqueId
        setDoc(doc(db, collectionName, uniqueId),
            {
                id: uniqueId,
                owner: props.user.uid,
                sharedWith: [props.user.email],
                text: listName,
                created: serverTimestamp(),
            }).then(() => setCurrentListId(uniqueId));
    }
    
    // Add new people to share a list
    // How to add to sharedWith array??
    function addShareToList(list, shareEmail) {
        list.sharedWith.push(shareEmail)
        updateDoc(doc(db, collectionName, list.id), {sharedWith: list.sharedWith});
    }

    function stopShareOfList(list, deleteEmail) {
        let updatedShare = list.sharedWith
        updatedShare = list.sharedWith.filter(email => email !== deleteEmail)
        updateDoc(doc(db, collectionName, list.id), {sharedWith: updatedShare});
    }
    // Change current list Id
    function changeListId (id) {
        setCurrentListId(id);
    }

    // Rename List
    function renameList(id, value) {
       updateDoc(doc(db, collectionName, id), {text: value});
    }

    // Loading Screen
    if (loading) {
        return "loading..";
    }

    // Error Screen
    if (error) {
        return (
			<p className='error-message'>Error: {JSON.stringify(error)}</p>
		)
    }

    return (
    <div id='container'>
      <Header title='TO DO LIST' user={props.user} auth={auth}/>
      <Sidebar outerContainerId={'container'}
            lists={lists}
            addList={addList}
            addShareToList={addShareToList}
            stopShareOfList={stopShareOfList}
            renameList={renameList}
            changeListId={changeListId}
            currentListId={currentListId}
            db={db} 
            collectionName={collectionName}
            user={props.user}
        />
        <TaskSupplier db={db} currentListId={currentListId} collectionName={collectionName} user={props.user}/>
              
    </div>
  );
}

export default App;