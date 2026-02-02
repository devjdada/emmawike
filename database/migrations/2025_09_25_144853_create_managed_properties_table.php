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
        Schema::create('managed_properties', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('property_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('owner_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('tenant_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('rent_agreement_id')->nullable()->constrained()->onDelete('set null');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->date('rent_due_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('managed_properties');
    }
};
