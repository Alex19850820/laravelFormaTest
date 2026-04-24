<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/test-feedback', function () {
    \App\Models\Feedback::create([
        'name' => 'Тест Пользователь',
        'message' => 'Тестовое сообщение'
    ]);
    return 'Данные сохранены!';
});
