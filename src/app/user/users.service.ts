import { inject, Injectable } from '@angular/core';
import { User } from './user.model';
import { DataService } from '../data.service';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private dataService = inject(DataService);
  private customers = this.dataService.getCustomers;
  private admins = this.dataService.getAdmins;
  generateCustomerId(email: string): string {
    // Concatenate name and brand with a separator to avoid ambiguity
    const input = `${email.trim().toLowerCase()}`;

    // Generate a SHA-256 hash of the input
    const hash = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);

    // Optionally, shorten the hash for readability (e.g., first 12 characters)
    const shortHash = hash.substring(0, 12).toUpperCase();

    return `CUST-${shortHash}`;
  }
  generateAdminId(email: string): string {
    // Concatenate name and brand with a separator to avoid ambiguity
    const input = `${email.trim().toLowerCase()}`;

    // Generate a SHA-256 hash of the input
    const hash = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);

    // Optionally, shorten the hash for readability (e.g., first 12 characters)
    const shortHash = hash.substring(0, 12).toUpperCase();

    return `ADM-${shortHash}`;
  }
}
