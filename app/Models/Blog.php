<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Blog extends Model
{
    use HasFactory, SoftDeletes;

    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'user_id',
        'title',
        'content',
        'image_url',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
