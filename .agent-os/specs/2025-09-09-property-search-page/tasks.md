# Tasks for: Property Search Page

- [x] **Task 1: Backend Setup for Search**
    - [x] Create `SearchController.php` in `app/Http/Controllers/Public/`.
    - [x] Add a GET route for `/search` in `routes/web.php` pointing to `SearchController@index`.
    - [x] Implement the `index` method in `SearchController` to receive request parameters.
    - [x] Add basic filtering logic in the controller for one parameter (e.g., location).
    - [x] Return an Inertia view `Search/Index` with dummy data for now.

- [x] **Task 2: Frontend Search Page**
    - [x] Create a new Inertia page component `resources/js/pages/Search/Index.tsx`.
    - [x] The page should display the search results passed from the controller.
    - [x] Use a similar layout to `FeaturedListings` to display property cards.

- [x] **Task 3: Implement SearchBar Functionality**
    - [x] Refactor `SearchBar.tsx` to manage form state using React hooks.
    - [x] Implement form submission logic to make a GET request to `/search` with query parameters using Inertia's router.

- [x] **Task 4: Enhance Backend Search Logic**
    - [x] Implement filtering for all parameters from the `SearchBar` (property type, price range, bedrooms, bathrooms).
    - [x] Add logic to parse the price range string.
    - [x] Implement pagination for the search results.

- [x] **Task 5: Frontend Polish**
    - [x] Ensure the search form on the `/search` page is pre-filled with the current search parameters.
    - [x] Add a "No results found" message when the search returns no properties.
    - [x] Implement pagination controls on the frontend.