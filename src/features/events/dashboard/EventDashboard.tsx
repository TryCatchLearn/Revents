import EventCard from "./EventCard";
import Counter from "../../counter/Counter";
import { AppEvent } from "../../../lib/types";
import { useCollection } from "../../../lib/hooks/useCollection";

export default function EventDashboard() {
  const {data: appEvents, loading} = useCollection<AppEvent>({path: 'events'});

  if (loading) return <div>Loading...</div>

  return (
    <div className="flex flex-row w-full gap-6">
      <div className="w-3/5">
        <div className="flex flex-col gap-4">
          {appEvents?.map((event) => (
            <EventCard
              key={event.id}
              event={event} />
          ))}
        </div>
      </div>
      <div className="w-2/5 overflow-hidden">
        <Counter />
      </div>
    </div>
  )
}