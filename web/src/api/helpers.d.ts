/**
 * Fetch list of cities from backend
 */
export declare function getBillingCities(): Promise<any>;
/**
 * Fetch list of districts for a specific city
 */
export declare function getBillingRegions(cityId: string): Promise<any>;
/**
 * Submit user data to backend
 */
export interface PostLeadNoteParams {
    cityId: number;
    cityName: string;
    districtId: number;
    districtName: string;
    fullName: string;
    telegramPhoneNumber: string;
    preferredLanguage?: string;
    telegramId?: number;
    telegramUsername?: string;
}
export declare function postLeadNote({ cityId, cityName, districtId, districtName, fullName, telegramPhoneNumber, preferredLanguage, telegramId, telegramUsername, }: PostLeadNoteParams): Promise<any>;
