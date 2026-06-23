<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */

$routes->get('/', 'Home::index');
$routes->post('auth/register', 'AuthController::register');
$routes->post('auth/login', 'AuthController::login');
$routes->get('test', function () {
    return 'working';
});
$routes->get('dashboard', 'DashboardController::index');
$routes->get('members', 'MemberController::index');
$routes->get('members/(:num)', 'MemberController::show/$1');
$routes->post('members', 'MemberController::create');
$routes->put('members/(:num)', 'MemberController::update/$1');
$routes->delete('members/(:num)', 'MemberController::delete/$1');
$routes->get(
    'auth/profile',
    'AuthController::profile'
);