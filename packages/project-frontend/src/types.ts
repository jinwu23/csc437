export interface EventType {
    id: number;
    title: string;
    date: string;
    location: string;
    description: string; 
}

export interface UserType {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    totalHours?: number;
    totalEvents?: number;
}

export type EventFunctionType = "none" | "register" | "cancel";
