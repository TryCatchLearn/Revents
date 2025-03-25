import { useAppDispatch, useAppSelector } from "../stores/store";
import { onSnapshot, DocumentData, doc } from "firebase/firestore";
import { useCallback, useSyncExternalStore } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase";
import { setLoading, setError, setDocuments } from "../firebase/firestoreSlice";
import { convertTimestamps } from "../util/util";

type Options = {
    path: string;
    id?: string;
    listen?: boolean;
}

export const useDocument = <T extends DocumentData>({ path, id, listen = true }: Options) => {
    const dispatch = useAppDispatch();
    const documentData = useAppSelector(state => id 
        ? state.firestore.documents[path]?.[id] as T : undefined);
    const loading = useAppSelector(state => state.firestore.loading);

    const subscribeToDocument = useCallback(() => {
            if (!listen || !id) return () => {}; // no-op
    
            dispatch(setLoading(true));
    
            const docRef = doc(db, path, id);
            
            const unsubscribe = onSnapshot(docRef, (snapshot) => {
                if (!snapshot.exists()) {
                    dispatch(setLoading(false));
                    dispatch(setError("Document does not exist"));
                    toast.error("Document does not exist");
                    return;
                }
                const converted = convertTimestamps(snapshot.data() as T);
                dispatch(setDocuments({path, id, data: {id: snapshot.id, ...converted as T}}))
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
        }, [dispatch, path, listen, id]);
    
        useSyncExternalStore(subscribeToDocument, () => documentData);

        return { data: documentData, loading };
}