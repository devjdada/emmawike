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
        // Create users table first
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('role')->default('agent');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });

        // Create agencies table
        Schema::create('agencies', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('logo_url')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // Add agency_id foreign key to users table (after agencies exist)
        Schema::table('users', function (Blueprint $table) {
            $table->foreignUuid('agency_id')->nullable()->after('role')->constrained('agencies')->onDelete('set null');
        });

        // password_reset_tokens table
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // sessions table
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignUuid('user_id')->nullable()->index()->constrained('users')->onDelete('cascade');
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });

        // properties table
        Schema::create('properties', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('owner_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->string('type');
            $table->decimal('price', 15, 2);
            $table->string('currency');
            $table->string('address_line1');
            $table->string('address_line2')->nullable();
            $table->string('city');
            $table->string('state');
            $table->string('country');
            $table->string('zip_code')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->integer('bedrooms')->nullable();
            $table->integer('bathrooms')->nullable();
            $table->integer('area_sq_ft')->nullable();
            $table->string('status');
            $table->boolean('is_featured')->default(false);
            $table->string('image_url')->nullable();
            $table->unsignedBigInteger('views')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });

        // property_media table
        Schema::create('property_media', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('property_id')->constrained('properties')->onDelete('cascade');
            $table->string('path');
            $table->string('type')->default('image');
            $table->string('label')->nullable();
            $table->timestamps();
        });

        // blogs table
        Schema::create('blogs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->text('content');
            $table->text('excerpt');
            $table->string('author');
            $table->string('category');
            $table->string('status')->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->string('featured_image')->nullable();
            $table->json('tags')->nullable();
            $table->integer('read_time')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // services table
        Schema::create('services', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->text('description');
            $table->decimal('price', 15, 2);
            $table->timestamps();
            $table->softDeletes();
        });

        // projects table
        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('posted_by_staff_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->string('type');
            $table->string('status');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->decimal('budget', 15, 2)->nullable();
            $table->string('location')->nullable();
            $table->integer('team_size')->nullable();
            $table->integer('progress')->nullable();
            $table->date('date_added')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });

        // tenants table
        Schema::create('tenants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('property_id')->constrained('properties')->onDelete('cascade');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->decimal('monthly_rent', 15, 2);
            $table->string('currency');
            $table->string('payment_frequency');
            $table->date('next_payment_date');
            $table->text('terms_and_conditions')->nullable();
            $table->string('status')->default('active');
            $table->timestamps();
            $table->softDeletes();
        });

        // owners table
        Schema::create('owners', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });

        // complaints table
        Schema::create('complaints', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained('tenants')->onDelete('cascade');
            $table->foreignUuid('property_id')->constrained('properties')->onDelete('cascade');
            $table->string('subject');
            $table->text('description');
            $table->string('status')->default('pending');
            $table->timestamps();
            $table->softDeletes();
        });

        // compensation_evaluations table
        Schema::create('compensation_evaluations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('evaluation_type');
            $table->text('notes')->nullable();
            $table->decimal('total_value', 15, 2)->nullable();
            $table->string('status')->default('draft');
            $table->timestamps();
            $table->softDeletes();

            // Crop Evaluation Fields
            $table->string('crop_type')->nullable();
            $table->decimal('area_acres', 10, 2)->nullable();
            $table->decimal('yield_per_acre', 10, 2)->nullable();
            $table->decimal('market_price_per_unit', 15, 2)->nullable();
            $table->decimal('damage_percentage', 5, 2)->nullable();

            // Machine Evaluation Fields
            $table->string('machine_type')->nullable();
            $table->string('model')->nullable();
            $table->integer('manufacture_year')->nullable();
            $table->decimal('current_value', 15, 2)->nullable();
            $table->decimal('depreciation_rate', 5, 2)->nullable();

            // Land Evaluation Fields
            $table->string('land_use_type')->nullable();
            $table->decimal('area_sqft', 15, 2)->nullable();
            $table->text('location_description')->nullable();
            $table->text('zoning_regulations')->nullable();
            $table->string('soil_quality')->nullable();

            // Property Evaluation Fields
            $table->foreignUuid('property_id')->nullable()->constrained('properties')->onDelete('set null');
            $table->integer('number_of_units')->nullable();
            $table->integer('construction_year')->nullable();
            $table->string('condition')->nullable();
            $table->decimal('renovation_cost', 15, 2)->nullable();
        });

        // rent_agreements table
        Schema::create('rent_agreements', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained('tenants')->onDelete('cascade');
            $table->foreignUuid('property_id')->constrained('properties')->onDelete('cascade');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->decimal('monthly_rent', 15, 2);
            $table->string('currency');
            $table->string('payment_frequency');
            $table->date('next_payment_date');
            $table->text('terms_and_conditions')->nullable();
            $table->string('status')->default('active');
            $table->timestamps();
            $table->softDeletes();
        });

        // cache table
        Schema::create('cache', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->mediumText('value');
            $table->integer('expiration')->index();
        });

        // job_batches table
        Schema::create('job_batches', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->integer('total_jobs');
            $table->integer('pending_jobs');
            $table->integer('failed_jobs');
            $table->longText('failed_job_ids');
            $table->mediumText('options')->nullable();
            $table->integer('cancelled_at')->nullable();
            $table->integer('created_at');
            $table->integer('finished_at')->nullable();
        });

        // jobs table
        Schema::create('jobs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('queue')->index();
            $table->longText('payload');
            $table->unsignedTinyInteger('attempts');
            $table->unsignedInteger('reserved_at')->nullable();
            $table->unsignedInteger('available_at');
            $table->unsignedInteger('created_at');
        });

        // failed_jobs table
        Schema::create('failed_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->text('connection');
            $table->text('queue');
            $table->longText('payload');
            $table->longText('exception');
            $table->timestamp('failed_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('failed_jobs');
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('job_batches');
        Schema::dropIfExists('cache');
        Schema::dropIfExists('rent_agreements');
        Schema::dropIfExists('compensation_evaluations');
        Schema::dropIfExists('complaints');
        Schema::dropIfExists('owners');
        Schema::dropIfExists('tenants');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('services');
        Schema::dropIfExists('blogs');
        Schema::dropIfExists('property_media');
        Schema::dropIfExists('properties');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['agency_id']);
        });
        Schema::dropIfExists('agencies');
        Schema::dropIfExists('users');
    }
};
