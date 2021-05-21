const AWS = require('aws-sdk');
const Responses = require('../common/API_Responses');
const Axios = require('axios');

const SES = new AWS.SES();
const newsUrl = 'https://newsapi.org';

exports.handler = async event => {
    console.log('event', event);
    const techNews = await getNews();

    const emailHtml = createEmailHTML(techNews);

    const EMAIL = 'whodeen@gmail.com'

    const params = {
        Destination: {
            ToAddresses: [EMAIL]
        },
        Message: {
            Body: {
                Html: { Data: emailHtml }
            },
            Subject: { Data: 'Morning Tech News' },
        },
        Source: EMAIL
    }

    try {
        await SES.sendEmail(params).promise();
        return Responses._200({ message: 'email sent successfuly' });
    } catch (err) {
        console.log('error', err);
        return Responses._400({ message: err });
    }

}

const createEmailHTML = techNews => {
    console.log(techNews);

    return `
    <html>
        <body>
            <h1>Top news</h1>
            ${techNews.map(article => {
                return `
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href=${article.url}><button>Read more</button></a>
                `})}
        </body>
    </html>`
}

const getNews = async () => {
    const options = {
        params: {
            q: 'apple',
            language: 'en',
        },
        headers: {
            'X-Api-Key': 'e244942ccc194845aee2d3950c8538fb'
        }
    }

    const { data: newsData } = await Axios.get(`${newsUrl}/v2/top-headlines`, options);

    if (!newsData) {
        new Error('no data from the news api');
    }

    return newsData.articles.slice(0, 5);
}
