import { useParams } from "react-router";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { AppEvent } from "../../../lib/types";
import { useDocument } from "../../../lib/hooks/useDocument";
import { useState } from "react";

export default function EventDetails() {
  const [expandedChat, setExpandedChat] = useState(false);
  const {id} = useParams<{id: string}>();
  const {data: selectedEvent, loading} = useDocument<AppEvent>({path: 'events', id})
  
  if (loading) return <div>Loading...</div>

  if (!selectedEvent) return <div>Event not found</div> 

  return (
    <div className="flex gap-4 w-full">
      <div className="flex flex-col w-2/3 gap-3">
        <EventDetailedHeader event={selectedEvent} />
        {!expandedChat &&
        <EventDetailedInfo event={selectedEvent} />}
        <EventDetailedChat expandedChat={expandedChat} setExpandedChat={setExpandedChat} />
      </div>
      <div className="w-1/3">
        <EventDetailedSidebar event={selectedEvent} />
      </div>
    </div>
  )
}