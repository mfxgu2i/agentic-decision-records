// スタブ: 予約確認メール送信。仕様は knowledge/specs/reservation-spec.md を参照。
export async function sendReservationMail(reservation: {
  name: string;
  email: string;
  date: string;
  partySize: number;
  note?: string;
}): Promise<void> {
  // 実際の送信処理は持たないスタブ
  console.log(`[stub] send confirmation mail to ${reservation.email}`);
}
