kolCalc.controller('FileUpload', function ($scope,calc) {
	$scope.installCategories = function() {
		calc.getCategory.get({}, function(output){
			calc.createCategories(output.categories);
			calc.cat=output.categories;
		});

	}
});