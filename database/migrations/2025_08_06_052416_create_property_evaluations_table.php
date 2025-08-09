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
        Schema::create('property_evaluations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('property_id')->nullable()->constrained()->onDelete('set null');
            $table->string('building_type');
            $table->integer('number_of_units')->nullable();
            $table->integer('construction_year');
            $table->string('condition');
            $table->decimal('renovation_cost', 15, 2)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_evaluations');
    }
};
