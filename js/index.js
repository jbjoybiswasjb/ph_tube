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

    const btnList = document.getElementById('btn_list');

    categories.forEach((item) => {

        const li = document.createElement('li');
        // li.innerHTML = `
        // <button class="px-5 py-3 btn flex-nowrap bg-btnText/20 rounded text-btnText font-medium text-lg">${item?.category}</button>
        // `;

        // const btn = document.createElement('button');
        // btn.classList.add("px-5", "py-3", "btn", "flex-nowrap", "bg-btnText/20", "rounded", "text-btnText", "font-medium", "text-lg");
        // btn.innerText = item?.category;

        const btn = document.createElement('button');
        btn.setAttribute("class", "px-5 py-3 btn flex-nowrap bg-btnText/20 rounded text-btnText font-medium text-lg")
        btn.innerText = item?.category;

        li.appendChild(btn);
        btnList.appendChild(li);

    })

}






loadCategories();