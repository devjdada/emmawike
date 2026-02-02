<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ManagedProperty;
use App\Notifications\RentReminderNotification;
use Carbon\Carbon;

class SendRentReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:rent-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send rent reminders to tenants';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Sending rent reminders...');

        $twoMonthsFromNow = Carbon::now()->addMonths(2);
        $oneWeekFromNow = Carbon::now()->addWeek();

        // Find properties where rent is due in the next 2 months (for email)
        $propertiesForEmail = ManagedProperty::where('rent_due_date', '<=', $twoMonthsFromNow)
            ->where('rent_due_date', '>', $oneWeekFromNow)
            ->whereNull('end_date') // Only active tenants
            ->get();

        foreach ($propertiesForEmail as $managedProperty) {
            $managedProperty->tenant->notify(new RentReminderNotification($managedProperty, 'mail'));
            $this->info("Email reminder sent to: {$managedProperty->tenant->name}");
        }

        // Find properties where rent is due in the next week (for SMS)
        $propertiesForSms = ManagedProperty::where('rent_due_date', '<=', $oneWeekFromNow)
            ->where('rent_due_date', '>', Carbon::now())
            ->whereNull('end_date') // Only active tenants
            ->get();

        foreach ($propertiesForSms as $managedProperty) {
            $managedProperty->tenant->notify(new RentReminderNotification($managedProperty, 'sms'));
            $this->info("SMS reminder sent to: {$managedProperty->tenant->name}");
        }

        $this->info('Rent reminders sent successfully.');
    }
}