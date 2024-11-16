import { compare, hash } from 'bcrypt';

export const hashedPassword = async (password: string): Promise<string> => {
    const saltOrRounds = 10;

    return hash(password, saltOrRounds);
};

export const validatePassword = async (
    password: string,
    hashPassword: string,
): Promise<boolean> => {
    return compare(password, hashPassword);
};
