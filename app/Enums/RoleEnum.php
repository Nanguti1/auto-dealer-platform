<?php

namespace App\Enums;

/**
 * Role Enumeration
 *
 * Centralized role constants to replace magic strings throughout the application.
 * This enum provides type safety and makes refactoring role names easier.
 *
 * Roles: admin, manager, staff, customer
 */
enum RoleEnum: string
{
    case ADMIN = 'admin';
    case MANAGER = 'manager';
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
            self::STAFF => 'Staff',
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
     * Check if the role is a manager role.
     */
    public function isManager(): bool
    {
        return $this === self::MANAGER;
    }

    /**
     * Check if the role is a staff role.
     */
    public function isStaff(): bool
    {
        return $this === self::STAFF;
    }

    /**
     * Check if the role is a customer role.
     */
    public function isCustomer(): bool
    {
        return $this === self::CUSTOMER;
    }

    /**
     * Check if the role has administrative privileges (admin or manager).
     */
    public function hasAdministrativePrivileges(): bool
    {
        return $this === self::ADMIN || $this === self::MANAGER;
    }

    /**
     * Check if the role is an employee (admin, manager, or staff).
     */
    public function isEmployee(): bool
    {
        return $this !== self::CUSTOMER;
    }
}
