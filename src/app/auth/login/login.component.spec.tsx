import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest'
import LoginComponent from './login.component';
import AuthUtils from '../utilities/utilities';
import { describe } from 'node:test';

// mocks
vi.mock('../utilities/utilities', () => ({
    default: {
        validateEmail: vi.fn(),
    },
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;


describe('LoginComponent', () => {
    beforeEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    test('renders the login form correctly', () => {
        render(<LoginComponent />);

        expect(screen.getByText(/Login/i)).toBeDefined();
        expect(screen.getByText(/Email/i)).toBeDefined();
        expect(screen.getByText(/Password/i)).toBeDefined();
        expect(screen.getByRole('button', { name: /Submit/i })).toBeDefined();
    });

    test('updates state when input fields change', async () => {
        render(<LoginComponent />);

        // get input fields
        const emailInput: HTMLInputElement = screen.getByLabelText(/Email/i);
        const passwordInput: HTMLInputElement = screen.getByLabelText(/Password/i);

        // simulate user input
        fireEvent.change(emailInput, { target: { value: 'test@example.com' }});
        fireEvent.change(passwordInput, { target: {value: 'password123' }});

        expect(emailInput.value).toEqual('test@example.com');
        expect(passwordInput.value).toEqual('password123');
    });

    test('validates email using AuthUtils.validateEmail', async () => {
        render(<LoginComponent />);

        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Password/);
        const submitButton = screen.getByRole('button', { name: /Submit/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' }});
        fireEvent.change(passwordInput, { target: {value: 'password123' }});
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(AuthUtils.validateEmail).toHaveBeenCalledWith('test@example.com');
        });
    });

    test('displays error message if login fails', async () => {
        const mockResponse = {
            ok: false,
            text: vi.fn().mockResolvedValue("Error: user not found"),
        }
        mockFetch.mockResolvedValueOnce(mockResponse);

        render(<LoginComponent />);

        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const submitButton = screen.getByRole('button', { name: /Submit/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' }});
        fireEvent.change(passwordInput, { target: {value: 'password123' }});
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect((screen.getByText(/Error: user not found/i))).toBeDefined();
        });
    });

    test('sends POST request with correct payload on form submission', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
        });
        const expectedResult = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password123',
            }),
        }

        render(<LoginComponent />);

        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const submitButton = screen.getByRole('button', { name: /Submit/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' }});
        fireEvent.change(passwordInput, { target: {value: 'password123' }});
        fireEvent.click(submitButton);

        expect(global.fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, expectedResult);
    });
});