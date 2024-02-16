import { forwardRef, useImperativeHandle, useRef } from 'react';
import {createPortal} from 'react-dom'

export const ResultModal = forwardRef(function ResultModal(
	{ targetTime, remainingTime, onReset },
	ref
) {
	const dialog = useRef();

	
	const userLost = remainingTime <= 0;
    const formatedRemainingTime = (remainingTime / 1000).toFixed(2)
const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100)


	useImperativeHandle(ref, () => {
		return {
			open() {
				dialog.current.showModal();
			},
		};
	});

	return createPortal(
		<dialog ref={dialog} className="result-modal" onClose={onReset}>
			{userLost && <h2>Your lost</h2>} 
            {!userLost && <h2>Your score: {score}</h2>} 
			<p>
				The taret time was <strong>{targetTime} seconds</strong>
			</p>
			<p>
				You stopped the timer with <strong>{formatedRemainingTime} seconds left</strong>
			</p>
			<form method="dialog">
				<button onSubmit={onReset}>Close</button>
			</form>
		</dialog>,
        document.getElementById('modal')
	);
});
