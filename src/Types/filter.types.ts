/**
 * Shape of any item that can pass through `applyFilters` / `applySort`.
 *
 * All fields are optional because the helpers must accept `Inquiry`,
 * `InquiryGroup`, `Option`, custom-zone payloads, and any future
 * entity — the helpers themselves treat missing fields as "doesn't
 * match" rather than "error".
 */
export interface FilterableItem {
  // Classification
  type?: string;
  inquiryType?: string;
  groupType?: string;
  family?: string;
  optionFamily?: string;

  // Status
  status?: { inquiryStatus?: string };
  statusKey?: string;

  // Timestamps
  created?: number;
  createdAt?: number;
  timestamp?: number;

  // Ownership
  owner?: { id?: string };
  userId?: string;
  groupId?: number;
  inquiryGroupId?: number;

  // Categorisation
  category?: string;
  location?: string;
  tags?: string[];

  // Free-form extensions
  miscFields?: Record<string, unknown>;
}
