<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WcuFeature extends Model
{
    use HasFactory;

    protected $table = 'wcu_features';

    protected $fillable = [
        'title',
        'description',
        'icon',
    ];
}