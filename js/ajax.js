function sendAjaxRequest(method, url, data, onSuccess, onError) {
    const ajax = new FAJAX();

    ajax.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 300) {
                onSuccess?.(this.responseText);
            } else {
                onError?.(this.responseText, this.status);
            }
        }
    };

    ajax.open(method, url, true);

    let payload = null;

    if (data) {
        payload = typeof data === 'string'
            ? data
            : JSON.stringify(data);
    }

    ajax.send(payload);
}