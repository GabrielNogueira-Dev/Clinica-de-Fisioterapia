import { AppointmentType, AppointmentStatus } from "../generated/prisma/client";

export interface  ServiceTypeProps {
  id?: string;    
  type?: AppointmentType ;
  name: string;
  banner?: string;

  appointments?: Appointment[];
}

export interface Appointment{
  id: string;
  scheduledAt: Date;
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
  description: string;

  userId: string;
  user?: any;
}