<?php

namespace Tests\Feature;

use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminTestimonialCrudTest extends TestCase
{
    use RefreshDatabase;

    protected $adminUser;

    protected function setUp(): void
    {
        parent::setUp();
        $this->adminUser = User::factory()->create(['role' => 'admin']);
    }

    /** @test */
    public function admin_can_view_testimonial_list()
    {
        Testimonial::factory(5)->create();

        $this->actingAs($this->adminUser)
            ->get(route('admin.testimonials.index'))
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Testimonials/Index')
                ->has('testimonials', 5)
            );
    }

    /** @test */
    public function admin_can_create_testimonial()
    {
        $this->actingAs($this->adminUser)
            ->post(route('admin.testimonials.store'), [
                'author_name' => 'New Author',
                'author_title' => 'Client',
                'content' => 'This is a new testimonial.',
                'photo_url' => 'http://example.com/testimonial.jpg',
            ])->withHeaders(['X-CSRF-TOKEN' => csrf_token()]);
            // ->assertRedirect(route('admin.testimonials.index'))
            // ->assertSessionHas('success', 'Testimonial created successfully.');

        $this->assertDatabaseHas('testimonials', [
            'author_name' => 'New Author',
            'content' => 'This is a new testimonial.',
        ]);
    }

    /** @test */
    public function admin_can_update_testimonial()
    {
        $testimonial = Testimonial::factory()->create();

        $this->actingAs($this->adminUser)
            ->put(route('admin.testimonials.update', $testimonial->id), [
                'author_name' => 'Updated Author',
                'author_title' => 'Updated Title',
                'content' => 'This is an updated testimonial.',
                'photo_url' => 'http://example.com/updated_testimonial.jpg',
            ])->withHeaders(['X-CSRF-TOKEN' => csrf_token()]);
            // ->assertRedirect(route('admin.testimonials.index'))
            // ->assertSessionHas('success', 'Testimonial updated successfully.');

        $this->assertDatabaseHas('testimonials', [
            'id' => $testimonial->id,
            'author_name' => 'Updated Author',
            'content' => 'This is an updated testimonial.',
        ]);
    }

    /** @test */
    public function admin_can_delete_testimonial()
    {
        $testimonial = Testimonial::factory()->create();

        $this->actingAs($this->adminUser)
            ->delete(route('admin.testimonials.destroy', $testimonial->id))->withHeaders(['X-CSRF-TOKEN' => csrf_token()]);
            // ->assertRedirect(route('admin.testimonials.index'))
            // ->assertSessionHas('success', 'Testimonial deleted successfully.');

        $this->assertDatabaseMissing('testimonials', [
            'id' => $testimonial->id,
        ]);
    }
}
