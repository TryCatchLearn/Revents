import { Link, NavLink } from "react-router";
import UserMenu from "./UserMenu";
import { useAppSelector } from "../../../lib/stores/store";
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import { PaintBrushIcon } from "@heroicons/react/24/outline";
import { themes } from "../../../lib/util/themes";
import clsx from "clsx";
import NewsFeed from "./Newsfeed";

export default function Navbar() {
    const user = useAppSelector(state => state.account.user);
    const loading = useAppSelector(state => state.firestore.loading);
    const [selectedTheme, setSelectedTheme] =
        useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        themeChange(false);
    }, [])

    const handleThemeChange = (theme: string) => {
        setSelectedTheme(theme);
        const elem = document.activeElement as HTMLDivElement;
        if (elem) elem.blur();
    }

    return (
        <header className="px-3 w-full fixed top-0 z-50 bg-gradient-to-r from-primary to-black">
            <div className="flex align-middle items-center px-10 mx-auto gap-6 cursor-pointer">
                <div className="max-h-16 text-white flex items-center gap-3 
                border-r-white border-r-2 my-4 pr-6">
                    <NavLink to='/'
                        className="text-2xl font-semibold text-white uppercase">
                        Re-vents
                    </NavLink>
                </div>
                <nav className="flex gap-3 my-2 uppercase text-lg text-white">
                    <NavLink to='/events' end>Events</NavLink>
                    <NavLink to='/createEvent'>Create</NavLink>
                </nav>
                {loading && <span className="loading loading-lg text-white"></span>}
                <div className="flex align-middle ml-auto gap-3">
                    <div className="dropdown dropdown-bottom dropdown-end mr-6">
                        <div tabIndex={0} role="button">
                            <div className="flex flex-col items-center justify-center text-white">
                                <PaintBrushIcon className="h-8 w-8" />
                                <span className="uppercase text-xs">{selectedTheme}</span>
                            </div>
                        </div>
                        <ul tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            {themes.map((theme, index) => (
                                <li
                                    key={index}
                                    className={clsx('', {
                                        'font-semibold': selectedTheme === theme,
                                    })}
                                    onClick={() => handleThemeChange(theme)}
                                    data-set-theme={theme}
                                >
                                    <a>{theme}</a>
                                </li>
                            ))}

                        </ul>
                    </div>
                    {user ? (
                        <>
                            <NewsFeed />
                            <UserMenu />
                        </>

                    ) : (
                        <>
                            <Link to='/login' className="btn btn-outline btn-info">Login</Link>
                            <Link to='/register' className="btn btn-outline btn-info">Register</Link>
                        </>
                    )}

                </div>
            </div>
        </header>
    )
}