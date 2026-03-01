import { create } from 'zustand';

interface User {
    _id: string;
    name: string;
    email: string;
    token: string;
}

interface AuthState {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
    const savedUser = localStorage.getItem('user');
    const initialUser = savedUser ? JSON.parse(savedUser) : null;

    return {
        user: initialUser,
        setUser: (user) => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', user.token);
            } else {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
            set({ user });
        },
        logout: () => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            set({ user: null });
        }
    };
});
