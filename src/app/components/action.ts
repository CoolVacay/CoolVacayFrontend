import React from 'react'
import { type StateType } from './HeroSection';

export async function updateState(prevState: StateType, formData: FormData) {
    const location = formData.get('location');
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    const guests = formData.get('guests');

    console.log({location, startDate, endDate, guests});

    return {
        location: location,
        startDate: startDate,
        endDate: endDate,
        guests: guests
      }
}