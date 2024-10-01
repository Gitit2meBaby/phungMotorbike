const sharp = require('sharp');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Base URL
const baseUrl = 'https://i0.connections.vn/cdn.inevn.com/img/thumb/';

// List of bike IDs from spreadsheet
const bikeIds = [
    '178289', '20900', '20901', '20885', '2088', '20886', '20907', '20918', '20919', '20920', '20924', '20925', '20926', '20927', '20936', '20937', '20938', '20939', '20941', '20940', '20942', '20943', '41229', '41230', '20976', '41634', '41635', '178286', '178287', '23505', '22847', '22848', '22665', '22666', '22667', '22668', '22669', '2266999999', '22673', '22674', '22765', '22766', '22761', '22762', '479152', '479153', '479154', '479155', '22794', '22795', '22796', '22797', '22798', '22799', '22800', '22801', '22802', '22803', '22804', '22805', '22806', '22807', '22808', '22809', '22810', '22811', '22812', '22813', '22814', '178288', '178289', '22818', '22819', '22820', '22823', '22825', '22826', '22828', '22829', '22830', '22831', '22832', '22833', '22834', '22835', '22836', '22837', '22851', '22852', '22853', '22854', '22856', '22855', '22858', '22857', '22859', '22926', '22927', '22928', '22933', '22934', '22935', '22936', '22937', '22938', '22941', '22943', '22947', '22948', '22949', '23000', '23001', '23002', '23421', '23422', '23423', '23424', '23784', '23785', '23786', '23787', '178673', '178674', '23460', '23461', '23462', '23463', '180913', '180914', '23467', '23468', '23469', '23481', '23478', '23479', '23480', '23776', '23777', '23778', '23779', '23780', '23781', '23782', '23783', '23791', '23789', '23790', '23788', '23792', '23793', '23794', '23795', '23796', '23797', '23798', '23799', '478806', '478807', '478808', '478809', '23877', '23878', '23879', '23880', '24214', '24215', '24245', '24246', '24247', '24248', '24253', '24255', '24256', '24257', '24258', '24259', '24260', '24262', '24264', '24265', '24516', '24517', '24532', '24533', '24534', '26181', '26182', '26183', '26184', '26564', '26566', '26567', '26568', '26569', '26570', '26571', '26660', '26661', '26662', '26663', '39126', '39127', '40093', '39128', '39129', '39130', '39131', '39215', '39216', '39217', '40056', '40057', '40091', '40092', '40128', '40129', '40130', '40131', '40132', '40133', '40134', '40135', '40136', '40137', '40138', '40139', '41558', '41559', '41560', '41561', '41562', '41563', '41564', '41565', '41566', '41567', '41568', '41569', '41570', '41571', '41572', '41573', '41574', '41575', '41576', '41577', '41578', '41579', '41580', '41581', '41582', '41583', '41584', '41585', '41586', '41587', '41225', '41226', '41227', '41228', '41588', '41589', '41814', '41815', '41590', '41591', '41592', '41593', '178589', '17859', '41606', '41607', '41608', '41609', '484968', '484969', '484970', '484971', '41798', '41799', '41624', '41625', '41818', '41819', '41626', '41627', '4162',
];

// Generate image URLs
const imageUrls = bikeIds.map(id => `${baseUrl}${id}.1kx.isij`);

// Helper function to download image from URL
async function downloadImage(url, filepath) {
    const response = await axios({
        url,
        responseType: 'arraybuffer',
    });
    fs.writeFileSync(filepath, response.data);
}

// Process each image: download, resize, and convert
async function processImage(url, outputDir) {
    // Generate file names
    const filename = path.basename(url, path.extname(url));
    const originalPath = path.join(outputDir, `${filename}`);
    const thumbPath = path.join(outputDir, `${filename}-thumb.webp`);
    const fullPath = path.join(outputDir, `${filename}-full.webp`);
    const landScapePath = path.join(outputDir, `${filename}-landScape.webp`);

    try {
        // Download the image
        await downloadImage(url, originalPath);

        // Convert and resize to thumb (300x225)
        await sharp(originalPath)
            .resize(300, 225)
            .toFormat('webp')
            .toFile(thumbPath);

        // Convert and resize to full size (600x600)
        await sharp(originalPath)
            .resize(600, 600)
            .toFormat('webp')
            .toFile(fullPath);

        // Convert to correct aspect ratio(600x450)
        await sharp(originalPath)
            .resize(600, 450)
            .toFormat('webp')
            .toFile(landScapePath);

        console.log(`Processed ${filename} successfully!`);
    } catch (error) {
        console.error(`Error processing ${filename}:`, error);
    }
}

// Main function to loop over all URLs and process them
async function processImages(urls) {
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    for (const url of urls) {
        await processImage(url, outputDir);
    }
}

// Run the script
processImages(imageUrls);

// in order to run use CLI - node imageScript.js
