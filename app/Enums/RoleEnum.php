<?php

namespace App\Enums;

/**
 * Role Enumeration
 *
 * Centralized role constants to replace magic strings throughout the application.
 * This enum provides type safety and makes refactoring role names easier.
 *
 * Roles: admin, manager, sales_manager, finance_manager, inventory_manager, sales_staff, finance_staff, service_staff, staff, customer
 */
enum RoleEnum: string
{
    case ADMIN = 'admin';
    case MANAGER = 'manager';
    case SALES_MANAGER = 'sales_manager';
    case FINANCE_MANAGER = 'finance_manager';
    case INVENTORY_MANAGER = 'inventory_manager';
    case SALES_STAFF = 'sales_staff';
    case FINANCE_STAFF = 'finance_staff';
    case SERVICE_STAFF = 'service_staff';
    case STAFF = 'staff';
    case CUSTOMER = 'customer';

    /**
     * Get all role values as an array.
     *
     * @return array<string>
     */
    public static function values(): array
    {
        return array_map(fn (self $role) => $role->value, self::cases());
    }

    /**
     * Get the display name for the role.
     */
    public function getDisplayName(): string
    {
        return match ($this) {
            self::ADMIN => 'Administrator',
            self::MANAGER => 'Manager',
            self::SALES_MANAGER => 'Sales Manager',
            self::FINANCE_MANAGER => 'Finance Manager',
            self::INVENTORY_MANAGER => 'Inventory Manager',
            self::SALES_STAFF => 'Sales Staff',
            self::FINANCE_STAFF => 'Finance Staff',
            self::SERVICE_STAFF => 'Service Staff',
            self::STAFF => 'General Staff',
            self::CUSTOMER => 'Customer',
        };
    }

    /**
     * Check if the role is an admin role.
     */
    public function isAdmin(): bool
    {
        return $this === self::ADMIN;
    }

    /**
     * Check if the role is a manager role (any manager type).
     */
    public function isManager(): bool
    {
        return in_array($this, [self::MANAGER, self::SALES_MANAGER, self::FINANCE_MANAGER, self::INVENTORY_MANAGER], true);
    }

    /**
     * Check if the role is a staff role (any staff type).
     */
    public function isStaff(): bool
    {
        return in_array($this, [self::STAFF, self::SALES_STAFF, self::FINANCE_STAFF, self::SERVICE_STAFF], true);
    }

    /**
     * Check if the role is a customer role.
     */
    public function isCustomer(): bool
    {
        return $this === self::CUSTOMER;
    }

    /**
     * Check if the role has administrative privileges (admin or general manager).
     */
    public function hasAdministrativePrivileges(): bool
    {
        return $this === self::ADMIN || $this === self::MANAGER;
    }

    /**
     * Check if the role has management privileges (admin or any manager).
     */
    public function hasManagementPrivileges(): bool
    {
        return $this === self::ADMIN || $this->isManager();
    }

    /**
     * Check if the role is an employee (any non-customer role).
     */
    public function isEmployee(): bool
    {
        return $this !== self::CUSTOMER;
    }

    /**
     * Check if the role can manage inventory.
     */
    public function canManageInventory(): bool
    {
        return in_array($this, [self::ADMIN, self::MANAGER, self::INVENTORY_MANAGER], true);
    }

    /**
     * Check if the role can manage sales.
     */
    public function canManageSales(): bool
    {
        return in_array($this, [self::ADMIN, self::MANAGER, self::SALES_MANAGER], true);
    }

    /**
     * Check if the role can manage finance.
     */
    public function canManageFinance(): bool
    {
        return in_array($this, [self::ADMIN, self::MANAGER, self::FINANCE_MANAGER], true);
    }

    /**
     * Check if the role can manage suppliers.
     */
    public function canManageSuppliers(): bool
    {
        return in_array($this, [self::ADMIN, self::MANAGER, self::INVENTORY_MANAGER], true);
    }
}
