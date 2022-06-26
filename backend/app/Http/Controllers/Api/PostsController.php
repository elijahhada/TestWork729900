<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostsResource;
use App\Models\Post;

class PostsController extends Controller
{
    public function index()
    {
        $posts = Post::with('category')
            ->when(request('category'), function ($query) {
                $query->where('category_id', request('category'));
            })
            ->paginate(2);

        return PostsResource::collection($posts);
    }

    public function store(StorePostRequest $request)
    {
        $post = Post::create($request->validated());

        if($request->hasFile('thumbnail')) {
            $fileName = time() . '_' . $request->file('thumbnail')->getClientOriginalName();
            $filePath = $request->file('thumbnail')->storeAs('images', $fileName, 'public');
            $post->thumbnail = 'storage/' . $filePath;
            $post->save();
        }

        return new PostsResource($post);
    }

    public function show(Post $post)
    {
        return new PostsResource($post);
    }

    public function update(StorePostRequest $request, Post $post)
    {
        $post->update($request->validated());

        if($request->hasFile('thumbnail')) {
            $fileName = time() . '_' . $request->file('thumbnail')->getClientOriginalName();
            $filePath = $request->file('thumbnail')->storeAs('images', $fileName, 'public');
            $post->thumbnail = 'storage/' . $filePath;
            $post->save();
        }

        return new PostsResource($post);
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return response()->noContent();
    }
}
