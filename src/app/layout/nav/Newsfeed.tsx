import { NewspaperIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "../../../lib/stores/store";
import { useCollection } from "../../../lib/hooks/useCollection";
import { CollectionOptions, NewsItem } from "../../../lib/types";
import { Link } from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import NewsToast from "./NewsToast";

export default function NewsFeed() {
    const options: CollectionOptions = useMemo(() => {
        return {
            sort: { attribute: 'created', direction: 'desc' },
            limit: 5
        }
    }, []);

    const currentUser = useAppSelector(state => state.account.user);
    const { data: news } = useCollection<NewsItem>({ 
        path: `profiles/${currentUser?.uid}/newsfeed`,
        collectionOptions: options, 
    });
    const [previousNews, setPreviousNews] = useState<NewsItem[] | null>(null);
    const isInitialLoad = useRef(true);

    useEffect(() => {
        if (isInitialLoad.current) {
            isInitialLoad.current = false;
        } else if (news && previousNews) {
            const newItems = news.filter(item => {
                return !previousNews.some(prevItem => prevItem.id === item.id);
            });
            if (newItems.length > 0) {
                const newEvent = newItems[0];
                toast(<NewsToast item={newEvent} />)
            }
        }
        setPreviousNews(news);
    }, [news, previousNews]);

    return (
        <div className="dropdown dropdown-bottom dropdown-end mr-5">
            <div tabIndex={0} role="button">
                <div className="flex flex-col items-center justify-center text-white">
                    <NewspaperIcon className="h-8 w-8" />
                    <span className="uppercase text-xs">news</span>
                </div>
            </div>
            <ul tabIndex={0} className="dropdown-content list bg-base-100 rounded-box z-1 w-98 p-2 shadow-sm">
                {news?.map(item => {
                    const message = item.status === 'added' ? 'has joined' 
                        : item.status === 'removed' ? 'has left' : 'has created';

                    return (
                        <li className="list-row">
                            <div><img className="size-10 rounded-box" src={item.photoURL} alt='user avatar' /></div>
                            <div>
                                <div>{item.displayName} {message}</div>
                                <div className="text-xs uppercase font-semibold opacity-60">
                                    {item.title}
                                </div>
                            </div>
                            <Link to={`/events/${item.eventId}`} className="btn btn-primary btn-ghost">
                                View
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}