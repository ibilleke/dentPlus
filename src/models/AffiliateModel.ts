import fs from 'fs';
import path from 'path';

export type MembershipType = 'silver' | 'gold' | 'platinum';

export interface Affiliate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  membershipType: MembershipType;
}

const DISCOUNTS: Record<MembershipType, number> = {
  silver: 0.05,
  gold: 0.10,
  platinum: 0.20,
};

const DB_PATH = path.join(__dirname, '../data/affiliates.json');

function readAll(): Affiliate[] {
  if (!fs.existsSync(DB_PATH)) return [];
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function writeAll(affiliates: Affiliate[]): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(affiliates, null, 2));
}

function nextId(affiliates: Affiliate[]): number {
  return affiliates.length === 0 ? 1 : Math.max(...affiliates.map(a => a.id)) + 1;
}

export const AffiliateModel = {
  getAll(): Affiliate[] {
    return readAll();
  },

  getById(id: number): Affiliate | undefined {
    return readAll().find(a => a.id === id);
  },

  create(data: Omit<Affiliate, 'id'>): Affiliate {
    const affiliates = readAll();
    const newAffiliate: Affiliate = { id: nextId(affiliates), ...data };
    affiliates.push(newAffiliate);
    writeAll(affiliates);
    return newAffiliate;
  },

  update(id: number, data: Omit<Affiliate, 'id'>): Affiliate | null {
    const affiliates = readAll();
    const index = affiliates.findIndex(a => a.id === id);
    if (index === -1) return null;
    affiliates[index] = { id, ...data };
    writeAll(affiliates);
    return affiliates[index];
  },

  delete(id: number): boolean {
    const affiliates = readAll();
    const filtered = affiliates.filter(a => a.id !== id);
    if (filtered.length === affiliates.length) return false;
    writeAll(filtered);
    return true;
  },

  calculateDiscount(membershipType: MembershipType, amount: number): { discount: number; finalPrice: number } {
    const discount = DISCOUNTS[membershipType];
    return {
      discount: discount * 100,
      finalPrice: Math.round(amount * (1 - discount)),
    };
  },
};
