<?php

namespace App\Services;

use App\Models\Feedbacks;
use Illuminate\Support\Facades\Log;

class DatabaseService
{
    public function save($data)
    {
        try {
            $feedback = Feedbacks::create($data);
            Log::info('Feedback успешно сохранён в БД', ['id' => $feedback->id]);
            return true;
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error('SQL ошибка при сохранении в БД: ' . $e->getMessage());
            return false;
        } catch (\Exception $e) {
            Log::error('Общая ошибка при сохранении: ' . $e->getMessage());
            return false;
        }
    }
}
