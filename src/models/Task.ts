import { Priority } from "./Priority.enum";

export interface TaskModel {
  id: string;
  name: string;
  priority?: Priority;
}
