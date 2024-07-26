-------------------------------------------------
-- SQL CODE TO INITALISE DATABASE FROM SCRATCH --
-------------------------------------------------

-- DROP EVERYTHING
DROP TABLE IF EXISTS wk12_users CASCADE;
DROP TABLE IF EXISTS wk12_departments CASCADE;
DROP TABLE IF EXISTS wk12_styles CASCADE;
DROP TABLE IF EXISTS wk12_posts CASCADE;
DROP TABLE IF EXISTS wk12_comments CASCADE;


-- USERS TABLE
CREATE TABLE IF NOT EXISTS wk12_users (
    id SERIAL PRIMARY KEY,
    clerk_id VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(12) UNIQUE NOT NULL,
    avatar VARCHAR(200),
    location VARCHAR(30) NOT NULL,
    bio VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS wk12_departments (
    id SERIAL PRIMARY KEY,
    gender VARCHAR(50) NOT NULL
);


-- STYLES TABLE
CREATE TABLE IF NOT EXISTS wk12_styles (
    id SERIAL PRIMARY KEY,
    style_name VARCHAR(20) NOT NULL,
    style_img VARCHAR(200) NOT NULL,
    style_description VARCHAR(100) NOT NULL
);


-- POSTS TABLE
CREATE TABLE IF NOT EXISTS wk12_posts (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR(100) REFERENCES wk12_users(clerk_id),
    title VARCHAR(25) NOT NULL,
    description TEXT NOT NULL,
    department_id INT NOT NULL REFERENCES wk12_departments(id),
    style_id INT NOT NULL REFERENCES wk12_styles(id),
    top_img VARCHAR(200) NOT NULL,
    top_url VARCHAR(200) NOT NULL,
    bottom_img VARCHAR(200),
    bottom_url VARCHAR(200),
    foot_img VARCHAR(200),
    foot_url VARCHAR(200),
    shoes_img VARCHAR(200),
    shoes_url VARCHAR(200),
    outerwear_img VARCHAR(200),
    outerwear_url VARCHAR(200),
    accessory1_img VARCHAR(200),
    accessory1_url VARCHAR(200),
    accessory2_img VARCHAR(200),
    accessory2_url VARCHAR(200),
    accessory3_img VARCHAR(200),
    accessory3_url VARCHAR(200)
);


-- COMMENTS TABLE
CREATE TABLE IF NOT EXISTS wk12_comments (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES wk12_posts(id) ON DELETE CASCADE,
    user_id VARCHAR(100) REFERENCES wk12_users(clerk_id),
    content VARCHAR(500) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- SEED GENDERS TABLE
INSERT INTO wk12_departments (gender) VALUES
('Womenswear'),
('Menswear'),
('Unisex');


-- SEED STYLES TABLE
INSERT INTO wk12_styles (style_name, style_img, style_description) VALUES
('Casual', 'https://i.imgur.com/HwrsHxK.jpeg', 'Effortlessly comfortable and versatile, perfect for everyday wear.'),
('Minimalist', 'https://i.imgur.com/iXkTloy.jpeg', 'Sleek and simple, focusing on clean lines and neutral tones.'),
('Athleisure', 'https://i.imgur.com/tHUlgc6.jpeg', 'Blending athletic comfort with everyday style for an active lifestyle.'),
('Business Casual', 'https://i.imgur.com/HJQFS3U.png', 'Professional yet relaxed, balancing smart and casual elements.'),
('Streetwear', 'https://i.imgur.com/yvXW6KD.jpeg', 'Bold and edgy, inspired by urban culture and street fashion.'),
('Grunge', 'https://i.imgur.com/FROK7lE.png', 'Rebellious and rugged, with a focus on layered, distressed pieces.'),
('Cottagecore', 'https://i.imgur.com/eLJhdlo.jpeg', 'Whimsical and nostalgic, embracing pastoral and vintage-inspired aesthetics.'),
('Dark Academia', 'https://i.imgur.com/WKQKZnm.jpeg', 'Intellectual and moody, with classic, scholarly-inspired fashion.');