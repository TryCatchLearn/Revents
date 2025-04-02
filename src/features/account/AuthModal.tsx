import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

export default function AuthModal() {
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const modal = document.getElementById('auth-modal') as HTMLDialogElement;
        modal.close();
        navigate(`/${event.currentTarget.id}`);
    }

    return (
        <dialog id="auth-modal" className="modal">
            <div className="modal-box flex flex-col gap-3 justify-center items-center">
                <LockClosedIcon className="h-24 w-24 text-primary" />
                <h3 className="font-bold text-2xl text-primary">You need to be signed in to do that</h3>
                <p className="text-xl">Please login or register to the app</p>
                <div className="divider"></div>
                <div className="flex gap-3 items-center w-full">
                    <button onClick={handleClick} id='login' className="btn btn-primary flex-1">Login</button>
                    <button onClick={handleClick} id='register' className="btn btn-primary flex-1">Register</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}