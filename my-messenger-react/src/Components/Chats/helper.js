export const BASE_URL = "http://localhost:8000";
export const API_CHATS = BASE_URL + "/chats";
export const API_LOGIN = BASE_URL + "/login";
export const API_REGISTRATION = BASE_URL + "/registration";
export const API_LOGOUT = BASE_URL + "/logout";
export const API_USERS = BASE_URL + "/users";

/**
 * @return {string}
 */
export function API_SEND_MESSAGE(chatId) {
    return API_CHATS + "/" + chatId + "/message";
}

/**
 * @return {string}
 */
export function API_DELETE_CHAT(chatId) {
    return API_CHATS + "/" + chatId;
}

/**
 * @return {string}
 */
export function API_CHAT_USERS(chatId) {
    return API_CHATS + "/" + chatId + "/users";
}
