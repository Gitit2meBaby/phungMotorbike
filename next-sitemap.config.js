/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.NEXT_PUBLIC_URL || 'https://phungmotorbike.com',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    changefreq: 'daily',
    priority: 0.7,
    autoLastmod: true,
    additionalPaths: async (config) => {
        const [city, travel, monthly, sale] = await Promise.all([
            fetchDynamicSlugs('motorbike-for-rent-hanoi'),
            fetchDynamicSlugs('motorbike-rentals-vietnam'),
            fetchDynamicSlugs('monthly-rentals-hanoi'),
            fetchDynamicSlugs('motorbikes-for-sale'),
        ]);

        return [
            ...city.map(slug => ({
                loc: `/motorbike-for-rent-hanoi/${slug}`,
                changefreq: 'weekly',
                priority: 0.8,
            })),
            ...travel.map(slug => ({
                loc: `/motorbike-rentals-vietnam/${slug}`,
                changefreq: 'weekly',
                priority: 0.8,
            })),
            ...monthly.map(slug => ({
                loc: `/monthly-rentals-hanoi/${slug}`,
                changefreq: 'weekly',
                priority: 0.8,
            })),
            ...sale.map(slug => ({
                loc: `/motorbikes-for-sale/${slug}`,
                changefreq: 'weekly',
                priority: 0.8,
            })),
        ];
    }
};

export default config;

// Helper function for fetching slugs
async function fetchDynamicSlugs(category) {
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_URL}/api/get-slugs?category=${category}`);
    const data = await response.json();
    return data.slugs;
}
