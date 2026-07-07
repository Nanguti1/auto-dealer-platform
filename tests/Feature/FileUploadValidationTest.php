<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\CustomerDocument;
use App\Models\FinanceApplication;
use App\Models\FinanceDocument;
use App\Models\ImportDocument;
use App\Models\User;
use App\Models\VehicleImport;
use App\Services\Customers\CustomerDocumentService;
use App\Services\Finance\FinanceDocumentService;
use App\Services\Imports\ImportDocumentService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class FileUploadValidationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    public function test_finance_document_accepts_valid_pdf(): void
    {
        $file = UploadedFile::fake()->create('document.pdf', 1000);
        $financeApplication = FinanceApplication::factory()->create();

        $response = $this->actingAs($this->createUser())
            ->post(route('admin.finance-applications.documents.store', $financeApplication), [
                'file' => $file,
                'type' => 'application',
            ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('finance_documents', [
            'finance_application_id' => $financeApplication->id,
            'type' => 'application',
        ]);
    }

    public function test_finance_document_accepts_valid_image(): void
    {
        $file = UploadedFile::fake()->image('document.jpg', 1000);
        $financeApplication = FinanceApplication::factory()->create();

        $response = $this->actingAs($this->createUser())
            ->post(route('admin.finance-applications.documents.store', $financeApplication), [
                'file' => $file,
                'type' => 'identification',
            ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('finance_documents', [
            'finance_application_id' => $financeApplication->id,
            'type' => 'identification',
        ]);
    }

    public function test_finance_document_rejects_executable(): void
    {
        $file = UploadedFile::fake()->create('malware.exe', 1000);
        $financeApplication = FinanceApplication::factory()->create();

        $response = $this->actingAs($this->createUser())
            ->post(route('admin.finance-applications.documents.store', $financeApplication), [
                'file' => $file,
                'type' => 'application',
            ]);

        $response->assertSessionHasErrors('file');
        $this->assertDatabaseMissing('finance_documents', [
            'finance_application_id' => $financeApplication->id,
        ]);
    }

    public function test_finance_document_rejects_large_file(): void
    {
        $file = UploadedFile::fake()->create('large.pdf', 15000);
        $financeApplication = FinanceApplication::factory()->create();

        $response = $this->actingAs($this->createUser())
            ->post(route('admin.finance-applications.documents.store', $financeApplication), [
                'file' => $file,
                'type' => 'application',
            ]);

        $response->assertSessionHasErrors('file');
        $this->assertDatabaseMissing('finance_documents', [
            'finance_application_id' => $financeApplication->id,
        ]);
    }

    public function test_import_document_accepts_valid_spreadsheet(): void
    {
        $file = UploadedFile::fake()->create('import.xlsx', 1000);
        $vehicleImport = VehicleImport::factory()->create();

        $response = $this->actingAs($this->createUser())
            ->post(route('admin.imports.documents.store', $vehicleImport), [
                'file' => $file,
                'type' => 'manifest',
            ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('import_documents', [
            'vehicle_import_id' => $vehicleImport->id,
            'type' => 'manifest',
        ]);
    }

    public function test_import_document_rejects_invalid_type(): void
    {
        $file = UploadedFile::fake()->create('script.js', 1000);
        $vehicleImport = VehicleImport::factory()->create();

        $response = $this->actingAs($this->createUser())
            ->post(route('admin.imports.documents.store', $vehicleImport), [
                'file' => $file,
                'type' => 'manifest',
            ]);

        $response->assertSessionHasErrors('file');
        $this->assertDatabaseMissing('import_documents', [
            'vehicle_import_id' => $vehicleImport->id,
        ]);
    }

    public function test_customer_document_accepts_valid_pdf(): void
    {
        $file = UploadedFile::fake()->create('id.pdf', 1000);
        $customer = Customer::factory()->create();

        $response = $this->actingAs($this->createUser())
            ->post(route('admin.customers.documents.store', $customer), [
                'file' => $file,
                'type' => 'identification',
            ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('customer_documents', [
            'customer_id' => $customer->id,
            'type' => 'identification',
        ]);
    }

    public function test_customer_document_rejects_invalid_extension(): void
    {
        $file = UploadedFile::fake()->create('document.php', 1000);
        $customer = Customer::factory()->create();

        $response = $this->actingAs($this->createUser())
            ->post(route('admin.customers.documents.store', $customer), [
                'file' => $file,
                'type' => 'identification',
            ]);

        $response->assertSessionHasErrors('file');
        $this->assertDatabaseMissing('customer_documents', [
            'customer_id' => $customer->id,
        ]);
    }

    public function test_finance_document_service_sanitizes_filename(): void
    {
        $service = new FinanceDocumentService;
        $document = FinanceDocument::factory()->create();
        $file = UploadedFile::fake()->create('My Document (2024).pdf', 1000);

        $result = $service->upload($document, $file, 'application');

        $this->assertStringNotContainsString(' ', $result->name);
        $this->assertStringNotContainsString('(', $result->name);
        $this->assertStringNotContainsString(')', $result->name);
        $this->assertStringEndsWith('.pdf', $result->name);
    }

    public function test_import_document_service_sanitizes_filename(): void
    {
        $service = new ImportDocumentService;
        $document = ImportDocument::factory()->create();
        $file = UploadedFile::fake()->create('Import@#$File.csv', 1000);

        $result = $service->upload($document, $file, 'manifest');

        $this->assertStringNotContainsString('@', $result->name);
        $this->assertStringNotContainsString('#', $result->name);
        $this->assertStringNotContainsString('$', $result->name);
        $this->assertStringEndsWith('.csv', $result->name);
    }

    public function test_customer_document_service_sanitizes_filename(): void
    {
        $service = new CustomerDocumentService;
        $document = CustomerDocument::factory()->create();
        $file = UploadedFile::fake()->create('Customer ID - Copy.jpg', 1000);

        $result = $service->upload($document, $file, 'identification');

        $this->assertStringNotContainsString(' ', $result->name);
        $this->assertStringNotContainsString('-', $result->name);
        $this->assertStringEndsWith('.jpg', $result->name);
    }

    public function test_finance_update_request_validates_file(): void
    {
        $file = UploadedFile::fake()->create('malware.exe', 1000);
        $financeApplication = FinanceApplication::factory()->create();
        $document = FinanceDocument::factory()->create(['finance_application_id' => $financeApplication->id]);

        $response = $this->actingAs($this->createUser())
            ->put(route('admin.finance-applications.documents.update', [$financeApplication, $document]), [
                'file' => $file,
            ]);

        $response->assertSessionHasErrors('file');
    }

    public function test_import_update_request_validates_file(): void
    {
        $file = UploadedFile::fake()->create('script.php', 1000);
        $vehicleImport = VehicleImport::factory()->create();
        $document = ImportDocument::factory()->create(['vehicle_import_id' => $vehicleImport->id]);

        $response = $this->actingAs($this->createUser())
            ->put(route('admin.imports.documents.update', [$vehicleImport, $document]), [
                'file' => $file,
            ]);

        $response->assertSessionHasErrors('file');
    }

    public function test_customer_update_request_validates_file(): void
    {
        $file = UploadedFile::fake()->create('virus.sh', 1000);
        $customer = Customer::factory()->create();
        $document = CustomerDocument::factory()->create(['customer_id' => $customer->id]);

        $response = $this->actingAs($this->createUser())
            ->put(route('admin.customers.documents.update', [$customer, $document]), [
                'file' => $file,
            ]);

        $response->assertSessionHasErrors('file');
    }

    protected function createUser()
    {
        return User::factory()->create();
    }
}
