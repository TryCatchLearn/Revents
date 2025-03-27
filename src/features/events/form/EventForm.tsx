import { useNavigate, useParams } from "react-router";
import { AppEvent, FirestoreAppEvent } from "../../../lib/types";
import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import TextInput from "../../../app/shared/components/TextInput";
import { eventFormSchema, EventFormSchema } from "../../../lib/schemas/eventFormSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import TextArea from "../../../app/shared/components/TextArea";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import PlaceInput from "../../../app/shared/components/PlaceInput";
import { useDocument } from "../../../lib/hooks/useDocument";
import { useFirestoreActions } from "../../../lib/hooks/useFirestoreActions";
import { Timestamp } from "firebase/firestore";
import { handleError } from "../../../lib/util/util";
import { useAppSelector } from "../../../lib/stores/store";

export default function EventForm() {
  const navigate = useNavigate();
  const currentUser = useAppSelector(state => state.account.user);
  const { id } = useParams<{ id: string }>();
  const { data: selectedEvent, loading } = useDocument<AppEvent>({ path: 'events', id });
  const { update, submitting, create } = useFirestoreActions<FirestoreAppEvent>({ path: 'events' });

  const { control, handleSubmit, reset, formState: { isValid } }
    = useForm<EventFormSchema>({
      mode: 'onTouched',
      resolver: zodResolver(eventFormSchema)
    });

  useEffect(() => {
    if (selectedEvent) {
      reset({
        ...selectedEvent,
        date: selectedEvent.date.slice(0, 16),
        venue: {
          venue: selectedEvent.venue,
          latitude: selectedEvent.latitude,
          longitude: selectedEvent.longitude,
        }
      })
    }
  }, [id, selectedEvent, reset]);

  const processFormData = (data: EventFormSchema) => {
    return {
      ...data,
      date: Timestamp.fromDate(new Date(data.date)),
      venue: data.venue.venue,
      latitude: data.venue.latitude,
      longitude: data.venue.longitude,
    }
  }

  const onSubmit = async (data: EventFormSchema) => {
    if (!currentUser) return;
    try {
      if (selectedEvent) {
        await update(selectedEvent.id, {
          ...selectedEvent,
          ...data,
          ...processFormData(data)
        });
        navigate(`/events/${selectedEvent.id}`);
        return;
      } else {
        const newEvent = {
          ...data,
          ...processFormData(data),
          hostUid: currentUser.uid,
          attendees: [{
            id: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser?.photoURL,
            isHost: true,
          }],
          attendeeIds: [currentUser.uid],
        }
        const ref = await create(newEvent as FirestoreAppEvent);
        navigate(`/events/${ref.id}`);
      }
    } catch (error) {
      handleError(error);
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="card bg-base-100 p-4 flex flex-col gap-3 w-full">
      <h3 className="text-2xl font-semibold text-center text-primary">
        {selectedEvent ? 'Edit Event' : 'Create Event'}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
        <TextInput
          control={control}
          name="title"
          label="Title"
        />

        <TextArea
          control={control}
          name="description"
          label="Description"
          rows={3}
        />
        <div className="flex gap-3 items-center w-full">
          <SelectInput
            control={control}
            name="category"
            label="Category"
            options={categoryOptions}
          />
          <TextInput
            control={control}
            name="date"
            label="Date"
            type="datetime-local"
          />
        </div>

        <PlaceInput
          control={control}
          name="venue"
          label="Venue"
        />
        <div className="flex justify-end w-full gap-3">
          <button onClick={() => navigate(-1)} type="button" className="btn btn-neutral">Cancel</button>
          <button
            disabled={!isValid || submitting}
            type="submit"
            className="btn btn-primary">
            {submitting &&
              <span className="loading loading-spinner"></span>}
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}