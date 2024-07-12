This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

News Website Project
It is a news website that scrapes live data from other websites and presents it in a user-friendly format. The project involved several key features and challenges:

Data Scraping and Aggregation: I built a custom scraper using the npm module cheerio to fetch live news data from various reputable sources. This required handling different website structures and ensuring the scraper was efficient and reliable, using CSS selectors to extract the needed information.

Backend Development with Express and MongoDB: I used Express.js to create a RESTful API that served the scraped data. MongoDB was used as the database to store and manage the news articles, allowing for efficient querying and retrieval.

Pagination: Implementing pagination was crucial to ensure the website could handle large datasets and provide a smooth user experience.

Frontend with Next.js: The frontend was built using Next.js, enhancing the user experience with a modern and responsive design. This transition also involved maintaining the existing functionality and ensuring smooth integration with the backend. Next.js also improved the site's SEO through server-side rendering.

Deployment:

Frontend: Deployed on Vercel, providing a scalable and efficient platform for the Next.js application.

Backend: Deployed on AWS, ensuring it could handle increased traffic. This included setting up an Elastic Beanstalk environment for the API and managing the database on an AWS-hosted MongoDB service. The API generated from AWS is used to retrieve data (The code of backend part is in news-insummary repo).

Voice Assistant Integration: To further enhance user engagement, I added a voice assistant feature that allows users to navigate the website using voice commands. This involved using speech recognition APIs and integrating them with the Next.js frontend.

Chrome Extension: I also developed a Chrome extension that leverages speech recognition to navigate between different pages of the news website. This extension provides users with an alternative and convenient way to interact with the site. (The Chrome extension isn't live as it requires some amount of money to publish it. For using the extension, go to my GitHub profile, open the 'shamar-news' repository, clone the repo locally, and use the folder named chrome_extension to install the extension.)

This project showcases my ability to handle both frontend and backend development, integrate various technologies, and deploy a full-stack application in a real-world environment. The challenges I overcame, such as data scraping, API development, and seamless deployment, made this project particularly rewarding and a testament to my skills as a developer.

