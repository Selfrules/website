/**
 * Generate cancellation token for booking
 * This should be sent in the confirmation email
 */
export function generateCancellationToken(bookingId: string): string {
  return Buffer.from(`${bookingId}:${process.env.JWT_SECRET}`).toString('base64');
}

/**
 * Verify cancellation token
 */
export function verifyCancellationToken(bookingId: string, token: string): boolean {
  const expectedToken = generateCancellationToken(bookingId);
  return token === expectedToken;
}
