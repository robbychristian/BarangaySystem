<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    use HasFactory;

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
