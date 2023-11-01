<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentSubmissionAdditionalInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_id',
        'document_type',
        'nature_of_business',
        'purpose_of_document',
        'file_name',
    ];
}
