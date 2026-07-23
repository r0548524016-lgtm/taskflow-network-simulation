const network = new Network();

class FAJAX {
    constructor() {
        this.status = 0;
        this.readyState = 0;
        this.responseText = "";
        this.onreadystatechange = null;
    }

    open(type, url, async = true) {
        this.readyState = 1;
        this.type = type.toUpperCase();
        this.url = url;
        this.async = async;
        this.onreadystatechange?.();
    }

    send(details = null) {
        this.details = details;
        this.readyState = 2;
        this.onreadystatechange?.();

        network.network(
            this.type,
            this.url,
            this.async,
            this.details,
            (response) => {
                this.status = response.status;
                this.responseText = response.responseText;
                this.data = response.data ?? null;

                this.readyState = 4;
                this.onreadystatechange?.();
            }
        );
    }
}