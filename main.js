let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let total = document.getElementById("total");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let sumbit = document.getElementById("sumbit");

let mood = 'create';
let tmp;

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
  }
}

let dataPro = [];
// التحقق من وجود بيانات في localStorage
if (localStorage.products != null) {
  dataPro = JSON.parse(localStorage.products);
} else {
  dataPro = [];
}

sumbit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    total: total.innerHTML,
    count:count.value,
    discount: discount.value,
    category: category.value.toLowerCase(),
  };

  // مسح الحقول بعد إضافة المنتج
 

  // إضافة المنتج الجديد إلى المصفوفة++
  if (title.value != '' 
    && category.value != ''
    && price.value != ''
  && newPro.count < 100){
       if(mood=== 'create'){

    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
      } else {
      dataPro.push(newPro);
      }
    }else{
      dataPro [ tmp ] = newPro;
      mood = 'create';
      sumbit.innerHTML = 'create';
       count.style.display = 'block'

  } clearData(); 
}
 

  // تحديث localStorage مع البيانات المحدثة
  localStorage.setItem("products", JSON.stringify(dataPro));
  
  // عرض البيانات المحدثة في الجدول
  showData();
};

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  count.value = "";
  total.innerHTML = "";
  discount.value = "";
  category.value = "";
}

// عرض البيانات من localStorage في الجدول
function showData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `<tr>
            <td>${i+1 }</td> <!-- بدء العد من 1 -->
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateProduct(${i})">update</button></td> <!-- تعديل البيانات باستخدام التابع editProduct() -->
            <td><button onclick="deleteProduct(${i})">delete</button></td> <!-- حذف البيانات باستخدام التابع deleteProduct() -->
        </tr>`;
  }
  // إضافة البيانات إلى الجدول في HTML داخل showData
  document.getElementById("tbody").innerHTML = table;

  // إضافة زر حذف الكل فقط إذا كان هناك منتجات في dataPro
  let btnDelete = document.getElementById("clearData");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = '<button onclick="deleteAll()">Delete All</button>';
    btnDelete.style.margin ="5px" ;
  } else {
    btnDelete.innerHTML = ""; // إخفاء زر حذف الكل إذا لم يكن هناك منتجات
  }
}

// عرض البيانات المخزنة عند تحميل الصفحة
showData();

function deleteProduct(i) {
  // حذف المنتج
  dataPro.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(dataPro)); // تحديث localStorage
  showData(); // تحديث الجدول بعد الحذف
}

function deleteAll() {
  // حذف جميع المنتجات
  localStorage.clear();
  dataPro.splice(0);
  showData(); // تحديث الجدول
}
function updateProduct(i){
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = 'none';
  category.value = dataPro[i].category;
  sumbit.innerHTML = 'update';
  mood = 'update';
  tmp = i;
  scroll({
    top:0,
    behavior:'smooth',
  })
}

let searchMood = 'title';

function getSearchMood(id){

  let search = document.getElementById('search');
   if(id== 'searchtitle'){
    searchMood = 'title';
    search.placeholder = 'search by title';
   }else{
    searchMood = 'category';
    search.placeholder = 'search by category';
   }
search.focus()
search.value ='';
showData();

}
function searchData(value){
  let table = '';
 if (searchMood == 'title'){
 
  for (let i = 0; i < dataPro.length; i++) {
     if(dataPro[i].title.includes(value.toLowerCase())){
        table += `<tr>
          <td>${i }</td> <!-- بدء العد من 1 -->
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateProduct(${i})">update</button></td> <!-- تعديل البيانات باستخدام التابع editProduct() -->
          <td><button onclick="deleteProduct(${i})">delete</button></td> <!-- حذف البيانات باستخدام التابع deleteProduct() -->
          </tr>`;
     }
    
  }

}
else{ for (let i = 0; i < dataPro.length; i++) {
  if(dataPro[i].category.includes(value.toLowerCase())){
     table += `<tr>
       <td>${i }</td> <!-- بدء العد من 1 -->
       <td>${dataPro[i].title}</td>
       <td>${dataPro[i].price}</td>
       <td>${dataPro[i].taxes}</td>
       <td>${dataPro[i].ads}</td>
       <td>${dataPro[i].total}</td>
       <td>${dataPro[i].discount}</td>
       <td>${dataPro[i].category}</td>
       <td><button onclick="updateProduct(${i})">update</button></td> <!-- تعديل البيانات باستخدام التابع editProduct() -->
       <td><button onclick="deleteProduct(${i})">delete</button></td> <!-- حذف البيانات باستخدام التابع deleteProduct() -->
       </tr>`;
  }
 
}

}
document.getElementById("tbody").innerHTML = table;document.getElementById("tbody").innerHTML = table;
}

