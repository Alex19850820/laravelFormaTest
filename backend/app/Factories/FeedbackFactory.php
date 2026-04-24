<?php

namespace App\Factories;

use App\Services\DatabaseService;
use App\Services\EmailService;

class FeedbackFactory
{
    public static function create($storageType)
    {
        switch ($storageType) {
            case 'database':
                return new DatabaseService();
            case 'email':
                return new EmailService();
            default:
                throw new \InvalidArgumentException('Unsupported storage type: ' . $storageType);
        }
    }
}
