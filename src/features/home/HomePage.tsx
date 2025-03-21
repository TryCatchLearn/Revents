import { UserGroupIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-2xl flex flex-col items-center">
          <UserGroupIcon className="size-96 text-primary" />
          <h1 className="text-5xl font-bold py-6">Welcome to Re-vents</h1>
          <div className="flex items-center gap-3">
              <Link to='/events' className="btn btn-primary btn-lg">View the events</Link>
              <button className="btn btn-info btn-lg">Learn more</button>
          </div>
        </div>
      </div>
    </div>
  )
}