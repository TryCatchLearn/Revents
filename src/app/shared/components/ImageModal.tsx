import { Photo } from "../../../lib/types";

export default function ImageModal({photo}: {photo: Photo}) {
  return (
    <dialog id='image-modal' className="modal"
        onClick={(e) => {
            const dialog = e.currentTarget as HTMLDialogElement;
            if (e.target === dialog) dialog.close();
        }}
    >
        <div 
            className="modal-box p-4 bg-white rounded-xl shadow-xl border 
                border-gray-300 max-w-fit overflow-hidden">
                <img 
                    src={photo.url} 
                    alt="user full image" 
                    className="max-w-full max-h-screen object-contain"
                />
        </div>
    </dialog>
  )
}