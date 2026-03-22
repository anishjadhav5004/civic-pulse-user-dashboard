import { CommandHandler } from "@nestjs/cqrs";
import { AddComplaint } from "../commands/add-complaint.command";
import { Complaint } from "../../../postgress/entities/cc-complaint.entity";
import { ComplaintAddress } from "../../../postgress/entities/cc-complaint-address.entity";
import { LocationService } from "../../../services/location.service";
import { IComplaintRepository } from "../../../postgress/repositories/complaint.repository";

@CommandHandler(AddComplaint)
export class CreateComplaintHandler {
    constructor(
        private readonly locationService: LocationService,
        private readonly repository: IComplaintRepository
    ) { }

    async execute(command: AddComplaint) {
        const complaint = command.complaint;

        const address: ComplaintAddress = new ComplaintAddress();

        // Fetch detailed address data using reverse geocoding
        const geocode = await this.locationService.reverseGeocode(
            complaint.address.latitude,
            complaint.address.longitude
        );

        address.latitude = parseFloat(complaint.address.latitude);
        address.longitude = parseFloat(complaint.address.longitude);
        address.areaName = geocode.area_name;
        address.cityName = geocode.city_name;
        address.districtName = geocode.district_name;
        address.stateName = geocode.state_name;
        address.pincode = geocode.pincode;
        address.countryCode = geocode.country_code;

        const newComplaint: Complaint = new Complaint();

        newComplaint.complaintNumber = complaint.complaint_number;
        newComplaint.complaintTitle = complaint.complaint_title;
        newComplaint.visibility = complaint.visibility;
        newComplaint.createdAt = complaint.created_at;
        newComplaint.priority = complaint.priority;
        newComplaint.description = complaint.description;
        newComplaint.reportedBy = complaint.reported_by;

        // 1. Save Address via the custom repository
        const savedAddress = await this.repository.saveAddress(address);

        // Link the saved address to the complaint
        newComplaint.addressUid = savedAddress.uid;

        // 2. Save Complaint via the custom repository
        const savedComplaint = await this.repository.saveComplaint(newComplaint);

        return savedComplaint;
    }

}