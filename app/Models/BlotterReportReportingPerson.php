<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlotterReportReportingPerson extends Model
{
    use HasFactory;

    protected $fillable = [
        'blotter_id',
        'name',
        'date_time_report',
        'age',
        'gender',
        'date_time_incident',
        'address',
        'phone_number',
    ];
}
