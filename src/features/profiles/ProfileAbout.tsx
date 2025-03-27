import { FieldValues, useForm } from "react-hook-form";
import { Profile } from "../../lib/types"
import { formatDateTime, handleError } from "../../lib/util/util";
import { useFirestoreActions } from "../../lib/hooks/useFirestoreActions";
import { updateProfile } from "firebase/auth";
import { auth } from "../../lib/firebase/firebase";
import { toast } from "react-toastify";
import TextInput from "../../app/shared/components/TextInput";
import TextArea from "../../app/shared/components/TextArea";

type Props = {
  profile: Profile;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
}

export default function ProfileAbout({ profile, editMode, setEditMode }: Props) {
  const {update, submitting} = useFirestoreActions({path: 'profiles'});
  const {control, handleSubmit, reset, formState: {isDirty, isValid}} = useForm({
    values: {
      displayName: profile.displayName,
      description: profile.description || ''
    }
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      await update(profile.id, data);
      if (profile.displayName !== data.displayName) {
        await updateProfile(auth.currentUser!, {displayName: data.displayName});
      }
      setEditMode(false);
      reset();
      toast.success('Profile updated successfully');
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <>
      {!editMode ? (
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <span className="font-semibold">Joined:</span>
            <span>{formatDateTime(profile.createdAt)}</span>
          </div>
          {profile.description ? (
            <div>{profile.description}</div>
          ) : (
            <div>No description provided yet</div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
          <TextInput 
            name='displayName'
            control={control}
            label='Display Name'
            rules={{required: 'Display name is required'}}
          />
          <TextArea 
            name='description'
            control={control}
            label='Description'
            rows={4}
          />
          <button 
            className="btn btn-primary self-end"
            type='submit'
            disabled={!isDirty || !isValid || submitting}
          >
            {submitting && <span className="loading loading-spinner"></span>}
            Update profile
          </button>
        </form>
      )}
    </>

  )
}