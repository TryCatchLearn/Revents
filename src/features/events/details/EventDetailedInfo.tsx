import { CalendarIcon, InformationCircleIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import MapComponent from "../../../app/shared/components/MapComponent";
import { AppEvent } from "../../../lib/types";
import { formatDateTime } from "../../../lib/util/util";

export default function EventDetailedInfo({event}: {event: AppEvent}) {
    const [mapOpen, setMapOpen] = useState(false);

    return (
        <div className="card bg-base-100">
            <div className="flex flex-col align-middle">
                <div className="flex items-center gap-x-3 border-b border-neutral-300 py-3 pl-3">
                    <InformationCircleIcon className="size-8" />
                    <span>{event.description}</span>
                </div>
                <div className="flex items-center gap-x-3 border-b border-neutral-300 py-3 pl-3">
                    <CalendarIcon className="size-8" />
                    <span>{formatDateTime(event.date)}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-3 py-3 pl-3">
                        <MapPinIcon className="size-8" />
                        <span>{event.venue}</span>
                    </div>
                    <button
                        onClick={() => setMapOpen(!mapOpen)} 
                        className="btn btn-info btn-outline mr-2">
                        {mapOpen ? 'Hide Map' : 'Show Map'}
                    </button>
                </div>
            </div>
            {mapOpen && event && (
                <div className="h-64">
                    <MapComponent 
                        position={[event.latitude, event.longitude]}
                        venue={event.venue}
                    />
                </div>
            )}
        </div>
    )
}