import { Profile } from "../../lib/types"

type Props = {
  profile: Profile;
  editMode: boolean;
}

export default function ProfilePhotos({ profile, editMode }: Props) {
  return (
    <div>
      {editMode ? (
        <div>TODO: Photo upload goes here</div>
      ) : (
        <div className='grid grid-cols-5 gap-3 h-[50vh] overflow-auto'>
          <img
            className="rounded-lg w-full"
            src={profile.photoURL || '/user.png'}
            alt="user main image" />
          {Array.from({ length: 20 }).map((_, index) => (
            <img
              key={index}
              className="rounded-lg w-full"
              src='/user.png'
              alt="user main image" />
          ))}
        </div>
      )}
    </div>
  )
}