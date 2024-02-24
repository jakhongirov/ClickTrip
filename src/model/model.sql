CREATE TABLE admins (
   admin_id bigserial PRiMARY KEY,
   admin_email text not null,
   admin_password text not null,
   admin_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE agencies (
   agency_id bigserial PRiMARY KEY,
   agency_name text not null,
   agency_phone_number text not null,
   agency_password text not null,
   agency_image_url text,
   agency_image_name text,
   agency_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
   user_id bigserial PRiMARY KEY,
   user_name text not null,
   user_phone_number text not null,
   user_os text,
   user_location text,
   user_lang text,
   user_bookmarks int [],
   user_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tour_countries (
   country_id bigserial PRiMARY KEY,
   country_name text not null,
   country_viza_text text,
   country_viza boolean DEFAULT false,
   country_image_url text,
   country_image_name text,
   country_lang text,
   country_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tour_destinations (
   destination_id bigserial PRIMARY KEY,
   destination_name text,
   country_id int REFERENCES tour_countries(country_id) ON DELETE CASCADE,
   destination_lang text,
   destination_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fly_countries (
   country_id bigserial PRiMARY KEY,
   country_name text not null,
   counrty_image_url text,
   counrty_image_name text,
   counrty_lang text,
   country_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fly_cities (
   city_id bigserial PRiMARY KEY,
   city_name text not null,
   country_id int REFERENCES fly_countries(country_id) ON DELETE CASCADE,
   city_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE airways (
   airway_id bigserial PRIMARY KEY,
   airway_name text,
   airway_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
   category_id bigserial PRiMARY KEY,
   category_name text not null,
   category_image_url text,
   category_image_name text,
   category_lang text,
   category_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hotels (
   hotel_id bigserial PRiMARY KEY,
   hotel_name text,
   hotel_description text,
   hotel_star int,
   hotel_location text,
   hotel_country int REFERENCES tour_countries(country_id) ON DELETE CASCADE,
   hotel_city int REFERENCES tour_destinations(destination_id) ON DELETE CASCADE,
   hotel_lang text,
   hotel_image_url text,
   hotel_image_name text,
   hotel_active boolean DEFAULT true,
   hotel_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trips (
   trip_id bigserial PRIMARY KEY,
   trip_name text,
   trip_description text,
   trip_price int,
   trip_sale_price int DEFAULT 0,
   trip_hot_price int DEFAULT 0,
   trip_hot boolean DEFAULT false,
   trip_start_date int,
   trip_end_date int,
   trip_day int,
   trip_lang text,
   destination_id int REFERENCES tour_destinations(destination_id) ON DELETE CASCADE,
   category_id bigint [],
   trip_hotels json [],
   country_id int REFERENCES fly_countries(country_id) ON DELETE CASCADE,
   city_id int REFERENCES fly_cities(city_id) ON DELETE CASCADE,
   airway_id int REFERENCES airways(airway_id) ON DELETE CASCADE,
   baggage text,
   agency_id int REFERENCES agencies(agency_id) ON DELETE CASCADE,
   trip_images_url text [],
   trip_images_name text [],
   trip_videos_url text [],
   trip_videos_name text [],
   trip_active boolean DEFAULT true,
   trip_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news (
   news_id bigserial PRiMARY KEY,
   news_title text,
   news_description text,
   news_button_text text,
   news_link text,
   news_lang text,
   trip_id int,
   news_image_link text,
   news_image_name text,
   news_active boolean DEFAULT true,
   news_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);