import { updateProfile } from "firebase/auth";
import PhotoUpload from "../../app/shared/components/PhotoUpload";
import { useFirestoreActions } from "../../lib/hooks/useFirestoreActions";
import { Photo, Profile } from "../../lib/types"
import { handleError } from "../../lib/util/util";
import { auth, storage } from "../../lib/firebase/firebase";
import { useCollection } from "../../lib/hooks/useCollection";
import StarButton from "../../app/shared/components/StarButton";
import DeleteButton from "../../app/shared/components/DeleteButton";
import { useState } from "react";
import { useAppDispatch } from "../../lib/stores/store";
import { setImage } from "../account/accountSlice";
import { deleteObject, ref } from "firebase/storage";
import ImageModal from "../../app/shared/components/ImageModal";
import { openImageModal } from "../../lib/util/modalEvent";

type Props = {
  profile: Profile;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}

export default function ProfilePhotos({ profile, editMode, setEditMode }: Props) {
  const dispatch = useAppDispatch();
  const currentUser = auth.currentUser;
  const isCurrentUser = currentUser?.uid === profile.id;
  const { create, remove } = useFirestoreActions({ path: `/profiles/${profile.id}/photos` });
  const { update } = useFirestoreActions({ path: `/profiles` });
  const { data: photos } = useCollection<Photo>({ path: `/profiles/${profile.id}/photos` });
  const [status, setStatus] = useState('');
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);

  const handlePhotoUpload = async (url: string, uploadId: string) => {
    try {
      if (!profile.photoURL) {
        await update(profile.id, { photoURL: url });
        await updateProfile(auth.currentUser!, { photoURL: url });
        dispatch(setImage(url));
      }
      await create({
        storageId: uploadId,
        url
      });
      setEditMode(false);
    } catch (error) {
      handleError(error);
    }
  }

  const handleSetMain = async (photo: Photo) => {
    setStatus(photo.id + 'setMain');
    try {
      await updateProfile(auth.currentUser!, { photoURL: photo.url });
      await update(profile.id, { photoURL: photo.url });
      dispatch(setImage(photo.url));
    } catch (error) {
      handleError(error);
    } finally {
      setStatus('');
    }
  }

  const handleDeleteImage = async (photo: Photo) => {
    setStatus(photo.id + 'delete');
    try {
      const storageRef = ref(storage, `${profile.id}/user_images/${photo.storageId}`);
      await deleteObject(storageRef);
      await remove(photo.id);
    } catch (error) {
      handleError(error);
    } finally {
      setStatus('');
    }
  }

  return (
    <div>
      {editMode ? (
        <PhotoUpload
          uploadPhoto={handlePhotoUpload}
          path={`${auth.currentUser?.uid}/user_images`}
        />
      ) : (
        <div className='grid grid-cols-5 gap-3 h-[50vh] overflow-auto'>
          {photos?.map((photo) => (
            <div key={photo.id} className="relative">
              <img
                className="rounded-lg w-full aspect-square object-cover cursor-pointer"
                src={photo.url}
                alt="user image" 
                onClick={() => {
                  setSelectedImage(photo);
                  openImageModal();
                }}
              />
              {isCurrentUser && (
                <>
                  <button
                    onClick={() => handleSetMain(photo)}
                    disabled={status === photo.id + 'setMain'
                      || photo.url === profile.photoURL}
                    className="absolute top-1 left-1 z-50"
                  >
                    <StarButton
                      selected={photo.url === profile.photoURL}
                      loading={status === photo.id + 'setMain'} />
                  </button>
                  {profile.photoURL !== photo.url && (
                    <button 
                      className="absolute top-1 right-1 z-50"
                      disabled={status === photo.id + 'delete'}
                      onClick={() => handleDeleteImage(photo)}
                    >
                      <DeleteButton loading={status === photo.id + 'delete'} />
                    </button>
                  )}

                </>
              )}
            </div>

          ))}
        </div>
      )}
      {selectedImage && (
        <ImageModal photo={selectedImage} />
      )}
    </div>
  )
}