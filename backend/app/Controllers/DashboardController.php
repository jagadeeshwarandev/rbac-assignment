<?php

namespace App\Controllers;

use App\Models\UserModel;

class DashboardController extends BaseController
{
public function index()
{
    $userModel = new UserModel();

    return $this->response->setJSON([
        'total_users' =>
            $userModel->countAll(),

        'total_admins' =>
            $userModel
                ->where('role', 'admin')
                ->countAllResults(),

        'total_managers' =>
            (new UserModel())
                ->where('role', 'manager')
                ->countAllResults(),

        'total_members' =>
            (new UserModel())
                ->where('role', 'member')
                ->countAllResults()
    ]);
}
}