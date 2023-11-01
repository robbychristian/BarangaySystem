<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentSubmissionPersonalInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_id',
        'name',
        'birth_date',
        'age',
        'gender',
        'civil_status',
        'address',
        'email',
        'phone_number',
    ];
}
