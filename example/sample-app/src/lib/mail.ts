// スタブ: 予約確認メールを送信する。予約を保存しない理由は docs/decisions/0001-no-reservation-persistence.md を参照する。
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
