const trim = (s) => String(s ?? "").replace(/\r\n/g, "\n").trim();
const squash = (s) => trim(s).replace(/\s+/g, " ");
export const loose = (s) => squash(s).toLowerCase().replace(/[.\s]+$/, "");

export const COURSE_CODE = /^[A-Z]{2,5} ?\d{2,4}[A-Z]?$/;
export const LIMITS = { question: 1000, option: 300, explanation: 1500 };

export function looseKey(title, question) {
  return `${squash(title).toUpperCase()}|${loose(question).replace(/[^a-z0-9]/g, "")}`;
}

export function normalizeQuestion(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, errors: ["Not a question object."] };
  }
  const errors = [];

  const title = squash(raw.title ?? raw.course).toUpperCase();
  const question = trim(raw.question);
  const explanation = trim(raw.explanation);
  const instruction = trim(raw.instruction);
  const options = (Array.isArray(raw.options) ? raw.options : []).map(trim).filter(Boolean);

  if (!COURSE_CODE.test(title)) errors.push("Course code looks wrong (for example ECO111).");
  if (question.length < 10) errors.push("Question is too short.");
  if (question.length > LIMITS.question) errors.push(`Question is over ${LIMITS.question} characters.`);
  if (options.length < 2 || options.length > 5) errors.push("Needs 2 to 5 options.");
  if (options.some((o) => o.length > LIMITS.option)) errors.push(`An option is over ${LIMITS.option} characters.`);
  if (new Set(options.map(loose)).size !== options.length) errors.push("Two options are the same.");
  if (explanation.length > LIMITS.explanation) errors.push(`Explanation is over ${LIMITS.explanation} characters.`);

  // The answer may be the option text (your format), ignoring case and a trailing period, or a letter A-E.
  const given = trim(raw.correctAnswer);
  let answer =
    options.find((o) => o === given) ??
    options.find((o) => loose(o) === loose(given));
  if (!answer && /^[A-Ea-e]$/.test(given)) answer = options["ABCDE".indexOf(given.toUpperCase())];
  if (!answer) errors.push("Correct answer doesn't match any option.");

  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    errors,
    value: {
      title,
      question,
      options,
      correctAnswer: answer, // always stored as the exact option text
      ...(explanation && { explanation }),
      ...(instruction && { instruction }),
    },
  };
}
