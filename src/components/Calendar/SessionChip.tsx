import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { CSSProperties, MouseEvent } from 'react';
import { PHASE_COLORS } from '../../constants';
import { useAppDispatch } from '../../hooks';
import { openEditModal } from '../../store/uiSlice';
import type { Session } from '../../types';

interface Props {
  session: Session;
}

export default function SessionChip({ session }: Props) {
  const dispatch = useAppDispatch();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: session.id,
  });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: isDragging ? 50 : undefined,
    position: isDragging ? 'relative' : undefined,
  };

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    dispatch(openEditModal(session.id));
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      title={session.title}
      className={`${PHASE_COLORS[session.phase]} w-full truncate rounded px-1.5 py-0.5 text-[10px] leading-tight font-medium text-white transition-all select-none hover:brightness-110`}
    >
      {session.title}
    </div>
  );
}
