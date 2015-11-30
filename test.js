var fs = require('fs');
var chai = require('chai');

var walterWorks = require('./index');
var featureJson = fs.readFileSync('./options.json');
var features = JSON.parse(featureJson);

describe('walterWorks', function() {
	it('Should return a random array of features', function() {
		var randomFeatures = walterWorks.generateRandomFeatures();
		var allCorrect = true;

		for (var i = 0, len = randomFeatures.length; i < len; i++) {
			if (features.indexOf(randomFeatures[i]) === -1) {
				allCorrect = false;
			}
		}

		chai.assert.isTrue(allCorrect);
		chai.assert.isTrue(randomFeatures.length <= features.length);
	});

	it('Should return a set number length array of features', function() {
		var randomFeatures = walterWorks.generateRandomFeatures(6);

		chai.assert.isTrue(randomFeatures.length === 6);
	});

	it('Should create a new framework with some random features', function() {
		var newFramework = walterWorks.createFramework();
		var allCorrect = true;

		for (var i = 0, len = newFramework.features.length; i < len; i++) {
			if (features.indexOf(newFramework.features[i]) === -1) {
				allCorrect = false;
			}
		}

		chai.assert.isDefined(newFramework);
		chai.assert.isTrue(allCorrect);
	});

	it('Should be able to get a feature from the new framework', function() {
		var newFramework = walterWorks.createFramework();
		var f = newFramework.features[Math.floor(Math.random() * newFramework.features.length)];

		chai.assert.isTrue(newFramework.features.indexOf(newFramework.getFeature(f)) !== -1);;
	});

	it('Should be able to check if a new framework feature exists', function() {
		var newFramework = walterWorks.createFramework();
		var f = newFramework.features[Math.floor(Math.random() * newFramework.features.length)];

		chai.assert.isTrue(newFramework.hasFeature(f));
	});

	it('Should be able to add if a new feature to a framework', function() {
		var newFramework = walterWorks.createFramework();
		var f = 'Beardy beard beard';

		newFramework.addFeature(f);

		chai.assert.isTrue(newFramework.features.indexOf(f) !== -1);
	});

	it('Should add a new framework to the global namespace', function(done) {
		walterWorks.register(100);
		setTimeout(function() {
			chai.assert.isDefined(global.walterWork0);
			setTimeout(function() {
				chai.assert.isDefined(global.walterWork1);
				done();
			}, 110)
		}, 110)
	});
});
