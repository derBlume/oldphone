# TODO:

-   build simple backend to

    -   trigger new scrape/clean cycle
    -   approve new data

-   build first version of frontend

    -   list of devices with timeline of updates

-   automatize scraping & cleaning (e.g. once a day)
    -   send email if new data is found

# DONE:

-   scrape Apple Updates site (recent + legacy) and save raw data to table
-   clean Apple Updates Data and filter for iPhone/iOS, write in new clean table
-   make sure only new data is added, everything else is discarded

-   make sure all data up to Dec 2020 is legit

-   have "approved" column in raw and clean table
