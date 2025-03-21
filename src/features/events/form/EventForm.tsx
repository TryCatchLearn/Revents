import { useNavigate, useParams } from "react-router";
import { users } from "../../../lib/data/sampleData";
import { useAppDispatch, useAppSelector } from "../../../lib/stores/store";
import { AppEvent } from "../../../lib/types";
import { createEvent, selectEvent, updateEvent } from "../eventSlice";
import { useEffect, useRef } from "react";

export default function EventForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const selectedEvent = useAppSelector(state => state.event.selectedEvent);
  const formRef = useRef<HTMLFormElement>(null);

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  }

  useEffect(() => {
    if (id) {
      dispatch(selectEvent(id));
    } else {
      dispatch(selectEvent(null));
      formRef.current?.reset();
    }
  }, [dispatch, id]);

  const onSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries()) as unknown as AppEvent;

    if (selectedEvent) {
      dispatch(updateEvent({ ...selectedEvent, ...data }));
      navigate(`/events/${selectedEvent.id}`);
      return;
    } else {
      const id = crypto.randomUUID();
      dispatch(createEvent({
        ...data,
        id,
        hostUid: users[0].uid,
        attendees: [{
          id: users[0].uid,
          displayName: users[0].displayName,
          photoURL: users[0].photoURL,
          isHost: true,
        }],
      }));
      navigate(`/events/${id}`);
    }
  }

  return (
    <div className="card bg-base-100 p-4 flex flex-col gap-3 w-full">
      <h3 className="text-2xl font-semibold text-center text-primary">
        {selectedEvent ? 'Edit Event' : 'Create Event'}
      </h3>
      <form ref={formRef} action={onSubmit} className="flex flex-col gap-3 w-full">
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
          <button onClick={() => navigate(-1)} type="button" className="btn btn-neutral">Cancel</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}