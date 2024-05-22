import { useState, useRef } from 'react';
import ResultModal from './ResultModal';

export default function TimerChallenge({title, targetTime}) {
    // every ref will get own component
    const timer = useRef();
    const dialog = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    // const [timerStarted, setTimerStarted] = useState(false);
    // const [timerExpired, setTimerExpired] = useState(false);

    // variable let gets recreated
    // let timer;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10)

        // timer.current = setTimeout(() => {
        //     setTimerExpired(true);
        //     // built in dialog has showModal method
        //     // dialog.current.showModal();
        //     dialog.current.open();
        // }, targetTime * 1000)

        // setTimerStarted(true);
    }

    function handleStop() {
        // clearTimeout(timer.current);
        dialog.current.open();
        clearInterval(timer.current);
    }

    return (
        <>
            <ResultModal 
                ref={dialog} 
                targetTime={targetTime} 
                result="lost" 
                remainingTime={timeRemaining}
                onReset={handleReset}
            />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    );
}