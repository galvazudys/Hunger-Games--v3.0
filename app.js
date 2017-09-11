let inpNode = document.getElementById('search');
let renderList = document.getElementById('list');
let listOfFood = [];

fetchData = val => {
    fetch(`https://nutritionix-api.p.mashape.com/v1_1/search/${val}?fields=nf_calories,item_name,brand_name`, {
        method: 'GET',
        headers: {
            'X-Mashape-Key': 'LOkyvYzwXFmshynyglg0VkGgbg8np1gtcWyjsnDDvOGdcGCvhu'
        }
    }).then(response => {
        return response.json();
    }).then(response => {
        listOfFood = [...response.hits]

        listOfFood.forEach((item) => {
            renderList.innerHTML += `<li id=${item._id}>${item.fields.item_name}(${item.fields.brand_name}) / Calories: ${item.fields.nf_calories}</li>`;
        })

    });
}



