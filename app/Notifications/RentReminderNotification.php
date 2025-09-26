<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\ManagedProperty;

class RentReminderNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $managedProperty;
    protected $channel;

    /**
     * Create a new notification instance.
     */
    public function __construct(ManagedProperty $managedProperty, string $channel)
    {
        $this->managedProperty = $managedProperty;
        $this->channel = $channel;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return [$this->channel];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->subject('Rent Payment Reminder')
                    ->line('Hello ' . $notifiable->name . ',')
                    ->line('This is a friendly reminder that your rent for the property ' . $this->managedProperty->property->name . ' is due on ' . $this->managedProperty->rent_due_date . '.')
                    ->line('Thank you for your prompt payment.');
    }

    /**
     * Get the SMS representation of the notification.
     */
    public function toSms(object $notifiable): string
    {
        return 'Hello ' . $notifiable->name . ', your rent for ' . $this->managedProperty->property->name . ' is due on ' . $this->managedProperty->rent_due_date . '.';
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}