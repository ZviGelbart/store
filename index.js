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
    getSum()
    // updateDB(cart)
}

async function reduceFromcart(productId){
    let carts = JSON.parse(localStorage.carts)
    let index = carts.findIndex(item => item.id == productId)

    if(index !== -1){
        carts[index].amount--;
        if(carts[index].amount <=0){
            return
        }
    }
    localStorage.carts= JSON.stringify(carts)
    getSum()
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



async function showCart(){
    let show = JSON.parse(localStorage.getItem('carts')) || [];
    document.getElementById('categories').innerHTML = ''
    let categoriesContainer = document.getElementById('categories');
    for (let item of show) {
        let response =await doFetch(`https://dummyjson.com/products/${item.id}`,"GET")
        let categoryDiv = document.createElement('div');
        categoryDiv.className = 'category'
        categoryDiv.textContent = response.title;
        categoryDiv.id = response.id;

        let img = document.createElement("img")
        img.src = `${response.images[0]}`

        let price = document.createElement("h2")
        price.innerText = `price:${response.price}$`
      


        let brand =  document.createElement("h5")
        brand.innerText = `brand:${response.brand}`

        let amount = document.createElement("h5")
        amount.innerText = `amount ${item.amount}`

        let button = document.createElement("button")
        button.innerHTML = '+'
        button.onclick = function(){
            addToCart(categoryDiv.id)
        }
        let br = document.createElement("br")
        let br1 = document.createElement("br")

        let buttonDelete = document.createElement("button")
        buttonDelete.innerHTML = 'deleteItem'
        buttonDelete.id = "delete"
        buttonDelete.onclick = function(){
            deleteItem(categoryDiv.id)
        }
        let reduce = document.createElement("button")
        reduce.innerHTML= "-"
        reduce.id = "reduce"
        reduce.onclick = function(){
            reduceFromcart(categoryDiv.id)
        }
        categoryDiv.appendChild(img)
        categoryDiv.appendChild(price)
        categoryDiv.appendChild(brand)
        categoryDiv.appendChild(amount)
        categoryDiv.appendChild(button)
        categoryDiv.appendChild(br)
        categoryDiv.appendChild(br1)
        categoryDiv.appendChild(buttonDelete)
        categoryDiv.appendChild(reduce)
        categoriesContainer.appendChild(categoryDiv)
}
}

function deleteItem(product){
    let itemCarts = JSON.parse(localStorage.getItem('carts'))
    let update = itemCarts.filter(item => item.id !== product )
    localStorage.carts = JSON.stringify(update)
    getSum()
}

async function getSum(){
    let show = JSON.parse(localStorage.getItem('carts')) || [];
    let sum = 0;
    let order = document.getElementById("sum");
    for (let item of show) {
        let response =await doFetch(`https://dummyjson.com/products/${item.id}`,"GET")
        sum += (response.price) * (item.amount)
    }
    
    order.innerText = `price sum: ${sum}`
}
getSum()























































































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



