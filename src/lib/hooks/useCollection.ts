import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../stores/store";
import { useCallback, useSyncExternalStore } from "react";
import { db } from "../firebase/firebase";
import { setCollections, setError, setLoading } from "../firebase/firestoreSlice";
import { toast } from "react-toastify";
import { convertTimestamps } from "../util/util";

type Options = {
    path: string;
    listen?: boolean;
}

export const useCollection = <T extends DocumentData>({ path, listen = true }: Options) => {
    const dispatch = useAppDispatch();
    const collectionData = useAppSelector(state => state.firestore.collections[path]) as T[];
    const loading = useAppSelector(state => state.firestore.loading);

    const subscribeToCollection = useCallback(() => {
        if (!listen) return () => {}; // no-op

        dispatch(setLoading(true));

        const colRef = collection(db, path);
        
        const unsubscribe = onSnapshot(colRef, (snapshot) => {
            const data: T[] = [];
            snapshot.forEach((doc) => {
                const converted = convertTimestamps(doc.data() as T);
                data.push({ id: doc.id, ...converted as T});
            });
            dispatch(setCollections({ path, data }));
            dispatch(setLoading(false));
        }, (error) => {
            console.log(error);
            dispatch(setLoading(false));
            dispatch(setError(error.message));
            toast.error(error.message);
        });

        return () => {
            unsubscribe();
        }
    }, [dispatch, path, listen]);

    useSyncExternalStore(subscribeToCollection, () => collectionData);

    return { data: collectionData, loading };
}