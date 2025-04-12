import { StarIcon as OutlineStar } from "@heroicons/react/24/outline";
import { StarIcon as SolidStar } from "@heroicons/react/24/solid";

type Props = {
    selected: boolean;
    loading: boolean;
}

export default function StarButton({selected, loading}: Props) {
  return (
    <div className="relative hover:opacity-80 transition cursor-pointer">
        {!loading ? (
            <>
                <OutlineStar className="size-8 text-white absolute" />
                <SolidStar className={selected ? 'size-8 text-yellow-200' 
                    : 'text-neutral-500/70'} />
            </>
        ) : (
            <div className="text-white loading loading-spinner"></div>
        )}
    </div>
  )
}