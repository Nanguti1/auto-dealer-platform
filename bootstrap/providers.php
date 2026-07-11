<?php

use App\Providers\AppServiceProvider;
use App\Providers\CurrencyServiceProvider;
use App\Providers\EventServiceProvider;
use App\Providers\FortifyServiceProvider;

return [
    AppServiceProvider::class,
    CurrencyServiceProvider::class,
    EventServiceProvider::class,
    FortifyServiceProvider::class,
];
