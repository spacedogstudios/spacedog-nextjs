PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE content (id INTEGER PRIMARY KEY, route_id STRING NOT NULL, subheading STRING, tagline STRING, body TEXT);
INSERT INTO content VALUES(1,'home','Welcome to Space Dog','We are a creative group of people who design digital experiences.',NULL);
INSERT INTO content VALUES(2,'about','Hello There','We are Space Dog','["We are a small app and web development team based in Melbourne. We work with all businesses large and small to to produce tailored solutions of the highest quality."]');
INSERT INTO content VALUES(3,'services','What We Do','We have everything you need to meet all your app and web development needs','["### App Development  \nWe develop apps for iOS and Android with a particular focus on user experience. Apps for phones, tablets and even smartwatches are all offered.", "### Web Development  \nWe can create websites of any complexity from robust back-end systems to simple brochure sites."]');
INSERT INTO content VALUES(4,'contact','Contact Us','Reach out for a new project or just say hello','["Send Us A Message"]');
CREATE INDEX idx_content_id ON content(id);
