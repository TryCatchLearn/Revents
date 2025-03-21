import EventCard from "./EventCard";
import Counter from "../../counter/Counter";
import { useAppSelector } from "../../../lib/stores/store";

export default function EventDashboard() {
  const { events: appEvents} = useAppSelector(state => state.event);

  return (
    <div className="flex flex-row w-full gap-6">
      <div className="w-3/5">
        <div className="flex flex-col gap-4">
          {appEvents.map((event) => (
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