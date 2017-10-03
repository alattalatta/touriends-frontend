import param from 'jquery-param';

require('../style/testSuite.less');

class TestSuite {
    static get $inject() {
        return ['$http'];
    }

    constructor($http) {
        this.$http = $http;
        this.form = document.querySelector('form');
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
    	let formData = new FormData(this.form);
    	formData.set('action', this.action);
    	console.log(formData);

        this.$http({
            method: 'POST',
            url: ajax_url,
            data: formData,
	        headers: {'Content-Type': undefined}
        }).then((response) => {
            console.log(response);
        });
    }
}

export default TestSuite;