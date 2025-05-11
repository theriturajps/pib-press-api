const axios = require('axios');
const cheerio = require('cheerio');

const PIB_BASE_URL = 'https://www.pib.gov.in';

const scrapeLatestPressReleases = async () => {
	try {
		const response = await axios.get(`${PIB_BASE_URL}/allrelease.aspx`);
		const $ = cheerio.load(response.data);

		const pressReleases = [];
		let currentMinistry = "";

		// Process each child element in the press release list
		$('#form1 > section.pb40 > div > div.row.pt20 > div > div > ul').children().each((index, element) => {
			// Check if the element is a heading (ministry name)
			if ($(element).is('h3')) {
				currentMinistry = $(element).text().trim();
			}
			// If it's a list item (press release)
			else if ($(element).is('li')) {
				const title = $(element).find('a').text().trim();
				const link = $(element).find('a').attr('href');
				const date = $(element).find('.publishdatesmall').text().trim();

				const pressReleaseId = link.split('PRID=')[1];

				pressReleases.push({
					pressReleaseId,
					title,
					link: link.startsWith('http') ? link : `${PIB_BASE_URL}${link}`,
					date,
					ministry: currentMinistry
				});
			}
		});

		return pressReleases;
	} catch (error) {
		console.error('Error scraping latest press releases:', error);
		throw error;
	}
};

const scrapePressReleasesByDate = async (date) => {
	console.log(date)
	try {
		const [year, month, day] = date.split('-');
		const response = await axios.get(`${PIB_BASE_URL}/PressReleasePage.aspx`, {
			params: {
				PRYear: year,
				PRMonth: month,
				PRDay: day
			}
		});

		const $ = cheerio.load(response.data);
		const pressReleases = [];

		$('.container .release-content').each((index, element) => {
			const title = $(element).find('h3 a').text().trim();
			const link = $(element).find('h3 a').attr('href');
			const releaseDate = $(element).find('.release-date').text().trim();
			const content = $(element).find('p').text().trim();

			pressReleases.push({
				id: index + 1,
				title,
				link: link.startsWith('http') ? link : `${PIB_BASE_URL}${link}`,
				date: releaseDate,
				content,
				ministry: 'Not specified'
			});
		});

		return pressReleases;
	} catch (error) {
		console.error('Error scraping press releases by date:', error);
		throw error;
	}
};

module.exports = {
	scrapeLatestPressReleases,
	scrapePressReleasesByDate
};