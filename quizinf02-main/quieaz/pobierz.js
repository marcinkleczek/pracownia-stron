function ezza(){
function zapiszpytania(i) {
   re2 = /id="odp...?"/
   a = ""
   a += document.querySelectorAll(".sep")[i].nextSibling.outerHTML.replace((i+2)+".","") 
   b = document.querySelectorAll(".sep")[i].nextSibling.outerHTML.replace((i+2)+".","") 

   if (document.querySelectorAll(".sep")[i].nextSibling.nextSibling.classList.contains("obrazek")) {
      a += document.querySelectorAll(".sep")[i].nextSibling.nextSibling.outerHTML
      a += document.querySelectorAll(".sep")[i].nextSibling.nextSibling.nextSibling.nextSibling.outerHTML.replace(re2,"")
      a += document.querySelectorAll(".sep")[i].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.outerHTML.replace(re2,"")
      a += document.querySelectorAll(".sep")[i].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.outerHTML.replace(re2,"")
      a += document.querySelectorAll(".sep")[i].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.outerHTML.replace(re2,"")
     

   }else{
      a += document.querySelectorAll(".sep")[i].nextSibling.nextSibling.nextSibling.outerHTML.replace(re2,"")
      a += document.querySelectorAll(".sep")[i].nextSibling.nextSibling.nextSibling.nextSibling.outerHTML.replace(re2,"")
      a += document.querySelectorAll(".sep")[i].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.outerHTML.replace(re2,"")
      a += document.querySelectorAll(".sep")[i].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.outerHTML.replace(re2,"")

   }
}
function savequestion() {
   pytania = JSON.parse(localStorage.getItem("pytania"))
   pytaniatresc= JSON.parse(localStorage.getItem("pytaniatresc"))
  pytaniaprzed= pytania.length
  trescprzed = pytaniatresc.length
      for (g=0;g<39;g++){

      
 
   zapiszpytania(g)
   if (pytaniatresc.includes(b)) {
   } else {
      pytania.push(a)
      pytaniatresc.push(b)
   }
}
console.log(pytania.length-pytaniaprzed)
console.log(pytaniatresc.length-trescprzed)
let pytaniatresc_str = JSON.stringify(pytaniatresc)
localStorage.setItem("pytaniatresc", pytaniatresc_str)
let pytania_str = JSON.stringify(pytania)
localStorage.setItem("pytania", pytania_str)
}
savequestion()}
ezza()
document.querySelector("#sprawdz").parentElement.click()
// poniższa funkcja przed wszystkim na stronie \; https://egzamin-informatyk.pl/odpowiedzi-inf02-ee08-sprzet-systemy-sieci/
function pre(){ 
pytania = []
pytaniatresc = []
let pytaniatresc_str = JSON.stringify(pytaniatresc)
localStorage.setItem("pytaniatresc", pytaniatresc_str)
let pytania_str = JSON.stringify(pytania)
localStorage.setItem("pytania", pytania_str)}