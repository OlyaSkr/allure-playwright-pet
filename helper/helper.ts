import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export function generateRandomId(length: number = 5): string {
  const characters = '0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export function generateUsername(minLength = 5): string {
  let username = '';
  while (username.length < minLength) {
    username = faker.internet.username();
  }
  return username;
}

export function generatePassword(minLength: number = 7): string {
  let password = '';
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const passwordPattern = /(?=.*[a-z])(?=.*[0-9])/;

  while (password.length < minLength || !passwordPattern.test(password)) {
    password = '';
    password += lowercaseLetters.charAt(
      Math.floor(Math.random() * lowercaseLetters.length)
    );
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));

    const allCharacters = letters + numbers;
    while (password.length < minLength) {
      password += allCharacters.charAt(
        Math.floor(Math.random() * allCharacters.length)
      );
    }
    password = password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  }

  return password;
}
