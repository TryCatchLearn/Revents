import { useEffect, useState } from "react";
import { events } from "../../../lib/data/sampleData";
import EventForm from "../form/EventForm";
import EventCard from "./EventCard";
import { AppEvent } from "../../../lib/types";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  formOpen: boolean;
  setFormOpen: (isOpen: boolean) => void;
}

export default function EventDashboard({ formOpen, setFormOpen }: Props) {
  const [appEvents, setAppEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    setAppEvents(events);

    return () => {
      setAppEvents([]);
    }
  }, []);

  return (
    <div className="flex flex-row w-full gap-6">
      <div className="w-3/5">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.3, type: 'easeInOut' }}
          >
            <div className="flex flex-col gap-4">
              {appEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
      <div className="w-2/5">
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ duration: 0.3, type: 'easeInOut' }}
            >
              <EventForm setFormOpen={setFormOpen} />
            </motion.div>
          )}
        </AnimatePresence>


      </div>
    </div>
  )
}