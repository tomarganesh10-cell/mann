import { interestOptions } from "./site";

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,20}$/;

/** Shared by the browser and the API route so both enforce the same rules. */
export function validateContact(input: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  const name = input.name.trim();
  if (name.length < 2) e.name = "Please enter your full name.";
  else if (name.length > 100) e.name = "Name must be 100 characters or fewer.";

  const email = input.email.trim();
  if (!email) e.email = "Please enter your business email.";
  else if (email.length > 254 || !EMAIL_RE.test(email)) e.email = "Please enter a valid email address.";

  const phone = input.phone.trim();
  if (phone && !PHONE_RE.test(phone)) e.phone = "Phone may contain digits, spaces, + ( ) - . only (7–20 characters).";

  if (input.company.trim().length > 120) e.company = "Company must be 120 characters or fewer.";

  if (!(interestOptions as readonly string[]).includes(input.interest)) e.interest = "Please choose an area of interest.";

  const message = input.message.trim();
  if (message.length < 10) e.message = "Please tell us a little more (at least 10 characters).";
  else if (message.length > 2000) e.message = "Message must be 2000 characters or fewer.";

  return e;
}
