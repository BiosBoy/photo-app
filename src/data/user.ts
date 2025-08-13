export interface User {
  firstName: string;
  lastName: string;
  location: string;
  bio: string;
}

export const currentUser: User = {
  firstName: 'Sviatoslav',
  lastName: 'Kuzhelev',
  location: 'Kyiv, Ukraine',
  bio: 'Frontend engineer who loves React, TypeScript, and snapping travel photos.',
};
