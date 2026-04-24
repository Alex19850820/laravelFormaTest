<?php

namespace App\Services;

class EmailService
{
    public function save($data)
    {
        // В реальном проекте здесь будет отправка email
        \Log::info('Feedback sent via email', $data);
        Mail::to('admin@example.com')->send(new FeedbackMail($data));
        return true;
    }
}
