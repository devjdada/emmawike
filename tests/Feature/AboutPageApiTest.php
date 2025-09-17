<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\Client;

class AboutPageApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_get_all_team_members()
    {
        TeamMember::factory(3)->create();
        $response = $this->getJson('/api/team-members');
        $response->assertStatus(200)->assertJsonCount(3, 'data');
    }

    /** @test */
    public function it_can_get_a_single_team_member()
    {
        $member = TeamMember::factory()->create();
        $response = $this->getJson('/api/team-members/' . $member->id);
        $response->assertStatus(200)->assertJson(['data' => ['id' => $member->id]]);
    }

    /** @test */
    public function it_can_get_all_testimonials()
    {
        Testimonial::factory(3)->create();
        $response = $this->getJson('/api/testimonials');
        $response->assertStatus(200)->assertJsonCount(3, 'data');
    }

    /** @test */
    public function it_can_get_a_single_testimonial()
    {
        $testimonial = Testimonial::factory()->create();
        $response = $this->getJson('/api/testimonials/' . $testimonial->id);
        $response->assertStatus(200)->assertJson(['data' => ['id' => $testimonial->id]]);
    }

    /** @test */
    public function it_can_get_all_clients()
    {
        Client::factory(3)->create();
        $response = $this->getJson('/api/clients');
        $response->assertStatus(200)->assertJsonCount(3, 'data');
    }

    /** @test */
    public function it_can_get_a_single_client()
    {
        $client = Client::factory()->create();
        $response = $this->getJson('/api/clients/' . $client->id);
        $response->assertStatus(200)->assertJson(['data' => ['id' => $client->id]]);
    }
}
