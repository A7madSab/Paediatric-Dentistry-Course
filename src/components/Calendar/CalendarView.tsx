import {
  DndContext,
  PointerSensor,
  type DragEndEvent,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { moveSession } from '../../store/sessionsSlice';
import MonthView from './MonthView';
import YearView from './YearView';

export default function CalendarView() {
  const dispatch = useAppDispatch();
  const viewMode = useAppSelector((state) => state.ui.viewMode);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      dispatch(
        moveSession({
          id: String(active.id),
          newDate: String(over.id),
        }),
      );
    }
  }

  return <DndContext sensors={sensors} onDragEnd={handleDragEnd}>{viewMode === 'month' ? <MonthView /> : <YearView />}</DndContext>;
}
