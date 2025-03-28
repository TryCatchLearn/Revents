import clsx from "clsx"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { AppEvent, CollectionOptions, Profile } from "../../lib/types"
import { useAppDispatch } from "../../lib/stores/store";
import { setCollectionOptions } from "../../lib/firebase/firestoreSlice";
import { useCollection } from "../../lib/hooks/useCollection";
import { formatDateTime } from "../../lib/util/util";

export default function ProfileEvents({ profile }: { profile: Profile }) {
  const [selectedTab, setSelectedTab] = useState('future');
  const { data: events } = useCollection<AppEvent>({ path: 'events' });
  const dispatch = useAppDispatch();

  const tabs = [
    { id: 'future', label: 'Future Events' },
    { id: 'past', label: 'Past Events' },
    { id: 'hosting', label: 'Hosting' }
  ]

  useEffect(() => {
    const optionsMap: Record<string, CollectionOptions> = {
      past: {
        queries: [
          { attribute: 'attendeeIds', operator: 'array-contains', value: profile.id },
          { attribute: 'date', operator: '<=', value: new Date().toISOString(), isDate: true },
        ],
        sort: { attribute: 'date', direction: 'desc' }
      },
      hosting: {
        queries: [
          { attribute: 'hostUid', operator: '==', value: profile.id },
        ],
        sort: { attribute: 'date', direction: 'asc' }
      },
      future: {
        queries: [
          { attribute: 'attendeeIds', operator: 'array-contains', value: profile.id },
          { attribute: 'date', operator: '>=', value: new Date().toISOString(), isDate: true },
        ],
        sort: { attribute: 'date', direction: 'asc' }
      },
    }

    dispatch(setCollectionOptions({ path: 'events', options: optionsMap[selectedTab] }))
  }, [dispatch, profile.id, selectedTab])

  return (
    <div className="flex w-full flex-col h-[64vh]">
      <div className="tabs tabs-border">
        {tabs.map(tab => (
          <a
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={clsx('tab', {
              'tab-active': selectedTab === tab.id
            })}
          >
            {tab.label}
          </a>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 mt-3 overflow-y-auto">
        {events?.map(event => (
          <Link to='/events' key={event.id} className="card bg-base-100 shadow-sm text-white">
            <figure className="relative">
              <img
                src={`/categoryImages/${event.category}.jpg`} alt="category image"
                className="h-45 w-full object-cover brightness-50 rounded-xl"
              />
              <div className="card-title text-2xl absolute top-1 left-3">
                {event.title}
              </div>
              <div className="absolute bottom-1 left-3">
                <p className="text-lg font-semibold">{event.venue.split(',')[0]}</p>
                <p className="text-sm">{formatDateTime(event.date)}</p>
              </div>
            </figure>

          </Link>
        ))}
      </div>
    </div>
  )
}