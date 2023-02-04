import { db, auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from '@firebase/auth';
import { doc, setDoc, addDoc, collection, query, where, getDocs, updateDoc, getDoc } from '@firebase/firestore';


export const SignUp = async (values) => {
    const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password);
    const usersRef = await setDoc(doc(db, "users", userCred.user.uid), {
        username: values.username,
        email: values.email,
        location: "Vancouver",
    });
    const userUpdate = await updateProfile(userCred.user, {
        displayName: values.username
    });
}


export const SignIn = async (values) => {
    const result = await signInWithEmailAndPassword(auth, values.email, values.password);
}


export const SignOut = async () => {
    await signOut(auth)
}


export const addCatData = async (cat) => {
    let data;
    try {
        const q = query(collection(db, "cats"), where("breedName", "==", cat.breedName), where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
            data = document.id
        });
        const ref = doc(db, "cats", data);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            const update = updateDoc(ref, {
                count: docSnap.data().count + 1
            });
        } else {
            const catData = {
                uid: auth.currentUser.uid,
                breedName: cat.breedName,
                count: 1,
                catId: cat.id,
            }
            const docRef = await addDoc(collection(db, "cats"), catData);
        }
    }
    catch (error) {
        const catData = {
            uid: auth.currentUser.uid,
            breedName: cat.breedName,
            count: 1,
            catId: cat.id,
        }
        const docRef = await addDoc(collection(db, "cats"), catData);
    }
}

export const fetchCatData = async () => {
    let data = []
    const q = query(collection(db, "cats"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
        data.push({ ...document.data() })
    });
    return data
}


export const fetchCurrentUserData = async () => {
    const ref = doc(db, "users", auth.currentUser.uid)
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        return docSnap.data();
    }
}


export const updateWeatherData = async (weather) => {
    const ref = doc(db, "users", auth.currentUser.uid)
    await updateDoc(ref, {
        location: weather
    });
}