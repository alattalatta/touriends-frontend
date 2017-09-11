/**
 * 글로벌 로그인 서비스
 */
class LoginSvc {
    static get $inject() {
        return ['$http', '$httpParamSerializerJQLike'];
    }

    constructor($http, $httpSerializer) {
        this.$http = $http;
        this.$httpSerializer = $httpSerializer;
        this.logged = logged; // 이미 로그인된 경우면 index.php의 logged = true
        this.uid = uid;       // 이미 로그인된 경우면 index.php의 uid = 현재 사용자 ID
    }

    register(formData) {
        formData.set('action', 'register');
        return this.$http({
            method: 'POST',
            url: ajax_url,
            data: formData
        });
    }

    login(formData) {
        formData.set('action', 'login');
        // 구글 검색어 javascript promise
        return this.$http({
            method: 'POST',
            url: ajax_url,
            data: formData,
            transformRequest: angular.identity
        }).then((response) => {
            if (response.data.success) {
                this.logged = true;
                this.uid = response.data.uid;
            }
            return response;
        });
    }

    logout() {
        return this.$http({
            method: 'POST',
            url: ajax_url,
            params: {
                action: 'logout'
            }
        }).then((response) => {
            this.logged = false;
            this.uid = null;
            return response;
        });
    }
}

export default LoginSvc;