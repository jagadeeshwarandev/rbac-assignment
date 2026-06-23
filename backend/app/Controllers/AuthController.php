<?php

namespace App\Controllers;

use App\Models\UserModel;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
class AuthController extends BaseController
{
    public function register()
    {
        $userModel = new UserModel();

        $data = [
            'name' => $this->request->getJSON()->name,
            'email' => $this->request->getJSON()->email,
            'phone' => $this->request->getJSON()->phone,
            'role' => $this->request->getJSON()->role,
            'password' => password_hash(
                $this->request->getJSON()->password,
                PASSWORD_BCRYPT
            )
        ];

        $userModel->insert($data);

        return $this->response->setJSON([
            'status' => true,
            'message' => 'User Registered'
        ]);
    }

    public function login()
    {
        $userModel = new UserModel();

        $email = $this->request->getJSON()->email;
        $password = $this->request->getJSON()->password;

        $user = $userModel
                    ->where('email',$email)
                    ->first();

        if(!$user)
        {
            return $this->response->setJSON([
                'status'=>false,
                'message'=>'User Not Found'
            ]);
        }

        if(!password_verify(
            $password,
            $user['password']
        ))
        {
        return $this->response
            ->setStatusCode(401)
            ->setJSON([
                'status'=>false,
                'message'=>'Invalid Password'
            ]);
        }
        $payload = [
            'id' => $user['id'],
            'email' => $user['email'],
            'role' => $user['role'],
            'exp' => time() + (60 * 15)
        ];

        $secretKey = 'my_super_secret_jwt_key_2026_for_rbac_assignment_project';

        $token = JWT::encode(
            $payload,
            $secretKey,
            'HS256'
        );  

        return $this->response->setJSON([
            'status' => true,
            'access_token' => $token,
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'role' => $user['role']
            ]
        ]);
        // return $this->response->setJSON([
        //     'status'=>true,
        //     'message'=>'Login Success',
        //     'user'=>$user
        // ]);
    }
    public function profile()
    {
        $userModel = new UserModel();

        $user = $userModel->find(2);

        return $this->response->setJSON($user);
    }
}