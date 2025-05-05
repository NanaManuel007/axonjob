import type { DayId } from './job.types';

export const weekDays: Array<{ id: DayId; label: string }> = [
    { id: 'sunday', label: 'Sunday' },
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' }
];

import type { JobType, PaymentType } from './job.types';

export const jobTypes: JobType[] = ['TEMPORARY', 'PERMANENT'];
export const paymentTypes: PaymentType[] = ['PER_HOUR', 'DAILY'];
export const temporaryTypes = ['Term Time', 'Part Time', 'After School'] as const;

export const initialJobData = {
    id:0,
    title: '',
    jobType: 'Permanent' as JobType,
    temporaryType: '',
    paymentType: 'Per Hour' as PaymentType,
    paymentAmount: 0,
    duties: ['', '', '', ''],
    requirements: ['', '', '', ''],
    jobHours: '',
    location: '',
    published: false,
    startDate: '',
    numberOfRoles: '1',
    workingHours: {
        sunday: { start: '', end: '', enabled: false },
        monday: { start: '', end: '', enabled: false },
        tuesday: { start: '', end: '', enabled: false },
        wednesday: { start: '', end: '', enabled: false },
        thursday: { start: '', end: '', enabled: false },
        friday: { start: '', end: '', enabled: false },
        saturday: { start: '', end: '', enabled: false }
    }
};