import { describe, expect, it } from 'bun:test';
import { cn } from './cn';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('foo', true && 'bar', false && 'baz')).toBe('foo bar');
  });

  it('handles object syntax', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });

  it('handles array syntax', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('merges tailwind classes correctly', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
    expect(cn('px-4 py-2', 'p-4')).toBe('p-4');
  });

  it('handles mixed inputs', () => {
    expect(cn('foo', ['bar', { baz: true }])).toBe('foo bar baz');
  });

  it('handles undefined, null, and false values', () => {
    expect(cn('foo', undefined, null, false)).toBe('foo');
  });

  it('handles empty inputs', () => {
    expect(cn()).toBe('');
  });
});
