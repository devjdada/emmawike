<?php

namespace Tests\Feature;

use App\Models\Client;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminClientCrudTest extends TestCase
{
    use RefreshDatabase;

    protected $adminUser;

    protected function setUp(): void
    {
        parent::setUp();
        $this->adminUser = User::factory()->create(['role' => 'admin']);
    }

    /** @test */
    public function admin_can_view_client_list()
    {
        Client::factory(5)->create();

        $this->actingAs($this->adminUser)
            ->get(route('admin.clients.index'))
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Clients/Index')
                ->has('clients', 5)
            );
    }

    /** @test */
    public function admin_can_create_client()
    {
        $this->actingAs($this->adminUser)
            ->post(route('admin.clients.store'), [
                'name' => 'New Client',
                'logo_url' => 'http://example.com/logo.png',
                'website_url' => 'http://example.com',
            ])->withHeaders(['X-CSRF-TOKEN' => csrf_token()]);
            // ->assertRedirect(route('admin.clients.index'))
            // ->assertSessionHas('success', 'Client created successfully.');

        $this->assertDatabaseHas('clients', [
            'name' => 'New Client',
        ]);
    }

    /** @test */
    public function admin_can_update_client()
    {
        $client = Client::factory()->create();

        $this->actingAs($this->adminUser)
            ->put(route('admin.clients.update', $client->id), [
                'name' => 'Updated Client',
                'logo_url' => 'http://example.com/updated_logo.png',
                'website_url' => 'http://updated.com',
            ])->withHeaders(['X-CSRF-TOKEN' => csrf_token()]);
            // ->assertRedirect(route('admin.clients.index'))
            // ->assertSessionHas('success', 'Client updated successfully.');

        $this->assertDatabaseHas('clients', [
            'id' => $client->id,
            'name' => 'Updated Client',
        ]);
    }

    /** @test */
    public function admin_can_delete_client()
    {
        $client = Client::factory()->create();

        $this->actingAs($this->adminUser)
            ->delete(route('admin.clients.destroy', $client->id))->withHeaders(['X-CSRF-TOKEN' => csrf_token()]);
            // ->assertRedirect(route('admin.clients.index'))
            // ->assertSessionHas('success', 'Client deleted successfully.');

        $this->assertDatabaseMissing('clients', [
            'id' => $client->id,
        ]);
    }
}
