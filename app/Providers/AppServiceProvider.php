<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // View::share('test', 'deptraivkl');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
         $this->app->register(ComposerServiceProvider::class);
    }
}
