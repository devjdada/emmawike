<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('valuations', function (Blueprint $table) {
            $table->uuid('id')->primary(); // UUID primary key
            $table->uuid('compensation_id'); // Foreign key to compensations table
            $table->foreign('compensation_id')->references('id')->on('compensations')->onDelete('cascade');

            $table->text('description')->nullable();
            $table->string('evaluation_type'); // e.g., 'crop', 'machine', 'land', 'property'

            // Crop specific fields
            $table->string('crop_type')->nullable();
            $table->decimal('area_acres', 10, 2)->nullable();
            $table->decimal('yield_per_acre', 10, 2)->nullable();
            $table->decimal('market_price_per_unit', 10, 2)->nullable();
            $table->decimal('damage_percentage', 5, 2)->nullable();

            // Machine specific fields
            $table->string('machine_type')->nullable();
            $table->string('model')->nullable();
            $table->integer('manufacture_year')->nullable();
            $table->decimal('current_value', 15, 2)->nullable();
            $table->decimal('depreciation_rate', 5, 2)->nullable();

            // Land specific fields
            $table->string('land_use_type')->nullable();
            $table->decimal('area_sqft', 15, 2)->nullable();
            $table->text('location_description')->nullable();
            $table->string('zoning_regulations')->nullable();
            $table->string('soil_quality')->nullable();

            // Property specific fields (from original compensation_evaluations)
            $table->integer('number_of_units')->nullable();
            $table->integer('construction_year')->nullable();
            $table->string('condition')->nullable(); // e.g., 'excellent', 'good', 'fair', 'poor'
            $table->decimal('renovation_cost', 15, 2)->nullable();

            // Common valuation fields
            $table->decimal('rate', 10, 2)->nullable();
            $table->decimal('value', 15, 2)->nullable();
            $table->string('complete_level')->nullable(); // e.g., 'partial', 'complete'
            $table->decimal('complete_amount', 15, 2)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('valuations');
    }
};
