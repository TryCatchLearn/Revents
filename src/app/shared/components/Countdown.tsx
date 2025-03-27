import { intervalToDuration } from "date-fns";
import { useEffect, useState } from "react"

export default function Countdown({date}: {date: string}) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const target = new Date(date);

            if (target <= now) {
                clearInterval(interval);
                setTimeLeft({days: 0, hours: 0, minutes: 0, seconds: 0});
            } else {
                const duration = intervalToDuration({start: now, end: target});
                setTimeLeft({
                    days: duration.days || 0,
                    hours: duration.hours || 0,
                    minutes: duration.minutes || 0,
                    seconds: duration.seconds || 0
                })
            }
        }, 1000);
    }, [date]);

    return (
        <div className="grid grid-flow-col gap-5 text-white text-center auto-cols-max">
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": timeLeft.days } as React.CSSProperties } aria-live="polite" aria-label={'counter'}>
                        {timeLeft.days}
                    </span>
                </span>
                days
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": timeLeft.hours } as React.CSSProperties} aria-live="polite" aria-label={'counter'}>
                        {timeLeft.hours}</span>
                </span>
                hours
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": timeLeft.minutes } as React.CSSProperties} aria-live="polite" aria-label={'counter'}>
                        {timeLeft.minutes}</span>
                </span>
                min
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": timeLeft.seconds } as React.CSSProperties} aria-live="polite" aria-label={'counter'}>
                        {timeLeft.seconds}</span>
                </span>
                sec
            </div>
        </div>
    )
}