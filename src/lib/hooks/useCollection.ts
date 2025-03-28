import { DocumentData, onSnapshot } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../stores/store";
import { useCallback, useRef, useSyncExternalStore } from "react";
import { setCollections, setError, setLoading } from "../firebase/firestoreSlice";
import { toast } from "react-toastify";
import { convertTimestamps } from "../util/util";
import { getQuery } from "../firebase/getQuery";

type Options = {
    path: string;
    listen?: boolean;
}

export const useCollection = <T extends DocumentData>({ path, listen = true }: Options) => {
    const dispatch = useAppDispatch();
    const collectionData = useAppSelector(state => state.firestore.collections[path]) as T[];
    const loading = useAppSelector(state => state.firestore.loading);
    const options = useAppSelector(state => state.firestore.options[path]);
    const hasSetLoading = useRef(false);
    const loadedInitial = useRef(false);

    const subscribeToCollection = useCallback(() => {
        if (!listen) return () => {}; // no-op

        if (!hasSetLoading.current) {
            dispatch(setLoading(true));
            hasSetLoading.current = true;
        }
        
        const query = getQuery(path, options);    
        
        const unsubscribe = onSnapshot(query, (snapshot) => {
            const data: T[] = [];
            snapshot.forEach((doc) => {
                const converted = convertTimestamps(doc.data() as T);
                data.push({ id: doc.id, ...converted as T});
            });
            dispatch(setCollections({ path, data }));
            dispatch(setLoading(false));
            loadedInitial.current = true;
        }, (error) => {
            console.log(error);
            dispatch(setLoading(false));
            dispatch(setError(error.message));
            toast.error(error.message);
            loadedInitial.current = true;
        });

        return () => {
            unsubscribe();
        }
    }, [dispatch, path, listen, options]);

    useSyncExternalStore(subscribeToCollection, () => collectionData);

    return { data: collectionData, loading, loadedInitial: loadedInitial.current };
}