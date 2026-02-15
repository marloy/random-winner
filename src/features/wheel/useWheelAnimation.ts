import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store.ts";
import { setWinner } from "../../slices/wheelSlice.ts";
import { EXTRA_SPINS, ITEM_HEIGHT, VISIBLE_ITEMS } from "./constants.ts"; // VISIBLE_ITEMS = сколько элементов видно в окне

export const useWheelAnimation = () => {
  const participants = useSelector((state: RootState) => state.wheel.participants);
  const dispatch = useDispatch<AppDispatch>();
  const reelRef = useRef<HTMLDivElement>(null);

  const spin = () => {
    if (!participants.length) return;

    const winnerIndex = Math.floor(Math.random() * participants.length);

    // Считаем смещение так, чтобы победитель оказался по центру
    const centerOffset = Math.floor(VISIBLE_ITEMS / 2);
    const totalItems = participants.length * EXTRA_SPINS + winnerIndex;

    if (!reelRef.current) return;

    // Запускаем анимацию
    reelRef.current.style.transition = 'transform 5s cubic-bezier(0.33, 1, 0.68, 1)';
    reelRef.current.style.transform = `translateY(-${(totalItems - centerOffset) * ITEM_HEIGHT}px)`;

    const handleTransitionEnd = () => {
      dispatch(setWinner(participants[winnerIndex]));

      // Сброс позиции для следующего круга, без анимации
      if (reelRef.current) {
        reelRef.current.style.transition = 'none';
        reelRef.current.style.transform = `translateY(-${(winnerIndex - centerOffset) * ITEM_HEIGHT}px)`;
      }

      reelRef.current?.removeEventListener('transitionend', handleTransitionEnd);
    };

    reelRef.current.addEventListener('transitionend', handleTransitionEnd);
  };

  // Создаём только повторения участников для плавной анимации
  const list = Array(EXTRA_SPINS + VISIBLE_ITEMS).fill(participants).flat();

  console.log('list', list)

  return {
    spin,
    reelRef,
    list,
  };
};
