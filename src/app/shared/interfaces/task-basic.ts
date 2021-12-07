import { Timestamp } from 'firebase/firestore';

export interface TaskBasic {
  detail: string;
  description: string;
  scheduled: Timestamp;
  completed: boolean;
}
