function focusSelect() {
    return {
        restrict: 'A',
        link: function($scope, $elem) {
            let elem = $elem[0];
            $elem.on('click', () => {
                if (! window.getSelection().toString()) {
                    elem.setSelectionRange(0, elem.value.length);
                }
            });
        }
    }
}

export default focusSelect;