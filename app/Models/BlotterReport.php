<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use OwenIt\Auditing\Auditable as AuditableTrait;


class BlotterReport extends Model implements Auditable
{
    use AuditableTrait;
    use HasFactory;

    protected $fillable = [
        'user_id',
        'incident_type',
    ];

    public function reportingPerson()
    {
        return $this->hasOne(BlotterReportReportingPerson::class, 'blotter_id', 'id');
    }

    public function suspectData()
    {
        return $this->hasOne(BlotterReportSuspectData::class, 'blotter_id', 'id');
    }

    public function victimData()
    {
        return $this->hasOne(BlotterReportVictimData::class, 'blotter_id', 'id');
    }

    public function incidentNarrative()
    {
        return $this->hasOne(BlotterReportIncidentNarrative::class, 'blotter_id', 'id');
    }
}
