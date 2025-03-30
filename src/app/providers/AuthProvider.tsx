import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../lib/stores/store"
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../lib/firebase/firebase";
import { signIn, signOut } from "../../features/account/accountSlice";
import { handleError } from "../../lib/util/util";
import { doc, getDoc } from "firebase/firestore";
import { setFollowings } from "../../features/profiles/followSlice";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();

    const getFollowingIds = useCallback(async (uid: string) => {
        const followingIdsRef = doc(db, `profiles/${uid}/lookup`, 'followingIds');
        const snapshot = await getDoc(followingIdsRef);
        return snapshot.data()?.ids || [];
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, {
            next: (user) => {
                if (user) {
                    dispatch(signIn(user));
                    getFollowingIds(user.uid).then(ids => dispatch(setFollowings(ids)))
                } else {
                    dispatch(signOut());
                }
            },
            error: (error) => {
                handleError(error)
            },
            complete: () => {}
        })

        return () => {
            unsubscribe();
        }
    }, [dispatch, getFollowingIds]);

    return (
        <>{children}</>
    )
}