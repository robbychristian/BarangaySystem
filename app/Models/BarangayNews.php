<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BarangayNews extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'news_title',
        'news_description',
        'news_image',
    ];
}
