import EventCard from "./EventCard";
import { AppEvent } from "../../../lib/types";
import { useCollection } from "../../../lib/hooks/useCollection";
import EventFilters from "./EventFilters";
import EmptyState from "../../../app/shared/components/EmptyState";
import { useEventFilters } from "../../../lib/hooks/useEventFilters";
import { useAppDispatch } from "../../../lib/stores/store";
import { setCollectionOptions, setNextPage } from "../../../lib/firebase/firestoreSlice";
import { useEffect, useRef } from "react";
import {useInView} from 'react-intersection-observer';

export default function EventDashboard() {
  const dispatch = useAppDispatch();
  const { filter, setFilter, resetFilters, collectionOptions } = useEventFilters();
  const { data: appEvents, loadedInitial, hasMore, loading} = useCollection<AppEvent>({ 
    path: 'events',
    listen: false,
    paginate: true 
  });
  const {ref, inView} = useInView({threshold: 0.5, triggerOnce: false});

  const hasSetOptions = useRef(false);

  useEffect(() => {
    if (hasSetOptions.current) return;
    dispatch(setCollectionOptions({path: 'events', options: collectionOptions}));
    hasSetOptions.current = true;
  }, [collectionOptions, dispatch]);

  useEffect(() => {
    if (!appEvents || loading) return;
    if (inView && hasMore) {
      dispatch(setNextPage({path: 'events'}));
    }
  }, [appEvents, dispatch, inView, hasMore, loading]);

  if (!loadedInitial) return <div>Loading...</div>

  return (
    <div className="flex flex-row w-full gap-6">
      <div className="w-2/3">
        <div className="flex flex-col gap-4">
          {!loadedInitial && appEvents?.length === 0 ? (
            <EmptyState message="No events for this filter" onReset={resetFilters} />
          ) : (
            <div className="flex flex-col gap-3">
              {appEvents?.map((event) => (
                <EventCard
                  key={event.id}
                  event={event} />
              ))}
              {hasMore && <div ref={ref} className="h-10" />}
            </div>
          )}

        </div>
      </div>
      <div className="w-1/3 overflow-hidden sticky top-[96px] self-start">
        <EventFilters setFilter={setFilter} filter={filter} />
      </div>
    </div>
  )
}