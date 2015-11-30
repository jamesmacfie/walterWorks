var fs = require('fs');

function register(ms) {
	var numberOfFrameworksCreated = 0;
	setInterval(function() {
		var newFramework = createFramework();
		global['walterWork' + numberOfFrameworksCreated] = newFramework;

		numberOfFrameworksCreated++;
	}, ms || 720000);
}

function createFramework() {
	var framework = function(features) {
		this.features = features;

		this.getFeature = function(feature) {
			var idx = this.features.indexOf(feature);
			return this.features[idx];
		}

		this.hasFeature = function(feature) {
			var idx = this.features.indexOf(feature);
			return !!idx;
		}

		this.addFeature = function(feature) {
			this.features.push(feature);
		}
	}

	var featureSet = generateRandomFeatures();
	return new framework(featureSet);
}

function generateRandomFeatures(featureNum) {
	var featureFile = fs.readFileSync('./options.json');
	var features = JSON.parse(featureFile);

	var numberOfFeatures = featureNum || Math.ceil(Math.random() * features.length);
	var frameworkFeatures = [];

	for (var i = 0; i < numberOfFeatures; i++) {
		frameworkFeatures.push(features[Math.floor(Math.random() * numberOfFeatures)]);
	}

	return frameworkFeatures;
}

module.exports = {
	register: register,
	createFramework: createFramework,
	generateRandomFeatures: generateRandomFeatures
};
