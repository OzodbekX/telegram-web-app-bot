// api/helpers.ts
const API_BASE_URL = import.meta.env.VITE_APIGET_AVAY;
/**
 * Fetch list of cities from backend
 */
export async function getBillingCities() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/addresses/cities/public`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // Avoid Next.js caching if you want fresh data each time
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch cities: ${res.status}`);
        }
        const data = await res.json();
        // Expecting format: [{ id: string, name: string }]
        console.log({ data });
        return data?.data;
    }
    catch (error) {
        console.error("getBillingCities error:", error);
        return [];
    }
}
/**
 * Fetch list of districts for a specific city
 */
export async function getBillingRegions(cityId) {
    if (!cityId)
        return [];
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/addresses/districts/public?cityId=${cityId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch districts for ${cityId}: ${res.status}`);
        }
        const data = await res.json();
        // Expecting format: [{ id: string, name: string }]
        return data?.data;
    }
    catch (error) {
        console.error("getBillingRegions error:", error);
        return [];
    }
}
export async function postLeadNote({ cityId, cityName, districtId, districtName, fullName, telegramPhoneNumber, preferredLanguage, telegramId, telegramUsername, }) {
    try {
        const res = await fetch(`${import.meta.env.VITE_APIGET_AVAY}/api/v1/users/myturonbot/send-data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cityId,
                cityName,
                districtId,
                districtName,
                fullName,
                telegramPhoneNumber: telegramPhoneNumber?.replaceAll(" ", ""),
                preferredLanguage,
                telegramId,
                telegramUsername,
            }),
        });
        if (!res.ok) {
            throw new Error(`Failed to post lead note: ${res.status}`);
        }
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.error("postLeadNote error:", error);
        return null;
    }
}
