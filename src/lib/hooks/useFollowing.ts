import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../stores/store"
import { Profile } from "../types";
import { arrayRemove, arrayUnion, doc, increment, writeBatch } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { handleError } from "../util/util";
import { addFollowing, removeFollowing } from "../../features/profiles/followSlice";

export const useFollowings = (targetProfileId?: string) => {
    const dispatch = useAppDispatch();
    const followingIds = useAppSelector(state => state.follow.followingIds);
    const currentUser = useAppSelector(state => state.account.user);
    const [loading, setLoading] = useState(false);

    const getReferences = (targetProfile: Profile) => {
        if (!currentUser) throw Error("No user found");

        return {
            followingRef: doc(db, `profiles/${currentUser.uid}/following`, targetProfile.id),
            followerRef: doc(db, `profiles/${targetProfile.id}/followers`, currentUser.uid),
            currentUserRef: doc(db, `profiles/${currentUser.uid}`),
            targetUserRef: doc(db, `profiles/${targetProfile.id}`),
            followingIdsRef: doc(db, `profiles/${currentUser.uid}/lookup`, 'followingIds')
        }
    }

    const followUser = async (targetProfile: Profile) => {
        if (!currentUser) return;
        setLoading(true);
        const {followerRef, followingRef, currentUserRef, targetUserRef, followingIdsRef} 
            = getReferences(targetProfile);

        try {
            const batch = writeBatch(db);

            batch.set(followingRef, {
                displayName: targetProfile.displayName,
                photoURL: targetProfile.photoURL || '',
            });

            batch.set(followerRef, {
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL || '',
            });

            batch.set(followingIdsRef, {
                ids: arrayUnion(targetProfile.id)
            }, {merge: true});

            batch.update(currentUserRef, {followingCount: increment(1)});
            batch.update(targetUserRef, {followerCount: increment(1)});

            await batch.commit();
            dispatch(addFollowing(targetProfile.id));
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    }

    const unfollowUser = async (targetProfile: Profile) => {
        if (!currentUser) return;
        setLoading(true);
        const {followerRef, followingRef, currentUserRef, targetUserRef, followingIdsRef}
            = getReferences(targetProfile);
        
        try {
            const batch = writeBatch(db);

            batch.delete(followingRef);
            batch.delete(followerRef);
            batch.update(followingIdsRef, {
                ids: arrayRemove(targetProfile.id)
            })
            batch.update(currentUserRef, {followingCount: increment(-1)});
            batch.update(targetUserRef, {followerCount: increment(-1)});

            await batch.commit();
            dispatch(removeFollowing(targetProfile.id));
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    }

    return {
        followUser,
        unfollowUser,
        loading,
        isFollowing: targetProfileId && followingIds.includes(targetProfileId),
        followingIds
    }
}