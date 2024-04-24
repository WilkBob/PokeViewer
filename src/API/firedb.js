import {app} from './firebase';
import { getDatabase } from "firebase/database";
import { set, ref, remove, get, update } from "firebase/database";

export const db = getDatabase(app);

// app gets pokemon and displays them from poke ui. Users will be able to create an account, favorite pokemon, and view their favorites.

export const addFavorite = async (userId, pokemonId) => {
    try {
        await set(ref(db, `users/${userId}/favorites/${pokemonId}`), true);
    } catch (error) {
        console.error(error);
    }
}

export const removeFavorite = async (userId, pokemonId) => {
    try {
        await remove(ref(db, `users/${userId}/favorites/${pokemonId}`));
    } catch (error) {
        console.error(error);
    }
}

export const getFavorites = async (userId) => {
    try {
        const snapshot = await get(ref(db, `users/${userId}/favorites`));
        return snapshot.val();
    } catch (error) {
        console.error(error);
    }
}

export const toggleFavorite = async (userId, pokemonId) => {
    try {
        const snapshot = await get(ref(db, `users/${userId}/favorites/${pokemonId}`));
        if (snapshot.exists()) {
            await removeFavorite(userId, pokemonId);
        } else {
            await addFavorite(userId, pokemonId);
        }
    } catch (error) {
        console.error(error);
    }
}

export const isFavorite = async (userId, pokemonId) => {
    try {
        const snapshot = await get(ref(db, `users/${userId}/favorites/${pokemonId}`));
        return snapshot.exists();
    } catch (error) {
        console.error(error);
    }
}

export const getUser = async (userId) => {
    // console.log('Getting user with ID:', userId); // Log the userId
    try {
        const snapshot = await get(ref(db, `users/${userId}`));
        // console.log('Snapshot:', snapshot); // Log the snapshot
        return snapshot.val();
    } catch (error) {
        console.error(error);
    }
}

export const updateUser = async (userId, updates) => {
    try {
        await update(ref(db, `users/${userId}`), updates);
    } catch (error) {
        console.error(error);
    }
}