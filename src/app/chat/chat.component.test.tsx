import {expect, test} from 'vitest'
import { render, screen } from '@testing-library/react';
import ChatComponent from './chat.component';


test('displays div for messages', () => {
    render(<ChatComponent />);
    
    // Simply testing the components are rendering for now
    const messagesList = screen.getByRole('list', { name: 'messages' });
    expect(messagesList).toBeDefined();
});

test('displays input field for requests', () => {
    render(<ChatComponent />);
    
    // Simply testing the components are rendering for now
    const aiRequest = screen.getAllByLabelText('ai request input');
    expect(aiRequest).toBeDefined();
});

test('displays button to submit requests', () => {
    render(<ChatComponent />);
    
    // Simply testing the components are rendering for now
    const aiRequest = screen.getAllByLabelText('submit ai request');
    expect(aiRequest).toBeDefined();
});