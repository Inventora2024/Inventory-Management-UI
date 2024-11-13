import { Injectable } from '@angular/core';
declare const bootstrap: any;

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  reinitializeDropdowns(): void {
    const dropdownElements = document.querySelectorAll(
      '[data-bs-toggle="dropdown"]'
    );
    dropdownElements.forEach((dropdown) => {
      const instance = bootstrap.Dropdown.getInstance(dropdown);
      if (instance) {
        instance.dispose();
      }
      new bootstrap.Dropdown(dropdown);
    });
  }

  cleanUpDropdowns(): void {
    const dropdownElements = document.querySelectorAll(
      '[data-bs-toggle="dropdown"]'
    );
    dropdownElements.forEach((dropdown) => {
      const instance = bootstrap.Dropdown.getInstance(dropdown);
      if (instance) {
        instance.dispose();
      }
    });
  }
}
