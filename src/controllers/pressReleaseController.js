const {
	scrapeLatestPressReleases,
	scrapePressReleasesByDate
} = require('../services/scraperService');

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

const getPressReleasesByDate = async (req, res) => {
	try {
		const { date } = req.params;
		// Validate date format (YYYY-MM-DD)
		if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
			return res.status(400).json({
				success: false,
				error: 'Invalid date format. Please use YYYY-MM-DD'
			});
		}

		const pressReleases = await scrapePressReleasesByDate(date);
		res.json({
			success: true,
			data: pressReleases,
			meta: {
				count: pressReleases.length,
				date,
				source: 'Press Information Bureau (PIB)',
				url: `https://pib.gov.in/PressReleasePage.aspx?PRYear=${date.substring(0, 4)}&PRMonth=${date.substring(5, 7)}&PRDay=${date.substring(8, 10)}`
			}
		});
	} catch (error) {
		console.error('Error fetching press releases by date:', error);
		res.status(500).json({
			success: false,
			error: 'Failed to fetch press releases for the specified date'
		});
	}
};

module.exports = {
	getLatestPressReleases,
	getPressReleasesByDate
};