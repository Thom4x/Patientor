export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';
//export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment: string;
}

export const Visibility = {
    Great: 'great',
    Good: 'good',
    Ok: 'ok',
    Poor: 'poor',
} as const;

export type Visibility = typeof Visibility[keyof typeof Visibility];


export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
export type YesSensitiveDiaryEntry = Pick<DiaryEntry, 'id' | 'date' | 'visibility' | 'weather'>; 