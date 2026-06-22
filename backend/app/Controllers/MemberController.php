<?php

namespace App\Controllers;

use App\Models\UserModel;

class MemberController extends BaseController
{
    public function index()
    {
        $model = new UserModel();

        return $this->response->setJSON(
            $model->findAll()
        );
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

        return $this->response->setJSON([
            'status'=>true
        ]);
    }

    public function delete($id)
    {
        $model = new UserModel();

        $model->delete($id);

        return $this->response->setJSON([
            'status'=>true
        ]);
    }
}