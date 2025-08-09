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
        Schema::create('rent_agreements', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('property_id')->constrained('properties')->onDelete('cascade');
            $table->date('start_date');
            $table->date('end_date');
            $table->decimal('monthly_rent', 12, 2);
            $table->decimal('deposit', 12, 2);
            $table->string('agreement_pdf_url', 500)->nullable();
            $table->string('status', 50)->default('active');
            $table->boolean('is_renewed')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rent_agreements');
    }
};
