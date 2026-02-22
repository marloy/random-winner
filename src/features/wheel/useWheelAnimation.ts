import { useCallback, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { gsap } from "gsap";
import type { AppDispatch, RootState } from "../../app/store.ts";
import { setWinner, startSpin } from "../../slices/wheelSlice.ts";
import { EXTRA_SPINS, ITEM_HEIGHT, VISIBLE_ITEMS } from "./constants.ts";
import confetti from "canvas-confetti";

export const useWheelAnimation = () => {
  const { participants, winner, isSpinning } = useSelector((state: RootState) => ({
    participants: state.wheel.participants,
    winner: state.wheel.winner,
    isSpinning: state.wheel.isSpinning,
  }), shallowEqual);

  const dispatch = useDispatch<AppDispatch>();
  const reelRef = useRef<HTMLDivElement>(null);

  const spin = useCallback(() => {
    if (!participants.length || !reelRef.current) return;

    dispatch(startSpin());

    const winnerIndex = getSecureRandomIndex(participants.length);
    const centerOffset = Math.floor(VISIBLE_ITEMS / 2);
    const totalItems = participants.length * EXTRA_SPINS + winnerIndex;
    const finalY = -(totalItems - centerOffset) * ITEM_HEIGHT;

    const tl = gsap.timeline({
      onComplete: () => {
        if (reelRef.current) {
          gsap.set(reelRef.current, {
            y: -(winnerIndex - centerOffset + participants.length) * ITEM_HEIGHT,
          });
        }

        setTimeout(() => {
          dispatch(setWinner(participants[winnerIndex]));
          confettiShot();
        })
      },
    });

    tl.to(reelRef.current, {
      y: finalY,
      duration: 10,
      ease: "power4.inOut"
    });
  }, [dispatch, participants]);

  const list = Array(EXTRA_SPINS + VISIBLE_ITEMS).fill(participants).flat();

  return {
    spin,
    reelRef,
    list,
    winner,
    isSpinning
  };
};

function getSecureRandomIndex(max: number) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}

function confettiShot() {
  confetti({
    particleCount: 100,
    angle: 50,
    spread: 70,
    origin: { x: 0, y: 0.8 },
    ticks: 150,
    startVelocity: 80,
  });

  confetti({
    particleCount: 100,
    angle: 130,
    spread: 70,
    origin: { x: 1, y: 0.8 },
    ticks: 150,
    startVelocity: 80,
  });
}