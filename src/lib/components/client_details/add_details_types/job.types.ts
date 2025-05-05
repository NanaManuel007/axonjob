export type DayId = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

export interface DaySchedule {
    start: string;
    end: string;
    enabled: boolean;
}

export interface WorkingHours {
    sunday: DaySchedule;
    monday: DaySchedule;
    tuesday: DaySchedule;
    wednesday: DaySchedule;
    thursday: DaySchedule;
    friday: DaySchedule;
    saturday: DaySchedule;
}

export type JobType = 'CONTRACT' | 'INTERNSHIP' | 'PART_TIME' | 'PERMANENT' | 'TEMPORARY';

export type PaymentType = 'DAILY' | 'MONTHLY' | 'PER_ANNUM' | 'PER_HOUR' | 'PROJECT_BASED';

export interface JobData {
    title: string;
    jobType: JobType;
    temporaryType?: string;
    paymentType: PaymentType;
    paymentAmount: number; 
    duties: string[];
    requirements: string[];
    jobHours: string;
    location: string;
    published: boolean;
    startDate: string;
    numberOfRoles: string;
    workingHours: WorkingHours; 
}