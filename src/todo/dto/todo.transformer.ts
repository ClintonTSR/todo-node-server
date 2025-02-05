import { Todo } from '../entities/todo.entity';
import dayjs from 'dayjs';

export class TodoDto {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  status: 'Not urgent' | 'Due soon' | 'Overdue';
}

export const toTodoDto = (data: Todo): TodoDto => {
  const dueDate = data.dueDate ? dayjs(data.dueDate) : null;
  const daysTilDue = dueDate?.diff(dayjs(), 'day') ?? null;

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    dueDate: data.dueDate,
    status:
      !dueDate || daysTilDue > 7
        ? 'Not urgent'
        : daysTilDue > 0
          ? 'Due soon'
          : 'Overdue',
  };
};
