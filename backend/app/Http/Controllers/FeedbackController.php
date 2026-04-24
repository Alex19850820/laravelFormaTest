<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Factories\FeedbackFactory;

class FeedbackController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        try {
            // Используем фабрику для выбора сервиса сохранения
            $factory = FeedbackFactory::create('database');
            $result = $factory->save($validated);

            if ($result) {
                return response()->json([
                    'success' => true,
                    'message' => 'Обращение успешно сохранено',
                    'data' => $validated
                ], 201);
            }
        } catch (\Exception $e) {
            \Log::error('Feedback save error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка сохранения обращения'
            ], 500);
        }
    }
}
