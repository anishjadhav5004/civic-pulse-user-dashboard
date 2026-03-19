import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LocationService {
    private readonly logger = new Logger(LocationService.name);

    async reverseGeocode(latitude: string | number, longitude: string | number): Promise<any> {
        try {
            // Nominatim OpenStreetMap API requires a User-Agent header
            const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'CivicPulseApp/1.0',
                    'Accept-Language': 'en'
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch address: ${response.statusText}`);
            }

            const data = await response.json();
            
            // Map the data from Nominatim format
            const address = data.address || {};
            return {
                area_name: address.suburb || address.neighbourhood || address.residential || address.village || null,
                city_name: address.city || address.town || address.county || null,
                district_name: address.state_district || address.county || null,
                state_name: address.state || null,
                pincode: address.postcode || null,
                country_code: (address.country_code || '').toUpperCase() || null,
                full_address: data.display_name
            };
        } catch (error) {
            this.logger.error(`Error during reverse geocoding: ${error.message}`, error.stack);
            // Return nulls so complaint creation doesn't fail if geocoding fails.
            return {
                area_name: null,
                city_name: null,
                district_name: null,
                state_name: null,
                pincode: null,
                country_code: null,
                full_address: null
            };
        }
    }
}
