<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    public $incrementing = false;
    public $keyType = 'string';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->{$model->getKeyName()} = (string) \Illuminate\Support\Str::uuid();
        });
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'agency_id',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function properties()
    {
        return $this->hasMany(Property::class);
    }

    public function blogs()
    {
        return $this->hasMany(Blog::class);
    }

    public function agency()
    {
        return $this->belongsTo(Agency::class);
    }

    public function tenants()
    {
        return $this->hasMany(Tenant::class);
    }

    public function owners()
    {
        return $this->hasMany(Owner::class);
    }

    public function complaints()
    {
        return $this->hasMany(Complaint::class, 'created_by');
    }

    public function isTenant()
    {
        return $this->role === 'tenant';
    }

    public function isOwner()
    {
        return $this->role === 'owner';
    }

    public function compensationEvaluations()
    {
        return $this->hasMany(CompensationEvaluation::class);
    }
}
