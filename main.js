const numVoters = 800;
const numCandidates = 8;
const voters = [];
const candidates = [];

function load() {
	for (let i = 0; i < numVoters; i++) {
		voters.push(gaussianRandom());
	}
	for (let i = 0; i < numCandidates; i++) {
		const a = gaussianRandom();
		const b = gaussianRandom();
		candidates.push({
			min: Math.min(a, b),
			max: Math.max(a, b),
			votes: 0,
		});
	}
	console.log('candidates', candidates);

	for (const voter of voters) {
		vote(voter);
	}

	let winner = candidates[0];
	for (const candidate of candidates) {
		if (candidate.votes > winner.votes) {
			winner = candidate;
		}
	}
	console.log('winner', winner);
}

function vote(voter) {
	let choice = candidates[0];
	for (const candidate of candidates) {
		if (
			candidate.min <= voter &&
			candidate.max >= voter &&
			candidate.max - candidate.min < choice.max - choice.min
		) {
			choice = candidate;
		}
	}
	choice.votes++;
	return choice;
}

// https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
// Standard Normal variate using Box-Muller transform.
function gaussianRandom(mean = 0, stdev = 1) {
	const u = 1 - Math.random(); // Converting [0,1) to (0,1]
	const v = Math.random();
	const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
	// Transform to the desired mean and standard deviation:
	return z * stdev + mean;
}
