import { users } from "../../../lib/data/sampleData";
import { AppEvent } from "../../../lib/types";

type Props = {
  setFormOpen: (isOpen: boolean) => void;
  createEvent: (event: AppEvent) => void;
  selectedEvent: AppEvent | null;
  updateEvent: (event: AppEvent) => void;
}

export default function EventForm({ setFormOpen, createEvent, selectedEvent, updateEvent }: Props) {
  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  }

  const onSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries()) as unknown as AppEvent;

    if (selectedEvent) {
      updateEvent({ ...selectedEvent, ...data });
      setFormOpen(false);
      return;
    } else {
      createEvent({
        ...data,
        id: crypto.randomUUID(),
        hostUid: users[0].uid,
        attendees: [{
          id: users[0].uid,
          displayName: users[0].displayName,
          photoURL: users[0].photoURL,
          isHost: true,
        }],
      });
      setFormOpen(false);
    }

  }

  return (
    <div className="card bg-base-100 p-4 flex flex-col gap-3 w-full">
      <h3 className="text-2xl font-semibold text-center text-primary">
        {selectedEvent ? 'Edit Event' : 'Create Event'}
      </h3>
      <form action={onSubmit} className="flex flex-col gap-3 w-full">
        <input
          defaultValue={initialValues.title}
          name='title' type="text" className="input input-lg w-full"
          placeholder="Event title" />
        <input
          defaultValue={initialValues.category}
          name='category' type="text"
          className="input input-lg w-full"
          placeholder="Category" />
        <textarea
          defaultValue={initialValues.description}
          name='description'
          className="textarea textarea-lg w-full"
          placeholder="Description" />
        <input
          defaultValue={initialValues.date
            ? new Date(initialValues.date).toISOString().slice(0, 16) : ''}
          name='date'
          type='datetime-local'
          className="input input-lg w-full"
          placeholder="Date"
        />
        <input
          defaultValue={initialValues.city}
          name="city"
          type="text"
          className="input input-lg w-full"
          placeholder="City" />
        <input
          defaultValue={initialValues.venue}
          name="venue"
          type="text"
          className="input input-lg w-full" placeholder="Venue" />
        <div className="flex justify-end w-full gap-3">
          <button onClick={() => setFormOpen(false)} type="button" className="btn btn-neutral">Cancel</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}