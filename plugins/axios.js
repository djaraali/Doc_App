export default function({ $axios, redirect, store }) {

    $axios.onRequest(config => {
        var authToken = store.state.auth.token || sessionStorage.getItem('token');

        if (!!authToken) {
            config.headers['Authorization'] = `Bearer ${authToken}`;
        }

    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status);
        if (code === 400) {
            // redirect("/400");
        }
    });
}
