import { FieldValues, useForm } from "react-hook-form"
import { handleError, timeAgo } from "../../../lib/util/util";
import { useAppSelector } from "../../../lib/stores/store";
import { ArrowsPointingInIcon, ArrowsPointingOutIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router";
import { onChildAdded, push, ref, set } from "firebase/database";
import { fb } from "../../../lib/firebase/firebase";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { ChatComment } from "../../../lib/types";
import clsx from "clsx";

type Props = {
    expandedChat: boolean;
    setExpandedChat: (expanded: boolean) => void;
}

export default function EventDetailedChat({expandedChat, setExpandedChat}: Props) {
    const [comments, setComments] = useState<Map<string, ChatComment>>(new Map());
    const { id } = useParams<{ id: string }>();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const currentUser = useAppSelector(state => state.account.user);
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
        defaultValues: { comment: '' }
    });

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [comments]);

    const onSubmit = async (data: FieldValues) => {
        if (!id || !currentUser) return;
        try {
            const chatRef = ref(fb, `chat/${id}`);
            const newChatRef = push(chatRef);
            await set(newChatRef, {
                displayName: currentUser.displayName,
                photoURL: currentUser?.photoURL || '',
                uid: currentUser.uid,
                text: data.comment,
                date: Date.now()
            })
            reset();
        } catch (error) {
            handleError(error);
        }
    }

    const listenToChat = useCallback(() => {
        if (!id) return () => { };
        const chatRef = ref(fb, `chat/${id}`);
        const unsubscribe = onChildAdded(chatRef, data => {
            const comment = { ...data.val(), id: data.key };
            setComments(prev => new Map(prev).set(comment.id, comment));
        });

        return () => unsubscribe();
    }, [id]);

    useSyncExternalStore(listenToChat, () => comments);

    const commentsArray = useMemo(() => Array.from(comments.values()), [comments]);

    return (
        <div className={clsx("card bg-base-100", {
            'h-[30vh]': !expandedChat,
            'h-[50vh]': expandedChat,
        })}>
            <div className="card-title bg-grad-primary relative">
                Chat about this event
            </div>
            <button 
                onClick={() => setExpandedChat(!expandedChat)}
                className="btn btn-square text-white btn-ghost p-1 absolute right-2"
            >
                {expandedChat ? <ArrowsPointingInIcon /> : <ArrowsPointingOutIcon />}
            </button>
            <div className="card-body overflow-y-auto">
                {commentsArray.map(comment => (
                    <div key={comment.id} className={clsx("chat", {
                        'chat-start': comment.uid !== currentUser?.uid,
                        'chat-end': comment.uid === currentUser?.uid
                    })}>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="user avatar"
                                    src={comment?.photoURL || '/user.png'} />
                            </div>
                        </div>
                        <div className="chat-header">
                            {comment.displayName}
                            <time className="text-xs opacity-50">{timeAgo(comment.date)}</time>
                        </div>
                        <div className="chat-bubble">{comment.text}</div>
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>
            <div className="card-actions w-full p-2">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <input
                        type="text"
                        {...register('comment', { required: true })}
                        placeholder={currentUser ? 'Add your comment...'
                            : 'Please login to add your comment!'}
                        disabled={!currentUser}
                        className='input input-neutral w-full relative focus:outline-1 focus:outline-offset-0'
                    />
                    <button
                        disabled={!currentUser || isSubmitting}
                        type="submit"
                        className="btn btn-primary btn-ghost absolute right-2"
                    >
                        {isSubmitting
                            ? <span className="loading loading-spinner"></span> : (
                                <PaperAirplaneIcon className="h-6 w-6" />
                            )}
                    </button>
                </form>
            </div>
        </div>
    )
}