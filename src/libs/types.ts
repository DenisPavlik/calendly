export type WeekdayName =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type FromTo = {
  from: string;
  to: string;
  active: boolean;
};

export type BookingTimes = Record<WeekdayName, FromTo>;

export type EventType = {
  _id?: string;
  email: string;
  uri: string;
  title: string;
  description: string;
  length: number;
  bookingTimes: BookingTimes;
  createdAt?: Date;
  updatedAt?: Date;
};