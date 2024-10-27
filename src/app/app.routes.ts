import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    outlet: 'main-content',
  },
  {
    path: 'suppliers',
    loadComponent: () =>
      import('../components/suppliers/suppliers.component').then(
        (m) => m.SuppliersComponent
      ),
    outlet: 'main-content',
  },
  {
    path: 'inventory',
    loadComponent: () =>
      import('../components/inventory/inventory.component').then(
        (m) => m.InventoryComponent
      ),
    outlet: 'main-content',
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('../components/orders/orders.component').then(
        (m) => m.OrdersComponent
      ),
    outlet: 'main-content',
  },
  {
    path: 'shipment',
    loadComponent: () =>
      import('../components/shipment/shipment.component').then(
        (m) => m.ShipmentComponent
      ),
    outlet: 'main-content',
  },
  {
    path: 'sales',
    loadComponent: () =>
      import('../components/sales/sales.component').then(
        (m) => m.SalesComponent
      ),
    outlet: 'main-content',
  },
  {
    path: 'staff',
    loadComponent: () =>
      import('../components/staff/staff.component').then(
        (m) => m.StaffComponent
      ),
    outlet: 'main-content',
  },
  {
    path: 'products',
    loadComponent: () =>
      import('../components/products/products.component').then(
        (m) => m.ProductsComponent
      ),
    outlet: 'main-content',
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    outlet: 'main-content',
  },
];
