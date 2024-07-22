import { Context } from "../types";

export const formatAddress = (context: Context): string => {
  const parts = [
    context.street?.name,
    context.neighborhood?.name,
    context.place?.name,
    context.district?.name,
    context.region?.name,
    context.country.name,
    context.postcode?.name,
  ].filter(Boolean);
  return parts.join(", ");
};
