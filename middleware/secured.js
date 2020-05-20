export default async function ({ store, redirect }) {
    let x = store.getters['auth/isLoggedIn'];
    if(!x) redirect('/login')
    return;
}