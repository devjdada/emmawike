<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Resend\Laravel\Mail\ResendMailMessage;

class RentReminderNotification extends Notification
{
    use Queueable;

    protected $tenantName;
    protected $propertyAddress;

    /**
     * Create a new notification instance.
     */
    public function __construct($tenantName, $propertyAddress)
    {
        $this->tenantName = $tenantName;
        $this->propertyAddress = $propertyAddress;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['resend'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toResend(object $notifiable): ResendMailMessage
    {
        return (new ResendMailMessage)
            ->from('onboarding@resend.dev', 'Emma Wika Real Estate')
            ->to($notifiable->email)
            ->subject('Rent Reminder for ' . $this->propertyAddress)
            ->html('Hello <strong>' . $this->tenantName . '</strong>,<br><br>This is a friendly reminder that your rent for the property at <strong>' . $this->propertyAddress . '</strong> is due soon.<br><br>Thank you!');
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
