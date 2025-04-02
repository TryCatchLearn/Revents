import { Navigate } from "react-router";
import { useAppSelector } from "../../lib/stores/store"
import AnimatedOutlet from "./AnimatedOutlet";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { auth } from "../../lib/firebase/firebase";

export default function RequireAuth() {
    const currentUser = useAppSelector(state => state.account.user);
    const hasToasted = useRef(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        auth.authStateReady().then(() => setReady(true));
    }, [])

    useEffect(() => {
        if (!currentUser && !hasToasted.current && ready) {
            toast.error('Enter this area you will not, until login you have');
            hasToasted.current = true;
        }
    }, [currentUser, ready])

    if (!ready) return <div>Getting ready... please wait</div>

    if (!currentUser) {
        return <Navigate to='/login' />
    }

    return (
        <AnimatedOutlet />
    )
}