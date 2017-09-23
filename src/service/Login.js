import param from 'jquery-param';
import crypt from 'sjcl';

/**
 * 글로벌 로그인 서비스
 */
class LoginSvc {
    static get $inject() {
        return ['$http', '$http'];
    }

    constructor($http) {
        this.$http = $http;
        this.logged = logged; // 이미 로그인된 경우면 index.php 의 logged = true
        this.uid = uid;       // 이미 로그인된 경우면 index.php 의 uid = 현재 사용자 ID
    }

    register(formData) {
        formData.set('action', 'register');

        let login = formData.get('login');
        let pwd = formData.get('pwd');
        formData.set('pwd', LoginSvc.hashPwd(login, pwd));

        return this.$http({
            method: 'POST',
            url: ajax_url,
            headers: {'Content-Type': undefined},
            data: formData
        }).then((response) => {
            if (response.data.success) {
                console.log(response);
                this.logged = true;
                this.uid = response.data.uid;
            }
            return response;
        });
    }

    login(formData) {
        formData.set('action', 'login');

        let login = formData.get('login');
        let pwd = formData.get('pwd');
        formData.set('pwd', LoginSvc.hashPwd(login, pwd));

        return this.$http({
            method: 'POST',
            url: ajax_url,
            headers: {'Content-Type': undefined},
            data: formData,
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
            method: 'GET',
            url: ajax_url,
            params: {
                action: 'logout'
            },
        }).then((response) => {
            this.logged = false;
            this.uid = null;
            return response;
        });
    }

    /**
     * 비밀번호 sha256 해시. 로그인은 중복될 수 없으므로 간을 맞추는데 사용.
     * @param login 워드프레스 로그인
     * @param pwd 비밀번호
     * @return string
     */
    static hashPwd(login, pwd) {
        function hash(string) {
            let out = crypt.hash.sha256.hash(string);
            return crypt.codec.hex.fromBits(out);
        }

        let salt = hash(login);
        return hash(salt + pwd);
    }
}

export default LoginSvc;