<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use OwenIt\Auditing\Models\Audit;

class AuditTrailController extends Controller
{
    public function getAllAudit()
    {
        $audits = DB::table("users")
            ->join('audits', 'audits.user_id', 'users.id')
            ->get();
        return $audits;
    }
}
