let inpNode = document.getElementById('search');
let renderList = document.getElementById('list');
let totalList = document.getElementById('totalList');
let totalCaloriesNode =document.getElementById('totalCalories');
let totalCalories = 0;
let renderTotalList = []
let listOfFood = [];

fetchData = val => {
    renderList.innerHTML = '';
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

renderList.addEventListener('click', (e) => {
    listOfFood.forEach((item) => {
        if (e.target.id === item._id) {
            renderTotalList.push({name: item.fields.item_name, id: item._id, brand: item.fields.brand_name, calories: item.fields.nf_calories});
            totalCalories += item.fields.nf_calories;
            totalList.innerHTML = '';
            renderTotalList.forEach((item) => {

                totalList.innerHTML += `<li id=${item.id}>${item.name} (${item.brand}) /  Calories: ${item.calories}</li>`;
            })
            totalCaloriesNode.innerHTML = `Total calories: ${totalCalories}`
        }

    })
})
