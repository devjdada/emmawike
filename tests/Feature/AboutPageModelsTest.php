<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\Client;

class AboutPageModelsTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_and_retrieve_a_team_member()
    {
        $teamMember = TeamMember::factory()->create([
            'name' => 'John Doe',
            'title' => 'CEO',
        ]);

        $this->assertDatabaseHas('team_members', [
            'name' => 'John Doe',
            'title' => 'CEO',
        ]);

        $retrievedMember = TeamMember::find($teamMember->id);
        $this->assertEquals('John Doe', $retrievedMember->name);
    }

    /** @test */
    public function it_can_create_and_retrieve_a_testimonial()
    {
        $testimonial = Testimonial::factory()->create([
            'author_name' => 'Jane Smith',
            'content' => 'Great service!',
        ]);

        $this->assertDatabaseHas('testimonials', [
            'author_name' => 'Jane Smith',
            'content' => 'Great service!',
        ]);

        $retrievedTestimonial = Testimonial::find($testimonial->id);
        $this->assertEquals('Jane Smith', $retrievedTestimonial->author_name);
    }

    /** @test */
    public function it_can_create_and_retrieve_a_client()
    {
        $client = Client::factory()->create([
            'name' => 'ABC Corp',
        ]);

        $this->assertDatabaseHas('clients', [
            'name' => 'ABC Corp',
        ]);

        $retrievedClient = Client::find($client->id);
        $this->assertEquals('ABC Corp', $retrievedClient->name);
    }
}
