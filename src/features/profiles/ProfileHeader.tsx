import clsx from "clsx";
import { useFollowings } from "../../lib/hooks/useFollowing";
import { useAppSelector } from "../../lib/stores/store";
import { Profile } from "../../lib/types";

export default function ProfileHeader({ profile }: { profile: Profile }) {
    const { unfollowUser, followUser, loading, isFollowing } = useFollowings(profile.id);
    const currentUser = useAppSelector(state => state.account.user);
    const isCurrentUser = currentUser?.uid === profile.id;

    return (
        <div className="card w-full bg-base-100">
            <div className="flex w-full py-3 px-6 justify-between">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-28 h-28 rounded-full">
                            <img src={profile?.photoURL || "/user.png"} referrerPolicy="no-referrer" alt="user avatar" />
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-3">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-semibold">{profile.displayName}</h2>
                            {isFollowing && !isCurrentUser &&
                                <div className="badge badge-primary">Following</div>}
                        </div>
                        {!isCurrentUser &&
                            <button
                                onClick={isFollowing 
                                    ? () => unfollowUser(profile) 
                                    : () => followUser(profile)}
                                disabled={loading}
                                className={clsx("btn btn-outline btn-wide", {
                                    'btn-primary': !isFollowing,
                                    'btn-error': isFollowing
                                })}>
                                {loading && <span className="loading loading-spinner"></span>}
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                        }
                    </div>
                </div>

                <div className="flex gap-3 items-center">
                    <div className="stats">
                        <div className="stat place-items-center">
                            <div className="stat-title text-xl">Followers</div>
                            <div className="stat-value text-7xl">{profile.followerCount || 0}</div>
                        </div>
                        <div className="stat place-items-center">
                            <div className="stat-title text-xl">Following</div>
                            <div className="stat-value text-7xl">{profile.followingCount || 0}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}