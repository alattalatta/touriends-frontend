import EmailValidator from 'email-validator';

class RegisterCtrl {
	static get $inject() {
		return ['OverlaySvc', 'LoginSvc', '$scope', '$state']
	}

	// =============== Property
	get BirthMonth() {
		return this.registerObj.birth.month;
	}

	set BirthMonth(val) {
		this.registerObj.birth.month = val;
	}

	get BirthDay() {
		return this.registerObj.birth.day
	}

	set BirthDay(val) {
		this.registerObj.birth.day = val;
	}

	get BirthYear() {
		let current = new Date();
		let fullYear = parseInt(this.registerObj.birth.year) + 2000;

		// e.g 15 => 2015(o), 23 => 2023(x) 1923(o)
		return fullYear > current.getFullYear() ? fullYear - 100 : fullYear;
	}

	set BirthYear(val) {
		this.registerObj.birth.year = val;
	}

	get Birth() {
		return `${this.BirthYear}-${this.BirthMonth}-${this.BirthDay}`;
	}

	// =============== Validation
	get DataValid() {
		return !this.pending &&
			this.IDValid && this.NameValid && this.EmailValid &&
			this.PasswordValid && this.PasswordConfirmValid &&
			this.GenderValid && this.NationValid && this.BirthValid;
	}

	get IDValid() {
		// 대소문자, 숫자, 하이픈, 언더바
		return this.registerObj.login &&
			/^[A-Za-z0-9\-_.]*$/.test(this.registerObj.login) &&
			this.registerObj.login.length > 1;
	}

	get NameValid() {
		// 두 글자 이상
		return this.registerObj.name && this.registerObj.name.length > 2;
	}

	get EmailValid() {
		return this.registerObj.email && EmailValidator.validate(this.registerObj.email);
	}

	get PasswordValid() {
		// 6자 이상
		return this.registerObj.pwd &&
			this.registerObj.pwd.length > 6;
	}

	get PasswordConfirmValid() {
		return this.registerObj.pwd && this.registerObj.pwd === this.registerObj.pwdConfirm;
	}

	get GenderValid() {
		return this.registerObj.gender !== null;
	}

	get NationValid() {
		return this.registerObj.nation !== null;
	}

	get BirthValid() {
		return this.BirthYear && this.BirthMonth && this.BirthDay;
	}

	// =============== CSS
	get ProfileImage() {
		if (this.imagePreview === null) {
			return null;
		}
		let rotation;
		switch (this.imageOrientation) {
			case 'left':
				rotation = 'rotate(90deg)';
				break;
			case 'right':
				rotation = 'rotate(-90deg)';
				break;
			case 'bottom':
				rotation = 'rotate(180deg)';
				break;
			default:
				rotation = null;
		}
		return {
			'background-image': `url(${this.imagePreview})`,
			'transform': rotation
		};
	}

	get SignUpLabel() {
		return this.pending ?
			'...' : 'SIGN UP';
	}

	genderChecked(val) {
		return this.registerObj.gender === val ?
			'is-checked' : null;
	}

	nationChecked(val) {
		return this.registerObj.nation === val ?
			'is-checked' : null;
	}

	sanitizeBirth() {
		this.sanitizeMonth();
		this.sanitizeDay();
		this.sanitizeYear();
	}

	sanitizeMonth() {
		if (this.BirthMonth === null) {
			return;
		}
		let val = parseInt(this.BirthMonth);
		if (Number.isNaN(val) || val < 1) {
			this.BirthMonth = 1;
		}
		else if (val > 12) {
			this.BirthMonth = 12;
		}
	}

	sanitizeDay() {
		if (this.BirthDay === null) {
			return;
		}
		let val = parseInt(this.BirthDay);
		if (Number.isNaN(val) || val < 1) {
			this.BirthDay = 1;
		}
		else {
			let lastDateOfCurrent = new Date(this.BirthYear, this.BirthMonth + 1, 0).getDate();
			if (lastDateOfCurrent < this.BirthDay) {
				this.BirthDay = lastDateOfCurrent;
			}
		}
	}

	sanitizeYear() {
		if (this.BirthYear === null) {
			return;
		}
		let val = this.BirthYear;
		if (Number.isNaN(val)) {
			this.BirthYear = null;
		}
		else if (val > 2020) {
			this.BirthYear = null;
		}
	}

	constructor(OverlaySvc, LoginSvc, $scope, $state) {
		this.OverlaySvc = OverlaySvc;
		this.LoginSvc = LoginSvc;
		this.$scope = $scope;
		this.$state = $state;

		this.imagePreview = null;
		this.imageData = null;
		this.imageOrientation = null;
		this.form = document.getElementById('form_register');

		/**
		 * 회원가입 요청 전송 여부
		 * true: 추가 요청을 방지
		 * @type {boolean}
		 */
		this.pending = false;
		/**
		 * 회원가입 오브젝트 원본
		 */
		this.registerTemplate = {
			login: null,
			name: null,
			email: null,
			pwd: null,
			pwdConfirm: null,
			birth: {
				month: null,
				day: null,
				year: null
			},
			gender: null,
			nation: null
		};
		/**
		 * 회원가입 오브젝트
		 */
		this.registerObj = angular.copy(this.registerTemplate);
	}

	async register() {
		if (!this.DataValid || this.pending) {
			return;
		}

		let data = new FormData(this.form);
		data.set('birth', this.Birth);

		// 이미지 있으면 전송 데이터에 수동으로 추가
		if (this.imageData) {
			data.append('image', this.imageData);
		}

		this.pending = true;
		this.OverlaySvc.toggle('loading');
		let response = await this.LoginSvc.register(data);

		this.pending = false;
		if (response.data.success) {
			await this.$state.go('introduce');
			this.OverlaySvc.toggle('loading');
		}
		else {
			this.registerObj.pwd = this.registerObj.pwdConfirm = null;
			switch (response.data.error) {
				case 'login_duplicate':
					this.registerObj.login = null;
					alert('ID already in use!');
					break;
				case 'upload_failed':
					alert('Profile image must not exceed 5MB!');
					break;
				default:
					alert('Please check your internet connection.');
			}
		}
	}
}

export default angular.module('touriends.page.register', ['touriends']).controller('RegisterCtrl', RegisterCtrl).name;
