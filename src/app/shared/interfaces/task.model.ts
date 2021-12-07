import { Timestamp } from 'firebase/firestore';

export interface Task {
  id: string;
  detail: string;
  scheduled: Timestamp;
  completed: boolean;
  description?: string;
}
