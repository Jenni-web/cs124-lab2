import './index.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskSupplier from './components/TaskSupplier';
import TabList from './components/TabList';

import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {useCollectionData} from "react-firebase-hooks/firestore";
import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { getAuth, sendEmailVerification, signOut } from "firebase/auth";
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

const collectionName = "List-Collection";

function App(props) {
    const [user, loading, error] = useAuthState(auth);
//     function verifyEmail() {
//         sendEmailVerification(user);
//     }
    
    if (loading) {
        return <p>Checking...</p>;
    } else if (user) {
        return <div>
            {user.email}
            {/* {user.displayName || user.email} */}
            <SignedInApp {...props} user={user}/>
            <button type="button" onClick={() => signOut(auth)}>Sign out</button>
            {/* {!user.emailVerified && <button type="button" onClick={verifyEmail}>Verify email</button>} */}
        </div>
    } else {
        return <>
            {error && <p>Error App: {error.message}</p>}
            <TabList>
                <SignIn key="Sign In"/>
                {/* <SignUp key="Sign Up"/> */}
            </TabList>
        </>
    }
}

function SignIn() {
    const [
        signInWithEmailAndPassword,
        user1, loading1, error1
    ] = useSignInWithEmailAndPassword(auth);
    const [
        signInWithGoogle,
        user2, loading2, error2
    ] = useSignInWithGoogle(auth);
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    if (user1 || user2) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading1 || loading2) {
        return <p>Logging in…</p>
    }
    return <div>
        {error1 && <p>"Error logging in: " {error1.message}</p>}
        {error2 && <p>"Error logging in: " {error2.message}</p>}

        {/* email */}
        <label htmlFor='email'>email: </label>
        <input type="text" id='email' value={email}
               onChange={e=>setEmail(e.target.value)}/>
        <br/>
        {/* password */}
        <label htmlFor='pw'>pw: </label>
        <input type="text" id='pw' value={pw}
               onChange={e=>setPw(e.target.value)}/>
        <br/>
        {/* sign in with email and pw */}
        <button onClick={() =>signInWithEmailAndPassword(email, pw)}>
            Sign in with email/pw
        </button>

        <hr/>
        {/* sign in via Google */}
        <button onClick={() => signInWithGoogle()}>
            Sign in with Google
        </button>

    </div>


}

// function SignUp() {
//     const [
//         createUserWithEmailAndPassword,
//         userCredential, loading, error
//     ] = useCreateUserWithEmailAndPassword(auth);
//     const [email, setEmail] = useState("");
//     const [pw, setPw] = useState("");

//     if (userCredential) {
//         // Shouldn't happen because App should see that
//         // we are signed in.
//         return <div>Unexpectedly signed in already</div>
//     } else if (loading) {
//         return <p>Signing up…</p>
//     }
//     return <div>
//         {error && <p>"Error signing up: " {error.message}</p>}
//         <label htmlFor='email'>email: </label>
//         <input type="text" id='email' value={email}
//                onChange={e=>setEmail(e.target.value)}/>
//         <br/>
//         <label htmlFor='pw'>pw: </label>
//         <input type="text" id='pw' value={pw}
//                onChange={e=>setPw(e.target.value)}/>
//         <br/>
//         <button onClick={() =>
//             createUserWithEmailAndPassword(email, pw)}>
//             Create test user
//         </button>

//     </div>
// }

function SignedInApp(props) {
    const qList = query(collection(db, collectionName), where("owner", "==", props.user.uid));
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
                owner: pRoomPreferencesSharp.user.uid,
                text: listName,
                created: serverTimestamp(),
            }).then(() => setCurrentListId(uniqueId));
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
			<p>Error: {JSON.stringify(error)}</p>
		)
    }

    return (
    <div id='container'>
      <Header title='TO DO LIST'/>
      <Sidebar outerContainerId={'container'}
            lists={lists}
            addList={addList}
            renameList={renameList}
            changeListId={changeListId}
            currentListId={currentListId}
            db={db} 
        />
        <TaskSupplier db={db} currentListId={currentListId}/>
              
    </div>
  );
}

export default App;