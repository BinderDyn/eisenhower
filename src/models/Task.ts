import { Priority } from "./Priority.enum";

export interface Task {
  id: string;
  name: string;
  priority: Priority;
  xPosition?: number;
  yPosition?: number;
}
