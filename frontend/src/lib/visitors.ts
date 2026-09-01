import { apiPost } from "@/lib/api";

export interface VisitStats {
  total: number;
  online: number;
}

let cached: Promise<VisitStats> | null = null;

export const trackVisit = () => (cached ??= apiPost<VisitStats>("/visit"));
