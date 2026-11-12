<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    // GET /api/blogs
    public function index(Request $request)
    {
        $query = Blog::query();

        // Category filtering: /api/blogs?category=Tradition
        if ($request->filled('category') && $request->query('category') !== 'All') {
            $query->where('category', $request->query('category'));
        }

        // Featured filtering: /api/blogs?featured=1
        if ($request->filled('featured')) {
            $query->where('featured', filter_var($request->query('featured'), FILTER_VALIDATE_BOOLEAN));
        }

        // Search filtering: /api/blogs?search=...
        if ($request->filled('search')) {
            $term = '%' . $request->query('search') . '%';
            $query->where(function ($q) use ($term) {
                $q->where('title', 'like', $term)
                  ->orWhere('excerpt', 'like', $term)
                  ->orWhere('category', 'like', $term);
            });
        }

        // Return latest blogs first
        return response()->json(
            $query->orderBy('created_at', 'desc')->get()
        );
    }

    // GET /api/blogs/{slug}
    public function show($slug)
    {
        $blog = Blog::where('slug', $slug)->firstOrFail();
        return response()->json($blog);
    }
}
