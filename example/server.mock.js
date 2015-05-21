export class Server {
    static objects() {
        var objs = [];
        for (let a = 1; a<100; a++) {
            objs.push({name: 'name' + a})
        }
        return objs;
    }

    query(callback) {
        setTimeout(function() {
            callback(null, Server.objects);
        }, 50)
    }
}

