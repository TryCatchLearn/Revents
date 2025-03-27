import { useParams } from "react-router";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import { useDocument } from "../../lib/hooks/useDocument";
import { Profile } from "../../lib/types";

export default function ProfilePage() {
  const {id} = useParams<{id: string}>();
  const {data: profile, loadedInitial} = useDocument<Profile>({path: 'profiles', id});

  if (!loadedInitial) return <div>Loading...</div>

  if (!profile) return <div>Profile not found</div>

  return (
    <div className="flex flex-col gap-3 w-full">
        <div className="flex w-full">
            <ProfileHeader profile={profile} />
        </div>
        <div className="flex w-full">
            <ProfileContent profile={profile} />
        </div>
    </div>
  )
}