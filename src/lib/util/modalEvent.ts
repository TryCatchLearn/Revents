export const openAuthModal = () => {
    const modal = document.getElementById('auth-modal') as HTMLDialogElement;
    if (modal) modal.showModal();
}

export const openImageModal = () => {
    const modal = document.getElementById('image-modal') as HTMLDialogElement;
    if (modal) modal.showModal();
}