export function generateWhatsAppLink({
  name,
  token,
  number,
}: {
  name: string;
  token: string;
  number: string;
}) {

  const message = `
Hello ${name},

Your GTBIT Bus Booking has been confirmed.

Token ID: ${token}

Reporting Time: 7:00 AM
Bus Type: Luxury AC Bus

Thank you.
`;

  return `https://wa.me/91${number}?text=${encodeURIComponent(
    message
  )}`;
}