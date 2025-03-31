import { AcademicCapIcon, CalendarDaysIcon, RocketLaunchIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { useEffect, useState } from "react"
import {Calendar} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAppDispatch, useAppSelector } from "../../../lib/stores/store";
import { QueryOptions } from "../../../lib/types";
import { setCollectionOptions } from "../../../lib/firebase/firestoreSlice";

type Props = {
    setFilter: (filter: {query: string, startDate: string}) => void;
    filter: {query: string, startDate: string};
}

export default function EventFilters({setFilter, filter}: Props) {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(state => state.account.user);
    const [calendarViewDate, setCalendarViewDate] = useState(new Date());

    useEffect(() => {
        setCalendarViewDate(new Date(filter.startDate))
    }, [filter.startDate])

    const items = [
        {key: 'all', label: 'All Events', icon: CalendarDaysIcon},
        {key: 'going', label: "I'm going", icon: RocketLaunchIcon},
        {key: 'hosting', label: "I'm hosting", icon: AcademicCapIcon},
    ];

    const handleFilterChange = ({query, startDate}: {query?: string, startDate?: string}) => {
        if (!currentUser) return;

        const q: QueryOptions[] = [
            {attribute: 'date', operator: '>=', value: startDate 
                || new Date().toISOString(), isDate: true}
        ];

        if (query === 'going') {
            q.push({attribute: 'attendeeIds', operator: 'array-contains', value: currentUser.uid})
        } else if (query === 'hosting') {
            q.push({attribute: 'hostUid', operator: '==', value: currentUser.uid})
        }

        dispatch(setCollectionOptions({
            options: {
                queries: q,
                sort: {attribute: 'date', direction: 'asc'},
                pageNumber: 1,
            },
            path: 'events'
        }))
        setFilter({...filter, query: query || 'all', 
            startDate: startDate || new Date().toISOString()})
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="card bg-base-100 w-full rounded-lg">
                <div className="card-title font-semibold bg-grad-primary">
                    Event filters
                </div>
                <ul className="list space-y-2 py-2">
                    {items.map(({key, label, icon: Icon}) => (
                        <li 
                            onClick={() => handleFilterChange({query: key})}
                            key={key}
                            className={clsx("list-row w-full items-center py-2 hover:bg-primary/20 cursor-pointer", {
                                'text-primary font-bold': filter.query === key
                            })}
                        >
                            <Icon className="w-10 h-10" />
                            <span className="text-lg">{label}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="card bg-base-100 w-full rounded-lg">
                <div className="card-title bg-grad-primary">Start date</div>
                <Calendar 
                    value={new Date(filter.startDate)}
                    activeStartDate={calendarViewDate}
                    onActiveStartDateChange={({activeStartDate}) => 
                        setCalendarViewDate(activeStartDate as Date)}
                    onChange={(value) => {
                        handleFilterChange({startDate: (value as Date).toISOString()})
                    }}
                />
            </div>
        </div>
    )
}