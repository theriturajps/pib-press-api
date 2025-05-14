const { scrapeLatestPressReleases } = require('../services/scraperService');

const getLatestPressReleases = async (req, res) => {
	try {
		const pressReleases = await scrapeLatestPressReleases();
		res.json({
			success: true,
			meta: {
				count: pressReleases.length,
				source: 'Press Information Bureau (PIB)',
				url: 'https://www.pib.gov.in/allrelease.aspx'
			},
			data: pressReleases
		});
	} catch (error) {
		console.error('Error fetching latest press releases:', error);
		res.status(500).json({
			success: false,
			error: 'Failed to fetch latest press releases'
		});
	}
};

module.exports = { getLatestPressReleases };