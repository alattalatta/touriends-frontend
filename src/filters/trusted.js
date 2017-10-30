function trusted($sce) {
	return function(src) {
		if (src) {
			return $sce.trustAsHtml(src);
		}
		return null;
	}
}
trusted.$inject = ['$sce'];

export default trusted;