import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router"
import { LoginSchema, loginSchema } from "../../lib/schemas/loginSchema";
import { useAppDispatch } from "../../lib/stores/store";
import { users } from "../../lib/data/sampleData";
import { signIn } from "./accountSlice";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import TextInput from "../../app/shared/components/TextInput";
import { toast } from "react-toastify";

export default function LoginForm() {
    const navigate = useNavigate();
    const {control, handleSubmit, formState: {isValid}} = useForm({
        resolver: zodResolver(loginSchema),
    })
    const dispatch = useAppDispatch();

    const onSubmit = (data: LoginSchema) => {
        const user = users.find(x => x.email === data.email);
        if (user) {
            dispatch(signIn(user));
            navigate('/events');
        } else {
            toast.error('Invalid email or password');
        }
    }

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
            <div className="card bg-base-100 shadow-lg p-6 w-1/2 gap-6">
                <div className="card-title text-primary justify-center">
                    <LockClosedIcon className="size-10" />
                    <h3 className="text-3xl">Sign in to Re-vents</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <TextInput 
                        label="Email address"
                        control={control}
                        name='email'
                    />
                    <TextInput 
                        label="Password"
                        control={control}
                        name='password'
                        type='password'
                    />
                    <button 
                        className="btn btn-primary w-full"
                        disabled={!isValid}
                        type='submit'
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    )
}