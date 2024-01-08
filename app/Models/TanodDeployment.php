<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use OwenIt\Auditing\Auditable as AuditableTrait;
class TanodDeployment extends Model implements Auditable
{
    use AuditableTrait;
    use HasFactory;

    protected $fillable = [
        'tanod1_id',
        'tanod2_id',
        'date_time_deployment',
        'description',
        'coordinates_lat',
        'coordinates_lng',
    ];
}
