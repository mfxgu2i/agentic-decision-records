// スタブ: 予約受付API。人数上限の理由は docs/records/adr/0004-large-party-by-phone.md を参照する。
import { sendReservationMail } from "../../../lib/mail";

const MAX_PARTY_SIZE = 8;
const MAX_DAYS_AHEAD = 90;

export async function POST(request: Request) {
  const body = await request.json();

  if (!isValid(body)) {
    // フロントエンドは400を前提にエラーメッセージを切り替えるため、422にはしない。
    return new Response(JSON.stringify({ error: "validation_failed" }), { status: 400 });
  }

  await sendReservationMail(body);
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}

function isValid(body: {
  name?: string;
  email?: string;
  date?: string;
  partySize?: number;
  note?: string;
}): boolean {
  if (!body.name || body.name.length > 50) return false;
  if (!body.email || !/^[^@\s]+@[^@\s]+$/.test(body.email)) return false;
  if (!body.date || daysFromToday(body.date) > MAX_DAYS_AHEAD) return false;
  if (!body.partySize || body.partySize < 1 || body.partySize > MAX_PARTY_SIZE) return false;
  if (body.note && body.note.length > 500) return false;
  return true;
}

function daysFromToday(isoDate: string): number {
  const diff = new Date(isoDate).getTime() - Date.now();
  return Math.ceil(diff / (24 * 60 * 60 * 1000));
}
