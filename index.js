const baseUrl = 'https://dummyjson.com/products/categories';

let productList = []

localStorage.carts = localStorage.carts ?? JSON.stringify([]);

async function doFetch(url, method = 'GET') {
    let result = fetch(url, { method })
        .then(async (response) => {
            let data = await response.json()
            return data
        })
    return result
}



async function getAllCategories() {
    let categories = await doFetch(baseUrl);
    return categories
}


async function chooseProductFromCategories(product) {
    // let myList = await getAllCategories();
    let myChoose = await doFetch(`https://dummyjson.com/products/category/${product}`)
    productList = myChoose.products;
    
    document.getElementById('categories').innerHTML = ''
    let categoriesContainer = document.getElementById('categories');
    for (item of productList) {
        let categoryDiv = document.createElement('div');
        categoryDiv.className = 'category'
        categoryDiv.textContent = item.title;
        categoryDiv.id = item.id;
        let img = document.createElement("img")
        img.src = `${item.images[0]}`
        let price = document.createElement("h2")
        price.innerText = `price:${item.price}$`
        let brand =  document.createElement("h5")
        brand.innerText = `brand:${item.brand}`
        let button = document.createElement("button")
        button.innerHTML = 'buy'
        button.onclick = function(){
            addToCart(categoryDiv.id)
        }
        console.log(item);
        categoryDiv.appendChild(img)
        categoryDiv.appendChild(price)
        categoryDiv.appendChild(brand)
        categoryDiv.appendChild(button)
        categoriesContainer.appendChild(categoryDiv)
    }

    // console.log(productList);
    return productList
}


async function addToCart(productId) {
    let carts = JSON.parse(localStorage.carts)
    let find = carts.find(item => item.id == productId)
    if (find) {
        find.amount++;
    } else {
        carts.push({ id: productId, amount: 1 })
    }
    localStorage.carts = JSON.stringify(carts)
    console.log(carts);
    // updateDB(cart)
}


async function createCategoriesDiv() {
    let categories = await getAllCategories();
    let categoriesContainer = document.getElementById('categories');
    document.getElementById('categories').innerHTML = ''
    categories.forEach((val, index) => {
        let categoryDiv = document.createElement('div');
        categoryDiv.className = 'category'
        categoryDiv.textContent = val;
        categoryDiv.id = val;
        categoryDiv.addEventListener('click', async () => {
        let products = await chooseProductFromCategories(val);
        });

        categoriesContainer.appendChild(categoryDiv);
    });
}



createCategoriesDiv()

































































































// async function start(){
//    let categories = await getAllCategories();
//    let c = categories[3]
//    let myChoose = await chooseProductFromCategories(c);
//    let select = myChoose[2]
//    let add = await addToCart(select.id)
// //    console.log(add);

// }
// start()




// #############################################################################################



