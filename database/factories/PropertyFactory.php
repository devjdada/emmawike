<?php

namespace Database\Factories;

use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PropertyFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Property::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'id' => $this->faker->uuid(),
            'owner_id' => User::factory(),
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(3),
            'type' => $this->faker->randomElement(['House', 'Apartment', 'Penthouse', 'Villa', 'Estate', 'Loft']),
            'price' => $this->faker->randomFloat(2, 100000, 5000000),
            'currency' => $this->faker->randomElement(['NGN', 'USD', 'EUR']),
            'address_line1' => $this->faker->streetAddress(),
            'address_line2' => $this->faker->secondaryAddress(),
            'city' => $this->faker->city(),
            'state' => $this->faker->state(),
            'country' => $this->faker->country(),
            'zip_code' => $this->faker->postcode(),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
            'bedrooms' => $this->faker->numberBetween(1, 6),
            'bathrooms' => $this->faker->numberBetween(1, 5),
            'area_sq_ft' => $this->faker->numberBetween(500, 5000),
            'status' => $this->faker->randomElement(['available', 'published', 'draft', 'archived']),
            'is_featured' => $this->faker->boolean(),
            'image_url' => $this->faker->imageUrl(),
        ];
    }
}