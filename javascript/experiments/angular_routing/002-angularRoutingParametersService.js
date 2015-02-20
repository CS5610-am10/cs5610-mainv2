app.factory('RestaurantService', function restaurantService() {
    var dishesDetails = [
        {
            'title': 'Lasagna Fritta',
            'details': {
                'description': 'Fried parmesan-breaded lasagna, topped with parmesan cheese and marinara sauce, with creamy alfredo.',
                'nutritionFacts': { 'calories': 1070, 'totalFat': 71, 'sodium': 1650 }
            }
        },

        {
            'title': 'Stuffed Mushrooms',
            'details': {
                'description': 'Baked with clams, parmesan, romano, mozzarella and herb breadcrumbs.',
                'nutritionFacts': { 'calories': 380, 'totalFat': 30, 'sodium': 860 }
            }
        },

        {
            'title': 'Spicy Shrimp Scampi Fritta',
            'details': {
                'description': 'Lightly breaded and fried, tossed with garlic and a spicy cherry pepper sauce.',
                'nutritionFacts': { 'calories': 560, 'totalFat': 37, 'sodium': 1920 }
            }
        }
    ];

    var dishes = ['Lasagna Fritta', 'Stuffed Mushrooms', 'Spicy Shrimp Scampi Fritta'];

    var getDishes = function () {
        return dishes;
    }

    var getDishDetail = function (dish) {
        for (i = 0; i < dishesDetails.length; i++) {
            if (dishesDetails[i].title == dish) {
                return dishesDetails[i].details;
            }
        }
    }

    return {
        getDishes: getDishes,
        getDishDetail: getDishDetail
    }
});