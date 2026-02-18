import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SmartwatchDataset {
    records: Array<SmartwatchRecord>;
    originalFormat: string;
    name: string;
    uploadTime: Time;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export interface SmartwatchRecord {
    calories?: number;
    distance?: number;
    sleep?: bigint;
    steps?: bigint;
    heartRate?: bigint;
    timestamp: Time;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addSmartwatchDataset(dataset: SmartwatchDataset): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    filterDatasetsByMetric(metric: string, minValue: number | null, maxValue: number | null): Promise<Array<SmartwatchDataset>>;
    getAllUserDatasets(): Promise<Array<SmartwatchDataset>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyDatasets(): Promise<Array<SmartwatchDataset>>;
    getUserDatasets(user: Principal): Promise<Array<SmartwatchDataset>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
