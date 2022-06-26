<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'category' => $this->category->title,
            'category_id' => $this->category_id,
            'thumbnail' => $this->thumbnail,
            'body' => substr($this->body, 0, 30) . '...',
            'created_at' => $this->created_at->toDateString(),
        ];
    }
}
