<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use OwenIt\Auditing\Auditable as AuditableTrait;

class BarangayNews extends Model implements Auditable
{
    use AuditableTrait;
    use HasFactory;
    protected $fillable = [
        'user_id',
        'news_title',
        'news_description',
        'news_image',
    ];
}
