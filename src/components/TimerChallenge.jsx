import { useState, useRef } from 'react';
import { ResultModal } from './ResulModal';

export const TimerChallenge = ({ targetTime, title }) => {
	const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

	const timer = useRef();
	const dialog = useRef();

	const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

	if (timeRemaining <= 0) {
		clearInterval(timer.current);
	
		dialog.current.open();
	}

	const handleReset = () => {
		setTimeRemaining(targetTime * 1000);
	}

	const handleStart = () => {
		timer.current = setInterval(() => {
			setTimeRemaining(prev => prev - 10);
		}, 10);
	};

	const handleStop = () => {
		clearInterval(timer.current);
		dialog.current.open();
	};

	return (
		<>
			<ResultModal onReset={handleReset} ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} />
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
};
