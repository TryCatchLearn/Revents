import { TrashIcon as OutlineTrash } from "@heroicons/react/24/outline";
import { TrashIcon as SolidTrash } from "@heroicons/react/24/solid";

type Props = {
    loading: boolean;
}

export default function DeleteButton({loading}: Props) {
  return (
    <div className="relative hover:opacity-80 transition cursor-pointer">
        {!loading ? (
            <>
                <OutlineTrash className="size-8 text-white absolute" />
                <SolidTrash className={'size-8 text-red-500'} />
            </>
        ) : (
            <div className="text-white loading loading-spinner"></div>
        )}
    </div>
  )
}