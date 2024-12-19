import React from 'react'
import { render, screen } from '@testing-library/react';
import ChatComponent from './chatComponent';

describe('Chat Component', () => {
    test('displays div for messages', () => {
        render(<ChatComponent />);
        
        // Simply testing the components are rendering for now
        const messagesList = screen.getByRole('list', { name: 'messages' });
        expect(messagesList).toBeInTheDocument();
    })

    test('displays input field for requests', () => {
        render(<ChatComponent />);
        
        // Simply testing the components are rendering for now
        const aiRequest = screen.getByLabelText('ai request input');
        expect(aiRequest).toBeInTheDocument();
    })

    test('displays button to submit requests', () => {
        render(<ChatComponent />);
        
        // Simply testing the components are rendering for now
        const aiRequest = screen.getByLabelText('submit ai request');
        expect(aiRequest).toBeInTheDocument();
    })
});