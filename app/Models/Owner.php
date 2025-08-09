<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Owner extends Model
{
    use HasFactory, SoftDeletes;

    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function properties()
    {
        return $this->hasMany(Property::class, 'user_id');
    }
}
