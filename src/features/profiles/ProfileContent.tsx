import { ListBulletIcon, PhotoIcon, UserCircleIcon, UserGroupIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { useState } from "react"
import ProfilePhotos from "./ProfilePhotos"
import ProfileEvents from "./ProfileEvents"
import ProfileMembers from "./ProfileMembers"
import ProfileAbout from "./ProfileAbout"
import { AnimatePresence, motion } from "motion/react"
import { Profile } from "../../lib/types"
import { useAppSelector } from "../../lib/stores/store"

export default function ProfileContent({ profile }: { profile: Profile }) {
    const [selectedItem, setSelectedItem] = useState('about');
    const [editMode, setEditMode] = useState(false);
    const currentUser = useAppSelector(state => state.account.user);
    const [selectedEventTab, setSelectedEventTab] = useState('future');

    const eventTabs = [
        { id: 'future', label: 'Future Events' },
        { id: 'past', label: 'Past Events' },
        { id: 'hosting', label: 'Hosting' }
      ]

    const followOptions = ['all', 'following', 'followers'];

    const [followFilter, setFollowFilter] = useState(followOptions[0]);

    const items = [
        { key: 'about', label: `About ${profile.displayName}`, description: `About ${profile.displayName}`, icon: UserCircleIcon },
        { key: 'photos', label: `Photos`, description: `View photos of ${profile.displayName}`, icon: PhotoIcon },
        {
            key: 'events', label: `Events`, description: `View events ${profile.displayName} is hosting or attending`,
            icon: ListBulletIcon
        },
        {
            key: 'members', label: `Members`, description: `View other members of this app`,
            icon: UserGroupIcon
        },
    ]

    const selected = items.find(item => item.key === selectedItem) || items[0];
    const canEdit = currentUser?.uid === profile.id &&
        (selectedItem === 'about' || selectedItem === 'photos');

    const renderContent = () => {
        switch (selectedItem) {
            case 'photos':
                return <ProfilePhotos profile={profile} editMode={editMode} 
                    setEditMode={setEditMode} />;
            case 'events':
                return <ProfileEvents profile={profile} selectedTab={selectedEventTab} />;
            case 'members':
                return <ProfileMembers profile={profile} followFilter={followFilter} />;
            default:
                return <ProfileAbout profile={profile} editMode={editMode}
                    setEditMode={setEditMode} />
        }
    }

    return (
        <div className="flex w-full gap-3 h-[64vh]">
            <ul className="list bg-base-100 rounded-box w-1/4 pt-2">
                {items.map(({ key, label, description, icon: Icon }) => (
                    <li
                        onClick={() => setSelectedItem(key)}
                        key={key}
                        className={clsx("list-row py-2 hover:bg-primary/20 cursor-pointer", {
                            'text-primary font-bold': selectedItem === key
                        })}
                    >
                        <div><Icon className="size-10" /></div>
                        <div className="flex flex-col gap-1">
                            <span>{label}</span>
                            <span className="text-xs font-semibold opacity-60">{description}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="card p-3 bg-base-100 w-3/4">
                <div className="flex items-center justify-between">
                    <div className="card-title text-2xl ml-3 py-1 text-primary">
                        {selected.label}
                    </div>
                    {canEdit &&
                        <button
                            onClick={() => setEditMode(!editMode)}
                            className="btn btn-outline btn-primary">
                            {editMode ? 'Cancel' : 'Edit'}
                        </button>}
                    {selectedItem === 'members' && (
                        <div className="tabs tabs-box">
                            {followOptions.map(option => (
                                <input 
                                    key={option}
                                    onChange={() => setFollowFilter(option)}
                                    checked={followFilter === option}
                                    type="radio" 
                                    name={option} 
                                    className="tab" 
                                    aria-label={
                                        option === 'all' 
                                            ? option.toUpperCase() 
                                            : profile.displayName.toUpperCase() + "'S " 
                                                + option.toUpperCase()
                                    } 
                                />
                            ))}
                        </div>
                    )}
                    {selectedItem === 'events' && (
                        <div className="tabs tabs-box">
                        {eventTabs.map(tab => (
                          <a
                            key={tab.id}
                            onClick={() => setSelectedEventTab(tab.id)}
                            className={clsx('tab', {
                              'tab-active': selectedEventTab === tab.id
                            })}
                          >
                            {tab.label}
                          </a>
                        ))}
                      </div>
                    )}
                </div>

                <div className="divider my-1"></div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedItem}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <div className="p-3">
                            {renderContent()}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div >
    )
}