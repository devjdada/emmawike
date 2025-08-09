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
        Schema::table('properties', function (Blueprint $table) {
            // Drop foreign key constraint first
            $table->dropForeign(['user_id']);

            // Rename columns
            $table->renameColumn('user_id', 'owner_id');
            $table->renameColumn('beds', 'bedrooms');
            $table->renameColumn('baths', 'bathrooms');
            $table->renameColumn('sqft', 'area_sq_ft');
            $table->renameColumn('featured', 'is_featured');

            // Add new columns
            $table->string('type', 50)->after('description');
            $table->string('currency', 10)->default('NGN')->after('price');
            $table->string('address_line1')->after('location');
            $table->string('address_line2')->nullable()->after('address_line1');
            $table->string('city', 100)->after('address_line2');
            $table->string('state', 100)->after('city');
            $table->string('country', 100)->default('Nigeria')->after('state');
            $table->string('zip_code', 20)->nullable()->after('country');
            $table->decimal('latitude', 10, 7)->nullable()->after('zip_code');
            $table->decimal('longitude', 10, 7)->nullable()->after('latitude');

            // Modify existing columns
            $table->decimal('price', 12, 2)->change();
            $table->string('status', 50)->default('available')->change();
            $table->tinyInteger('is_featured')->default(0)->change();

            // Drop old column
            $table->dropColumn('location');

            // Re-add foreign key constraint with new name
            $table->foreign('owner_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            // Drop new foreign key constraint
            $table->dropForeign(['owner_id']);

            // Rename columns back
            $table->renameColumn('owner_id', 'user_id');
            $table->renameColumn('bedrooms', 'beds');
            $table->renameColumn('bathrooms', 'baths');
            $table->renameColumn('area_sq_ft', 'sqft');
            $table->renameColumn('is_featured', 'featured');

            // Drop new columns
            $table->dropColumn([
                'type',
                'currency',
                'address_line1',
                'address_line2',
                'city',
                'state',
                'country',
                'zip_code',
                'latitude',
                'longitude',
            ]);

            // Re-add old column
            $table->string('location')->after('price');

            // Revert existing columns
            $table->decimal('price', 10, 2)->change();
            $table->string('status')->default(null)->change(); // Revert to original default or nullable
            $table->boolean('featured')->default(0)->change(); // Revert to original type

            // Re-add original foreign key constraint
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }
};
