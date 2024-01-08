<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use OwenIt\Auditing\Auditable as AuditableTrait;

class UserProfile extends Model implements Auditable
{
    use HasFactory;
    use AuditableTrait;

    protected $fillable = [
        'user_id',
        'birthday',
        'age',
        'gender',
        'civil_status',
        'address',
        'phone_number',
    ];

    public function ownedBy()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
