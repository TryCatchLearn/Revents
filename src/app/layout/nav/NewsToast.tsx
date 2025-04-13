import { NewsItem } from "../../../lib/types";

export default function NewsToast({ item }: { item: NewsItem }) {
    const message = item.status === 'added' ? 'has joined'
        : item.status === 'removed' ? 'has left' : 'has created';
    return (
        <div className="flex gap-3 items-center p-2">
            <div className="relative">
                <img 
                    className="size-10 rounded-box aspect-square object-cover" 
                    src={item.photoURL || '/user.png'} 
                    alt="user image" />
            </div>
            <div>
                <div>{item.displayName} {message}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                    {item.title}
                </div>
            </div>
        </div>
    )
}