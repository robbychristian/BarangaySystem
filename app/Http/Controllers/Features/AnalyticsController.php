<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
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
            'Transactions'
        ];
        $totalPerType = ['4', '10', '30', '20', '50'];

        return view('features.Analytics.Analytics', compact('totalUsersPerRole', 'type', 'totalPerType'));
    }
}
