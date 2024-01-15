<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use App\Models\BlotterReport;
use App\Models\ClinicSchedule;
use App\Models\DocumentSubmission;
use App\Models\ReservationForm;
use App\Models\User;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    public function index()
    {
        // Users
        $userRoles = ['2', '3', '4'];
        $totalUsersPerRole = [];

        foreach ($userRoles as $key => $value) {
            $totalUsersPerRole[] = User::where('user_role', $value)
                ->count();
        }

        // E-Services
        $type = [
            'Document Submission',
            'Blotter Reports',
            'Facilities, Equiment and Vehicular Reservations',
            'Clinic',
        ];
        $totalPerType = [];
        // $totalPerType = ['4', '10', '30', '20', '50'];
        $documentSubmissions = DocumentSubmission::count();
        $blotterReports = BlotterReport::count();
        $reservations = ReservationForm::count();
        $clinicSchedules = ClinicSchedule::count();

        array_push($totalPerType, strval($documentSubmissions));
        array_push($totalPerType, strval($blotterReports));
        array_push($totalPerType, strval($reservations));
        array_push($totalPerType, strval($clinicSchedules));
        dd($totalPerType);

        return view('features.Analytics.Analytics', compact('totalUsersPerRole', 'type', 'totalPerType'));
    }
}
