<?php

namespace Tests\Feature;

use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminTeamMemberCrudTest extends TestCase
{
    use RefreshDatabase;

    protected $adminUser;

    protected function setUp(): void
    {
        parent::setUp();
        $this->adminUser = User::factory()->create(['role' => 'admin']);
    }

    /** @test */
    public function admin_can_view_team_member_list()
    {
        TeamMember::factory(5)->create();

        $this->actingAs($this->adminUser)
            ->get(route('admin.teams.index'))
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Team/Index')
                ->has('teamMembers', 5)
            );
    }

    /** @test */
    public function admin_can_create_team_member()
    {
        $this->actingAs($this->adminUser)
            ->post(route('admin.teams.store'), [
                'name' => 'New Team Member',
                'title' => 'Developer',
                'photo_url' => 'http://example.com/photo.jpg',
                'bio' => 'A short bio.',
            ])->withHeaders(['X-CSRF-TOKEN' => csrf_token()]);
            // ->assertRedirect(route('admin.teams.index'))
            // ->assertSessionHas('success', 'Team member created successfully.');

        $this->assertDatabaseHas('team_members', [
            'name' => 'New Team Member',
            'title' => 'Developer',
        ]);
    }

    /** @test */
    public function admin_can_update_team_member()
    {
        $teamMember = TeamMember::factory()->create();

        $this->actingAs($this->adminUser)
            ->put(route('admin.teams.update', $teamMember->id), [
                'name' => 'Updated Name',
                'title' => 'Updated Title',
                'photo_url' => 'http://example.com/updated_photo.jpg',
                'bio' => 'An updated bio.',
            ])->withHeaders(['X-CSRF-TOKEN' => csrf_token()]);
            // ->assertRedirect(route('admin.teams.index'))
            // ->assertSessionHas('success', 'Team member updated successfully.');

        $this->assertDatabaseHas('team_members', [
            'id' => $teamMember->id,
            'name' => 'Updated Name',
            'title' => 'Updated Title',
        ]);
    }

    /** @test */
    public function admin_can_delete_team_member()
    {
        $teamMember = TeamMember::factory()->create();

        $this->actingAs($this->adminUser)
            ->delete(route('admin.teams.destroy', $teamMember->id))->withHeaders(['X-CSRF-TOKEN' => csrf_token()]);
            // ->assertRedirect(route('admin.teams.index'))
            // ->assertSessionHas('success', 'Team member deleted successfully.');

        $this->assertDatabaseMissing('team_members', [
            'id' => $teamMember->id,
        ]);
    }
}
