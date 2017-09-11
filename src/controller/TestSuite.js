require('../style/testSuite.less');

class TestSuite {
    static get $inject() {
        return ['$http'];
    }

    constructor($http) {
        this.$http = $http;
        this.action = null;
        this.params = [{
            key: null,
            value: null
        }];
    }

    addParam() {
        this.params.push({
            key: null,
            value: null
        });
    }
    removeParam($index) {
        this.params.splice($index, 1);
    }

    submit() {
        let params = {
            action: this.action
        };
        for (let kv of this.params) {
            if (kv.key === null) {
                continue;
            }
            params[kv.key] = kv.value;
        }
        console.log('Params:', params);

        this.$http({
            method: 'POST',
            url: ajax_url,
            params: params
        }).then((response) => {
            console.log(response);
        });
    }
}

export default TestSuite;