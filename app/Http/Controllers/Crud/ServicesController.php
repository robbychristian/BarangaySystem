<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\BlotterReport;
use App\Models\BlotterReportIncidentNarrative;
use App\Models\BlotterReportReportingPerson;
use App\Models\BlotterReportSuspectData;
use App\Models\BlotterReportVictimData;
use App\Models\DocumentSubmission;
use App\Models\DocumentSubmissionAdditionalInfo;
use App\Models\DocumentSubmissionPersonalInfo;
use App\Models\Payments;
use App\Models\ReservationForm;
use App\Models\ReservationFormAdditionalInfo;
use App\Models\ReservationFormPersonalInfo;
use App\Models\ReservationFormRequest;
use App\Models\User;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    public function getAllResidents()
    {
        return User::where("user_role", 4)->get();
    }

    public function addDocument(Request $request)
    {
        if ($request->hasFile('file')) {
            $fileName = $request->file->getClientOriginalName();
            $document = DocumentSubmission::create([
                'user_id' => $request->user_id
            ]);
            DocumentSubmissionPersonalInfo::create([
                'document_id' => $document->id,
                'name' => $request->name,
                'birth_date' => $request->birth_date,
                'age' => $request->age,
                'gender' => $request->gender,
                'civil_status' => $request->civil_status,
                'address' => $request->address,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
            ]);
            DocumentSubmissionAdditionalInfo::create([
                'document_id' => $document->id,
                'document_type' => $request->document_type,
                'nature_of_business' => $request->nature_of_business,
                'purpose_of_document' => $request->purpose_of_document,
                'file_name' => $fileName
            ]);

            if ($request->document_type == 'Barangay Clearance') {
                Payments::create([
                    'document_id' => $document->id,
                    'payment_price' => '150',
                    'is_paid' => 0
                ]);
            }

            $file = $request->file->move(public_path('image/DocumentSubmission/' . $request->user_id), $fileName);
            return $request;
        }
    }

    public function addBlotterReport(Request $request)
    {
        $blotter = BlotterReport::create([
            'user_id' => $request->user_id,
            'incident_type' => $request->incident_type,
        ]);

        BlotterReportReportingPerson::create([
            'blotter_id' => $blotter->id,
            'name' => $request->reporting_name,
            'date_time_report' => $request->reporting_date,
            'age' => $request->reporting_age,
            'gender' => $request->reporting_gender,
            'date_time_incident' => $request->reporting_incident_time,
            'address' => $request->reporting_address,
            'phone_number' => $request->reporting_phone
        ]);

        BlotterReportSuspectData::create([
            'blotter_id' => $blotter->id,
            'name' => $request->suspect_name,
            'relation_to_victim' => $request->suspect_relation,
            'age' => $request->suspect_age,
            'gender' => $request->suspect_gender,
            'occupation' => $request->suspect_occupation,
            'address' => $request->suspect_address,
        ]);

        BlotterReportVictimData::create([
            'blotter_id' => $blotter->id,
            'name' => $request->victim_name,
            'relation_to_suspect' => $request->victim_relation,
            'age' => $request->victim_age,
            'gender' => $request->victim_relation,
            'occupation' => $request->victim_occupation,
            'address' => $request->victim_address,
            'email' => $request->victim_email,
            'phone_number' => $request->victim_phone
        ]);

        BlotterReportIncidentNarrative::create([
            'blotter_id' => $blotter->id,
            'place_of_incident' => $request->narrative_place,
            'date_time_incident' => $request->narrative_date,
            'narrative' => $request->narrative
        ]);
    }

    public function addReservation(Request $request)
    {
        $reservation = ReservationForm::create([
            'user_id' => $request->user_id
        ]);
        ReservationFormPersonalInfo::create([
            'reservation_id' => $reservation->id,
            'name' => $request->personal_name,
            'birth_date' => $request->personal_birthday,
            'age' => $request->personal_age,
            'gender' => $request->personal_gender,
            'civil_status' => $request->personal_civil_status,
            'address' => $request->personal_address,
            'email' => $request->personal_email,
            'phone_number' => $request->personal_phone,
        ]);

        ReservationFormRequest::create([
            'reservation_id' => $reservation->id,
            'request_type' => $request->request_type,
            'request_item' => $request->request_item
        ]);

        ReservationFormAdditionalInfo::create([
            'reservation_id' => $reservation->id,
            'reservation_date_time' => $request->additional_date_time,
            'purpose' => $request->additional_purpose
        ]);
    }

    public function getAllDocuments()
    {
        return DocumentSubmission::with('personalInfo')->with('additionalInfo')->with('paymentInfo')->get();
    }
}
