function srcToBackground() {
	return function(src) {
		if (! src) {
			return null;
		}
		return {
			'background-image': `url(${src})`
		};
	}
}

export default srcToBackground;