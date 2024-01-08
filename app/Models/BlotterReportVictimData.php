<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use OwenIt\Auditing\Auditable as AuditableTrait;

class BlotterReportVictimData extends Model implements Auditable
{
    use HasFactory;
    use AuditableTrait;

    protected $fillable = [
        'blotter_id',
        'name',
        'relation_to_suspect',
        'age',
        'gender',
        'occupation',
        'address',
        'email',
        'phone_number',
    ];
}
