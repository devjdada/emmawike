<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\Client;

class AboutPageRouteTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_render_the_about_page_with_correct_data()
    {
        TeamMember::factory(5)->create();
        Testimonial::factory(5)->create();
        Client::factory(5)->create();

        $response = $this->get('/about');

        $response->assertStatus(200);

        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/About/Index')
            ->has('teamMembers', 5)
            ->has('testimonials', 5)
            ->has('clients', 5)
        );
    }
}
