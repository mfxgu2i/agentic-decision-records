#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const STATUSES = ["proposed", "accepted", "rejected", "deprecated", "superseded"];
const LISTED_STATUSES = ["proposed", "accepted"];
const RECORD_FILE = /^(\d{4})-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;
const INDEX_LINE = /^- (\[proposed\] )?\[(.+)\]\(([^)]+)\) — (.+)$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const INDEX_WARN_LINES = 150;

const args = process.argv.slice(2);
const printNextNumber = args.includes("--next-number");
const dir = args.find((arg) => !arg.startsWith("--")) ?? "docs/decisions";

function listRecordFiles() {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name !== "index.md" && name.endsWith(".md"))
    .sort();
}

function nextNumber(files) {
  const numbers = files.map((name) => Number(name.slice(0, 4))).filter(Number.isInteger);
  return String(Math.max(0, ...numbers) + 1).padStart(4, "0");
}

function unquote(value) {
  const trimmed = value.trim();
  if (trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseRecord(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;
  const keys = [];
  const fields = {};
  for (const line of match[1].split("\n")) {
    const pair = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!pair) continue;
    keys.push(pair[1]);
    fields[pair[1]] = unquote(pair[2]);
  }
  const heading = text.slice(match[0].length).match(/^# (.+)$/m);
  return { keys, fields, heading: heading?.[1].trim() };
}

function checkRecord(name, record, fileNames, errors) {
  const { keys, fields } = record;
  if (keys.slice(0, 3).join(",") !== "description,status,date") {
    errors.push(`${name}: frontmatter の先頭が description、status、date の順になっていません`);
  }
  if (!fields.description) errors.push(`${name}: description がありません`);
  if (!STATUSES.includes(fields.status)) {
    errors.push(`${name}: status「${fields.status ?? ""}」は定義されたステータスではありません`);
  }
  if (!DATE.test(fields.date ?? "")) {
    errors.push(`${name}: date が YYYY-MM-DD の形式ではありません`);
  }
  if (!record.heading) errors.push(`${name}: 本文に「# 見出し」がありません`);

  if (fields.status === "superseded") {
    if (!fields.superseded_by) {
      errors.push(`${name}: superseded なのに superseded_by がありません`);
    } else if (!fileNames.includes(fields.superseded_by)) {
      errors.push(`${name}: superseded_by の指定先「${fields.superseded_by}」が存在しません`);
    }
  }
  if (fields.status === "deprecated" && !/^\d{4}-\d{2}-\d{2} \S/.test(fields.deprecated_reason ?? "")) {
    errors.push(`${name}: deprecated なのに deprecated_reason が「YYYY-MM-DD 理由」の形で書かれていません`);
  }
}

function checkIndex(records, errors, warnings) {
  const indexPath = join(dir, "index.md");
  if (!existsSync(indexPath)) {
    errors.push("index.md がありません");
    return;
  }
  const lines = readFileSync(indexPath, "utf8").split("\n");
  if (lines.length > INDEX_WARN_LINES) {
    warnings.push(`index.md が${lines.length}行あります。廃止できる古い決定記録がないか、ユーザーに見直しを提案してください`);
  }

  const listed = new Set();
  let previous = "";
  for (const [i, line] of lines.entries()) {
    if (!line.startsWith("- ")) continue;
    const where = `index.md ${i + 1}行目`;
    const match = line.match(INDEX_LINE);
    if (!match) {
      errors.push(`${where}: 「- [見出し](NNNN-xxx.md) — description」の形になっていません`);
      continue;
    }
    const [, proposedMark, heading, file, description] = match;
    const record = records.get(file);
    if (!record) {
      errors.push(`${where}: リンク先「${file}」が存在しません`);
      continue;
    }
    if (listed.has(file)) errors.push(`${where}: ${file} が索引に重複して載っています`);
    listed.add(file);
    if (file < previous) errors.push(`${where}: ${file} が番号順に並んでいません`);
    previous = file;

    const { status } = record.fields;
    if (!LISTED_STATUSES.includes(status)) {
      errors.push(`${where}: ${status} の ${file} は索引から削除します`);
      continue;
    }
    if (Boolean(proposedMark) !== (status === "proposed")) {
      errors.push(`${where}: [proposed] の印が status「${status}」と合っていません`);
    }
    if (heading !== record.heading) {
      errors.push(`${where}: 見出しが ${file} の「${record.heading}」と一致しません`);
    }
    if (description !== record.fields.description) {
      errors.push(`${where}: 説明が ${file} の description「${record.fields.description}」と一致しません`);
    }
  }

  for (const [file, record] of records) {
    if (LISTED_STATUSES.includes(record.fields.status) && !listed.has(file)) {
      errors.push(`${file}: ${record.fields.status} なのに索引に載っていません`);
    }
  }
}

const files = listRecordFiles();

if (printNextNumber) {
  console.log(nextNumber(files));
  process.exit(0);
}

if (!existsSync(dir)) {
  console.error(`${dir} がありません`);
  process.exit(1);
}

const errors = [];
const warnings = [];
const records = new Map();
const seenNumbers = new Map();

for (const name of files) {
  const fileMatch = name.match(RECORD_FILE);
  if (!fileMatch) {
    errors.push(`${name}: ファイル名が NNNN-kebab-case.md の形になっていません`);
  } else if (seenNumbers.has(fileMatch[1])) {
    errors.push(`${name}: 番号 ${fileMatch[1]} が ${seenNumbers.get(fileMatch[1])} と重複しています`);
  } else {
    seenNumbers.set(fileMatch[1], name);
  }

  const record = parseRecord(readFileSync(join(dir, name), "utf8"));
  if (!record) {
    errors.push(`${name}: frontmatter がありません`);
    continue;
  }
  records.set(name, record);
}

for (const [name, record] of records) checkRecord(name, record, files, errors);
checkIndex(records, errors, warnings);

for (const warning of warnings) console.log(`警告: ${warning}`);
for (const error of errors) console.log(`エラー: ${error}`);
if (errors.length > 0) process.exit(1);
console.log(`OK: ${records.size}件の決定記録と索引に食い違いはありません`);
