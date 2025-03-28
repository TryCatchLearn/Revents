import { ArrowPathIcon } from "@heroicons/react/24/outline";

type Props = {
    message?: string;
    onReset?: () => void;
}

export default function EmptyState({ message = 'No data to display', onReset }: Props) {
  return (
    <div className="card bg-base-100 shadow-md py-10 items-center justify-center">
        <ArrowPathIcon className="w-24 h-24 text-primary" />
        <div className="text-2xl mb-3">{message}</div>
        {onReset && (
            <button onClick={onReset} className="btn btn-outline btn-primary">
                Reset filter
            </button>
        )}
    </div>
  )
}