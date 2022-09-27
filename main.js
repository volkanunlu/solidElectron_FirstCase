//malzemeler ve değerleri girilmektedir.
let materials={
LettucePickles:5,
PackageSauce:5,
Onion:5,
Meatball:5,
Chicken:5,
Tomato:5,
Bread:5,
Potato:5,
Cola:5 
}

let information=document.getElementById("information")
let cooktype=0

// Hamburger et türü seçimi yapılmaktadır. Bu seçimle birlikte tavuk ya da köfte seçme işlemi sonrası tavuk için default bir pişme köfte için az orta çok olacak şekilde pişme türleri arasında bir seçim gerçekleşecektir.
function hamburgerSelection(){
    let selection=prompt("1.Tavuk 2.Köfte")
    if(selection==1){
    materials.Chicken--
    information.innerText="Tavuk seçimi gerçekleştirildi.Hazırlanıyor!"
    }

    else if(selection==2){
    materials.Meatball--
    information.innerText="Köfte seçimi gerçekleştirildi.\nHazırlanıyor!"
    cooktype=prompt("Bir pişme türü seçiniz: \n 1.Az Pişmiş\n 2.Orta Pişmiş\n3.Çok Pişmiş")
    }
    else if(meat!==2 && meat!==1){
    information.innerText="Hatalı bir veri girişi yaptınız!"
    }
}

//cooktype değerine göre et türüne göre pişme zamanları gerçekleştrildi.Ekrana bastırıldı.

async function preparing(){
   if(cooktype==0){
   await  order(()=>{console.log("Tavuk pişti!")},3000)
   }
   else if(cooktype==1){
    await order(()=>console.log("Az pişmiş köfte hazırlandı!"),2000)
   }
   else if(cooktype==2){
    await order(()=>console.log("Orta pişmiş köfte hazırlandı!"),3000)
   }
   else if(cooktype==3){
    await order(()=>console.log("Çok pişmiş köfte hazırlandı!"),4000)
   }
}


let order=(work,time)=>{
    return new Promise((resolve)=>{
       return setTimeout(()=>{
         resolve(work())
        },time)
    }
    )
}

//Materyal kontrolleri sağlandı.
let materialCheck=()=>{
    return new Promise((resolve,reject)=>{
        if(Object.values(materials).every((element) => element > 0)){
            setTimeout(()=>{
                resolve(console.log("2.Stok kontrolü yapıldı."))
            },3000)
        }
        else{
            reject(information.innerText="Stokta yeterli ürün bulunamadı!")
        }
    })	
}


// Tüm adımların sırası await ile sağlandı.Kullanılan malzemeler materyallerden eksiltildi.
async function steps(){
    await order(()=>{console.log("1.Siparişiniz alındı!")},1000)
    await materialCheck() 
    await order(hamburgerSelection,1000)
    order(()=>{materials.Potato--,console.log("4.Patatesleriniz hazırlandı!")},5000)
    order(()=>{materials.Cola--,console.log("5.İçecekleriniz hazırlandı!")},2000)
    await preparing()
    await order(()=>{materials.Bread--, console.log("3. Hamburgeriniz hazırlandı!")},2000)
    await order(()=>{materials.PackageSauce--, console.log("6.Soslar ve ürünleriniz servis tepsisinde!")},1000)
    order(()=>{console.log("7.Müşteri servisi gerçekleştirildi.")},1000)
}

steps()