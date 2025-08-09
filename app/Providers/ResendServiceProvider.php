<?php

namespace App\Providers;

use Resend\Resend;
use Illuminate\Support\ServiceProvider;

class ResendServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(Resend::class, function ($app) {
            return new Resend(env('RESEND_API_KEY'));
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
