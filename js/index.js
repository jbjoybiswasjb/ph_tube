const getTime = (seconds) => {
    const days = parseInt(seconds / 86400);
    let remainingSeconds = seconds % 86400;
    const hours = parseInt(remainingSeconds / 3600);
    remainingSeconds = seconds % 3600;
    const minutes = parseInt(remainingSeconds / 60);
    remainingSeconds = seconds % 60;
    return `${days} days ${hours} hrs ${minutes} min ${remainingSeconds} s ago.`;
}





const removeBgActiveBtn = () => {
    const categoryBtn = document.getElementsByClassName('category-btn');
    for (const btn of categoryBtn) {
        btn.classList.remove("bg-btnRed", "text-white");
    }
}





// First fetch, then load, and then show/display the data.

const loadCategories = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await response.json();
        displayCategories(data?.categories);
    }

    catch (error) {
        console.log(error);
    }
}

const loadVideos = async (searchText = '') => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`);
        const data = await response.json();

        displayVideos(data?.videos);
    }

    catch (error) {
        console.log(error);
    }
}


const getCategories = async (id) => {
    try {
        const response = await fetch(` https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
        const data = await response.json();


        // Remove bg of all active btn.
        removeBgActiveBtn();


        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.remove("bg-btnText/20");
        activeBtn.classList.add("bg-btnRed", "text-white");


        displayVideos(data?.category);
    }

    catch (error) {
        console.log(error);
    }
}





const loadDetails = async (detailsVideoId) => {

    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${detailsVideoId}`);
        const data = await response.json();

        displayDetails(data?.video);
    }

    catch (error) {
        console.log(error);
    }

}







const displayDetails = (videoDetails) => {

    const videoDetailsContainer = document.getElementById('video_details_container');

    videoDetailsContainer.innerHTML = `
    
    <img src="${videoDetails?.thumbnail}" class="rounded-lg w-full">
    <h2 class="font-bold text-3xl my-4">${videoDetails?.title}</h2>
    <p>${videoDetails?.description}</p>
    
    `;

    document.getElementById('videoDetails').showModal();
}








// Display categories.
const displayCategories = (categories) => {
    const btnList = document.getElementById('btn_list');

    categories.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <button class="px-5 py-3 btn flex-nowrap bg-btnText/20 rounded text-btnText font-medium text-lg category-btn" id="btn-${item?.category_id}" onclick="getCategories(${item?.category_id})">${item?.category}</button>
        `;

        // const btn = document.createElement('button');
        // btn.classList.add("px-5", "py-3", "btn", "flex-nowrap", "bg-btnText/20", "rounded", "text-btnText", "font-medium", "text-lg");
        // btn.innerText = item?.category;

        // const btn = document.createElement('button');
        // btn.setAttribute("class", "px-5 py-3 btn flex-nowrap bg-btnText/20 rounded text-btnText font-medium text-lg")
        // btn.innerText = item?.category;
        // li.appendChild(btn);

        btnList.appendChild(li);

    })

}

const displayVideos = (videos) => {

    const phTubeVideoContainer = document.getElementById('ph_tube_video_container');
    phTubeVideoContainer.innerHTML = '';

    if (videos.length == 0) {
        phTubeVideoContainer.classList.remove("grid");
        phTubeVideoContainer.classList.add("flex", "justify-center", "items-center");
        phTubeVideoContainer.innerHTML = `        
        <div class="text-center py-24 w-5/12">
            <img src = "../media/images/icon.png" class="mx-auto" />
            <h2 class="text-4xl font-bold text-textHeading mt-8">Oops!! Sorry, There is no content here</h2>
        </div>
        `;
        return;
    }
    else {
        phTubeVideoContainer.classList.add("grid");
    }

    videos.forEach(video => {
        const div = document.createElement('div');
        div.innerHTML = `
        
        <div class="relative max-w-80 h-52">
            <img src=${video?.thumbnail} alt="" class="h-full rounded-lg">
            ${video?.others?.posted_date.length === 0 ? "" : `
                
                <p class="text-white font-normal text-xs bg-textHeading p-2 rounded inline-block bottom-3 right-3 absolute">
                    ${getTime(video?.others?.posted_date)}
                </p>                
            `}
            
        </div>

        <div class="flex flex-col md:flex-row gap-3 mt-5 md:mt-3">
            <img src=${video?.authors[0]?.profile_picture} alt="${video?.authors[0]?.profile_name}" class="w-16 h-16 rounded-full">
            <div>
                <h3 class="text-textHeading text-base font-bold">
                    ${video?.title}
                </h3>
                <div class="py-2 flex gap-2 items-center">
                    <strong class="text-sm font-normal text-textHeading/70">
                        ${video?.authors[0]?.profile_name}
                    </strong>
                    ${(!!(video?.authors[0]?.verified)) ? `<img src="media/images/tick.png" alt="" class="w-4 h-4">` : ''}
                </div>
                <p class="text-sm font-normal text-textHeading/70">
                    ${video?.others?.views}
                </p>
            </div>
        </div>

        <div class="mt-4">
                <button class="btn" onclick="loadDetails('${video?.video_id}')">Details</button>
        </div>
        
        `;


        phTubeVideoContainer.appendChild(div);

    })

}





// Add search functionality.
document.getElementById('search_field')
    .addEventListener('keyup', (event) => {

        loadVideos(event?.target?.value);

    })



// Sort.
const sortByViews = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos`);
    const data = await response.json();
    const videos = data?.videos;

    const afterSort = videos.sort(function (a, b) {
        const views = a?.others?.views;
        const viewsNumber = views.split("K");
        const viewsNumberFloat = parseFloat(viewsNumber)
        
        const viewsB = b?.others?.views;
        const viewsNumberB = viewsB.split("K");
        const viewsNumberFloatB = parseFloat(viewsNumberB)

        return viewsNumberFloat - viewsNumberFloatB;
    })

    displayVideos (afterSort);
}






loadCategories();
loadVideos();