<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $guarded = [];

    protected $casts = [
        'tags' => 'array',
        'featured' => 'boolean',
    ];

    protected $appends = [
        'imageUrl',
    ];

    public function getImageUrlAttribute(): ?string
    {
        if (!$this->imageFilename) {
            return null;
        }

        if (str_starts_with($this->imageFilename, 'http://') || str_starts_with($this->imageFilename, 'https://')) {
            return $this->imageFilename;
        }

        $cleanPath = ltrim($this->imageFilename, '/');
        $cleanPath = preg_replace('#^(storage/|public/|storage/app/public/)#', '', $cleanPath);
        return 'https://raajis.com/raji-backend/storage/app/public/' . $cleanPath;
    }
}
