import EventCard from "./EventCard";
import { AppEvent } from "../../../lib/types";
import { useCollection } from "../../../lib/hooks/useCollection";
import EventFilters from "./EventFilters";
import EmptyState from "../../../app/shared/components/EmptyState";
import { useEventFilters } from "../../../lib/hooks/useEventFilters";

export default function EventDashboard() {
  const { data: appEvents, loading } = useCollection<AppEvent>({ path: 'events' });
  const { filter, setFilter, resetFilters } = useEventFilters();

  if (loading) return <div>Loading...</div>

  return (
    <div className="flex flex-row w-full gap-6">
      <div className="w-2/3">
        <div className="flex flex-col gap-4">
          {!loading && appEvents?.length === 0 ? (
            <EmptyState message="No events for this filter" onReset={resetFilters} />
          ) : (
            <>
              {appEvents?.map((event) => (
                <EventCard
                  key={event.id}
                  event={event} />
              ))}
            </>
          )}

        </div>
      </div>
      <div className="w-1/3 overflow-hidden sticky top-[96px] self-start">
        <EventFilters setFilter={setFilter} filter={filter} />
      </div>
    </div>
  )
}