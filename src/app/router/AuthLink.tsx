import { forwardRef } from "react";
import { Link, LinkProps } from "react-router";
import { useAppSelector } from "../../lib/stores/store";
import { openAuthModal } from "../../lib/util/modalEvent";

const AuthLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
    const currentUser = useAppSelector(state => state.account.user);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (!currentUser) {
            event.preventDefault();
            openAuthModal();
        }
    }

    return <Link ref={ref} {...props} onClick={handleClick} />
})

export default AuthLink;