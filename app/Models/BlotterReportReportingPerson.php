<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use OwenIt\Auditing\Auditable as AuditableTrait;
class BlotterReportReportingPerson extends Model implements Auditable
{
    use HasFactory;
    use AuditableTrait;

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
