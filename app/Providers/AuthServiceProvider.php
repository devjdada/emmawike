<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Gate::define('is_admin', function ($user) {
            return $user->role === 'admin';
        });

        Gate::define('is_agency_owner', function ($user, $agency) {
            return $user->role === 'agency_owner' && $user->id === $agency->user_id;
        });

        Gate::define('is_agent', function ($user) {
            return $user->role === 'agent';
        });

        Gate::define('is_tenant', function ($user) {
            return $user->role === 'tenant';
        });

        Gate::define('is_owner', function ($user) {
            return $user->role === 'owner';
        });
    }
}
