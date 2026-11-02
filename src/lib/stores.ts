import { writable } from "svelte/store";

export const Level = writable<string>('100');
export const faculty = writable<string>('');
export const department = writable<string>('');

export const prev = writable<string>('');
