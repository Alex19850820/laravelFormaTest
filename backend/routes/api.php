<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FeedbackController;

Route::post('/feedback', [FeedbackController::class, 'store']);
