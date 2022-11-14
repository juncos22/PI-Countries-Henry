import React from 'react';
import ActivityForm from './ActivityForm';
import { render } from "@testing-library/react";

describe('Activities Form', () => {
    it('El form de activities debe tener un label que diga "Nombre de la actividad"', () => {
        const { container } = render(<ActivityForm />)
        const element = container.querySelectorAll('label')[0]

        expect(element.innerHTML).toBe('Nombre de la actividad');
    })
})
