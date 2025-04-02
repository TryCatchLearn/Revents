export const openAuthModal = () => {
    const modal = document.getElementById('auth-modal') as HTMLDialogElement;
    if (modal) modal.showModal();
}