<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class DatabaseIndexPerformanceTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_created_indexes_exist_on_receipts_table(): void
    {
        $this->assertTrue(Schema::hasIndex('receipts', 'receipts_user_created_index'));
    }

    public function test_user_created_indexes_exist_on_refunds_table(): void
    {
        $this->assertTrue(Schema::hasIndex('refunds', 'refunds_user_created_index'));
    }

    public function test_user_created_indexes_exist_on_invoices_table(): void
    {
        $this->assertTrue(Schema::hasIndex('invoices', 'invoices_user_created_index'));
    }

    public function test_sold_branch_index_exists_on_vehicles_table(): void
    {
        $this->assertTrue(Schema::hasIndex('vehicles', 'vehicles_sold_branch_index'));
    }

    public function test_all_foreign_keys_are_indexed(): void
    {
        // Test payments table foreign keys
        $this->assertTrue(Schema::hasIndex('payments', 'payments_user_id_foreign'));
        $this->assertTrue(Schema::hasIndex('payments', 'payments_vehicle_id_foreign'));
        $this->assertTrue(Schema::hasIndex('payments', 'payments_vehicle_reservation_id_foreign'));

        // Test invoices table foreign keys
        $this->assertTrue(Schema::hasIndex('invoices', 'invoices_user_id_foreign'));
        $this->assertTrue(Schema::hasIndex('invoices', 'invoices_vehicle_id_foreign'));

        // Test receipts table foreign keys
        $this->assertTrue(Schema::hasIndex('receipts', 'receipts_user_id_foreign'));
        $this->assertTrue(Schema::hasIndex('receipts', 'receipts_payment_id_foreign'));
        $this->assertTrue(Schema::hasIndex('receipts', 'receipts_invoice_id_foreign'));

        // Test refunds table foreign keys
        $this->assertTrue(Schema::hasIndex('refunds', 'refunds_user_id_foreign'));
        $this->assertTrue(Schema::hasIndex('refunds', 'refunds_payment_id_foreign'));
        $this->assertTrue(Schema::hasIndex('refunds', 'refunds_invoice_id_foreign'));

        // Test vehicle_reservations table foreign keys
        $this->assertTrue(Schema::hasIndex('vehicle_reservations', 'vehicle_reservations_user_id_foreign'));
        $this->assertTrue(Schema::hasIndex('vehicle_reservations', 'vehicle_reservations_vehicle_id_foreign'));
    }

    public function test_no_broken_indexes_exist(): void
    {
        // The broken invoices_payment_status_index should not exist
        $this->assertFalse(Schema::hasIndex('invoices', 'invoices_payment_status_index'));
    }
}
