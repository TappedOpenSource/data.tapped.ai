import { UserModel } from "@/types/user_model";
import { db } from "./firebase";
import { collection, doc, getDoc } from "firebase/firestore";

export async function getUserById(id: string): Promise<UserModel | null> {
    const usersRef = collection(db, 'users');
    const userDoc = doc(usersRef, id);
    const userSnap = await getDoc(userDoc);

    return userSnap.exists() ? userSnap.data() as UserModel : null;
}