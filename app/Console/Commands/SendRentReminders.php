<?php

namespace App\Console\Commands;

use App\Models\Tenant;
use App\Notifications\RentReminderNotification;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

class SendRentReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-rent-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sends rent reminders to tenants.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tenants = Tenant::whereMonth('start_date', '=', Carbon::now()->month)
            ->whereDay('start_date', '=', Carbon::now()->addDays(7)->day)
            ->get();

        foreach ($tenants as $tenant) {
            $tenant->user->notify(new RentReminderNotification($tenant->user->name, $tenant->property->location));
        }

        $this->info('Rent reminders sent successfully!');
    }
}
