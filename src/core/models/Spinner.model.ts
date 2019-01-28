export interface SpinnerProps {
  hasOverlay?: boolean;
  startDelay?: number;
}

export interface SpinnerState {
  delayTimerStartID: TimerID;
}

export type TimerID = NodeJS.Timeout | null;
