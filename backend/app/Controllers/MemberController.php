<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Models\AuditLogModel;
class MemberController extends BaseController
{
    public function index()
    {
        $model = new UserModel();

        $page =
        $this->request->getGet('page') ?? 1;

        $data =
        $model
        ->orderBy('name', 'ASC')
        ->paginate(
            5,
            'default',
            $page
        );

        return $this->response->setJSON([
            'data' => $data,
            'pager' => [
                'currentPage' => $page
            ]
        ]);
    }

    public function create()
    {
        $model = new UserModel();

        $data = $this->request->getJSON(true);

        $data['password'] = password_hash(
            $data['password'],
            PASSWORD_BCRYPT
        );

        $model->insert($data);
        $this->logAction(
            'Admin',
            'CREATE',
            $data['name']
        );
        return $this->response->setJSON([
            'status'=>true
        ]);
    }

    public function show($id)
    {
        $model = new UserModel();

        return $this->response->setJSON(
            $model->find($id)
        );
    }

    public function update($id)
    {
        $model = new UserModel();

        $data = $this->request->getJSON(true);

        $model->update($id,$data);
        $this->logAction(
            'Admin',
            'UPDATE',
            $id
        );
        return $this->response->setJSON([
            'status'=>true
        ]);
    }

    public function delete($id)
    {
        $model = new UserModel();

        $model->delete($id);
        $this->logAction(
            'Admin',
            'DELETE',
            $id
        );
        return $this->response->setJSON([
            'status'=>true
        ]);
    }
private function logAction(
    $user,
    $action,
    $resource
)
{
    $log = new AuditLogModel();

    $log->insert([
        'user' => $user,
        'action' => $action,
        'resource' => $resource
    ]);
}

}