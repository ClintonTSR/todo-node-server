import { Todo } from "../entities/todo.entity";
import dayjs from 'dayjs';

export class TodoDto {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'Not urgent' | 'Due soon' | 'Overdue';
}

export const toTodoDto = (data: Todo): TodoDto => {
  const dueDate = dayjs().add(7, 'day')
  const daysTilDue = dueDate.diff(data.dueDate ?? dayjs(), 'day')

  return {
    id: data.id,
    title: data.name,
    description: data.description,
    dueDate: data.dueDate,
    status: daysTilDue <= 0 ? 'Overdue' : daysTilDue < 7 ? 'Due soon' : 'Not urgent'
  }
};