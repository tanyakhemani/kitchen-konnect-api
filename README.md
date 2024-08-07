# kitchen-konnect-api

Backend API for Kitchen-Konnect UI

## Overview

The Kitchen Konnect app is a food recipe app designed to help users discover, create, and manage various recipes. It aims to provide a platform where users can easily find new recipes, manage their own recipes, and also share and view recipes.

### Problem

- Users can create, read, update, and delete recipes in one place, simplifying the cooking process.
- Efficiently access and manage recipes without navigating through multiple sources.
- Users can easily add their own recipes, ensuring a personal touch to their cooking.
- Minimize the risk of losing or misplacing recipes with a structured digital format.
- Simplifies meal planning by having all recipes organized and accessible in one place.

### User Profile

The app is targeted at cooking enthusiasts, home cooks, and anyone interested in trying new recipes. It caters to both novice and experienced cooks by providing easy-to-follow instructions and a wide variety of recipes.

### Features

#### Key Features:

Recipe Management:
Users can create, read, update, and delete their own recipes.
Recipes include details such as title, ingredients, preparation steps, cooking time, and serving size.

Search:
Users can search for recipes by name or ingredients.

Recipe Details:
Detailed view of each recipe with all the necessary information.
Users can like and view recipes.

#### User Stories:

- As a user, I want to search for recipes by name or ingredients so that I can quickly find what I need.
- As a user, I want to view detailed information about a recipe so that I can follow the instructions to make it.
- As a user, I want to create and manage my own recipes so that I can share them with others.
- As a user, I want to like recipes so that I can share my feedback and help others choose good recipes.

## Implementation

### Tech Stack

- Frontend: HTML, CSS, JS, React, Axios
- Backend: Node.js with Express server, Knex.js
- Database: MySQL

### Sitemap

1. Home Page  
   Header: Logo, navigation links (Create New, View Recipes)  
   RecipeSearch: Search bar for finding recipes by name, ingredients  
   RecipeList: Display a list of recipes (each recipe could be a RecipeCard with photo and title)  
   Footer: Contact info, social media links

2. Recipe Detail Page  
   Header: Logo, navigation links  
   RecipeDetail: Detailed information about the recipe (photo, title, ingredients, steps)  
   Like, edit, share icons  
   Footer

3. Create/Edit Recipe Page  
   Header: Logo, navigation links  
   RecipeForm: Form for creating or editing a recipe (photo, title, ingredients, steps)  
   Cancel & Save Button  
   Footer

4. Search Results/View All Page  
   Header: Logo, navigation links  
   RecipeSearch: Search bar for refining search  
   RecipeList: Display list of recipes based on search/view results  
   Footer

5. Pop-up/component for Delete Confirmation  
   Header: Logo, navigation links  
   Pop-up
   Footer

### Mockups

https://www.figma.com/design/PbJ1TxOpiuN8FosCSEJLlK/Untitled?node-id=0-1&t=uZ3tgm1IiIB9jwgj-1

### Data

Fields:  
id: Unique identifier for the recipe (integer or UUID)  
title: Title of the recipe (string)  
description: Short description of the recipe (string)  
ingredients: List of ingredients (array of strings)  
steps: List of preparation steps (array of strings)  
image: URL or path to an image of the recipe (string)
likes: boolean

-- Create the 'recipes' table

```
CREATE TABLE recipes (
id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each recipe
title VARCHAR(255) NOT NULL, -- Title of the recipe
description TEXT, -- Short description of the recipe
ingredients TEXT NOT NULL, -- List of ingredients (stored as a comma-separated string)
steps TEXT NOT NULL, -- Preparation steps (stored as a comma-separated string)
image VARCHAR(255), -- URL or path to an image of the recipe
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of when the recipe was created
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp of the last update
);
```

### Endpoints

1. Create Recipe
   Method: POST
   Endpoint: /recipes

Request Example:

```{
"title": "Spaghetti Carbonara",
"description": "A classic Italian pasta dish.",
"ingredients": ["spaghetti", "eggs", "cheese", "bacon", "pepper"],
"steps": [
"Cook spaghetti.",
"Fry bacon.",
"Mix eggs and cheese.",
"Combine all ingredients."
],
"image": "http://example.com/image.jpg"
}
```

Response Example:

```
{
"id": 1,
"title": "Spaghetti Carbonara",
"description": "A classic Italian pasta dish.",
"ingredients": ["spaghetti", "eggs", "cheese", "bacon", "pepper"],
"steps": [
"Cook spaghetti.",
"Fry bacon.",
"Mix eggs and cheese.",
"Combine all ingredients."
],
"image": "http://example.com/image.jpg"
}
```

2. Read Recipe (Get All)
   Method: GET
   Endpoint: /recipes

Response Example:

```
[
{
"id": 1,
"title": "Spaghetti Carbonara",
"description": "A classic Italian pasta dish.",
"ingredients": ["spaghetti", "eggs", "cheese", "bacon", "pepper"],
"steps": [
"Cook spaghetti.",
"Fry bacon.",
"Mix eggs and cheese.",
"Combine all ingredients."
],
"image": "http://example.com/image.jpg"
}
]
```

3. Read Recipe (Get One)
   Method: GET
   Endpoint: /recipes/:id
   Parameters:
   id (integer or UUID)

Response Example:

```
{
"id": 1,
"title": "Spaghetti Carbonara",
"description": "A classic Italian pasta dish.",
"ingredients": ["spaghetti", "eggs", "cheese", "bacon", "pepper"],
"steps": [
"Cook spaghetti.",
"Fry bacon.",
"Mix eggs and cheese.",
"Combine all ingredients."
],
"image": "http://example.com/image.jpg"
}
```

4. Update Recipe
   Method: PUT
   Endpoint: /recipes/:id
   Parameters:
   id (integer or UUID)

Request Example:

```
{
"title": "Spaghetti Carbonara (Updated)",
"description": "An updated description.",
"ingredients": ["spaghetti", "eggs", "cheese", "bacon", "pepper", "garlic"],
"steps": [
"Cook spaghetti.",
"Fry bacon and garlic.",
"Mix eggs and cheese.",
"Combine all ingredients."
],
"image": "http://example.com/new-image.jpg"
}
```

Response Example:

```
{
"id": 1,
"title": "Spaghetti Carbonara (Updated)",
"description": "An updated description.",
"ingredients": ["spaghetti", "eggs", "cheese", "bacon", "pepper", "garlic"],
"steps": [
"Cook spaghetti.",
"Fry bacon and garlic.",
"Mix eggs and cheese.",
"Combine all ingredients."
],
"image": "http://example.com/new-image.jpg"
}
```

5. Delete recipe
   Method: DELETE
   Endpoint: /recipes/:id
   Parameters:
   id (integer or UUID)

Response Example:

```
{
"message": "Recipe deleted successfully."
}
```

## Roadmap

Day 1-2: Setup and Basic Configuration
Project Setup:
-Initialize project repositories for React front-end and Node.js/Express back-end.
-Install necessary dependencies (React, Express).

Basic Structure:
-Set up basic folder structure and initial files.

Day 3-4: Backend Development
Create Recipe Endpoint:
-Implement POST /recipes to create a new recipe.

Read Recipe Endpoints:
-Implement GET /recipes to retrieve all recipes.
-Implement GET /recipes/:id to retrieve a single recipe by ID.

Day 5-6: Frontend Development (Part 1)
Recipe List Page:
-Develop the RecipeList page to display all recipes.

Recipe Detail Page:
-Develop the RecipeDetail page to show detailed information for a single recipe.

Create Recipe Form:
-Implement the form to allow users to create new recipes.

Day 7: Backend Development (Continued)
Update Recipe Endpoint:
-Implement PUT /recipes/:id to update an existing recipe.

Delete Recipe Endpoint:
-Implement DELETE /recipes/:id to delete a recipe.

Day 8-9: Frontend Development (Part 2)
Update Recipe Form:
-Develop and integrate the form to update existing recipes on the RecipeDetail page.

Delete Functionality:
-Add delete functionality to the RecipeDetail page and RecipeList page.

UI Improvements:
-Refine UI components, ensure responsiveness, and improve user experience based on testing.

Day 10: Final Testing and Deployment
Testing:
-Conduct thorough testing of all CRUD operations (Create, Read, Update, Delete).
-Fix any bugs or issues.

Deployment:
-Deploy the app to a hosting platform.

Documentation:
-Finalize documentation, including setup instructions and usage guidelines.

## Nice-to-haves

User Authentication:
-If the core functionality is completed early, implement basic user authentication features such as signup and login.

Image Upload:
-Use the Multer package for handling multipart/form-data to upload images directly instead of using URLs.
-Implement endpoints to handle file uploads and integrate them with recipe creation and update forms.

Filtering:
Implement filters to find recipes by title, ingredients, or as per user's dietary preferences.
