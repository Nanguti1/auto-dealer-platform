<?php

namespace Database\Factories;

use App\Models\BlogComment;
use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BlogComment>
 */
class BlogCommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['pending', 'approved', 'rejected', 'spam'];

        return [
            'blog_post_id' => BlogPost::factory(),
            'user_id' => fake()->boolean(70) ? User::factory() : null,
            'name' => fake()->name(),
            'email' => fake()->email(),
            'body' => fake()->paragraphs(3, true),
            'status' => fake()->randomElement($statuses),
        ];
    }
}
