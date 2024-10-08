// First fetch, then load, and then show/display the data.

const loadCategories = async() => {
    try{
        const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await response.json();
        displayCategories(data?.categories);
    }

    catch(error) {
        console.log(error);
    }
}




// Display categories.
const displayCategories = (categories) => {

    categories.forEach((item) => {
        console.log(item);
    })

}






loadCategories();