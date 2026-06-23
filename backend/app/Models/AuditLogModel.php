<?php

namespace App\Models;

use CodeIgniter\Model;

class AuditLogModel extends Model
{
    protected $table = 'audit_logs';

    protected $allowedFields = [
        'user',
        'action',
        'resource'
    ];
}