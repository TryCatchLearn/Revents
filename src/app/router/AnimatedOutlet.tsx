import { AnimatePresence, motion } from "motion/react";
import { cloneElement } from "react";
import { useLocation, useOutlet } from "react-router"

export default function AnimatedOutlet() {
    const location = useLocation();
    const element = useOutlet();

    return (
        <AnimatePresence mode="wait" initial={true}>
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: 0, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 0, y: 20 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
            >
               {element && cloneElement(element, {key: location.pathname})}
            </motion.div>
        </AnimatePresence>
    )
}