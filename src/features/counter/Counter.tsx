import { useAppDispatch, useAppSelector } from "../../lib/stores/store"
import { decrement, increment, incrementByAmount } from "./counterSlice";

export default function Counter() {
    const count = useAppSelector(state => state.counter.value);
    const dispatch = useAppDispatch();

    return (
        <div className="card bg-base-100 shadow-lg flex flex-col gap-4">
            <div className="stats text-center">
                <div className="stat">
                    <div className="stat-title text-xl">Redux counter</div>
                    <div className="stat-value text-7xl">{count}</div>
                </div>
            </div>
            <div className="join flex justify-center">
                <button onClick={() => dispatch(decrement())} 
                    className="btn btn-error btn-outline join-item flex-1">Decrement</button>
                <button onClick={() => dispatch(increment())} 
                    className="btn btn-primary btn-outline join-item flex-1">Increment</button>
                <button onClick={() => dispatch(incrementByAmount(5))} 
                    className="btn btn-info btn-outline join-item flex-1">Add 5</button>
            </div>
        </div>
    )
}