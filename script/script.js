let startBtn = document.querySelector("#startBtn"),
restartBtn = document.querySelector("#Restart"),
main_item = document.querySelectorAll(".main_item"),
main_conteiner = document.querySelectorAll(".main_conteiner"),
victory = document.querySelector(".victory"),
victoryBlock = document.querySelector(".victory_text"),
couterOfClicks = 0,
couterOfTry = 0,
Arr = []
let except = []

function SetImage(item,url){
   item.style.backgroundImage = `url("${url}")`
   item.style.backgroundSize = "contain"
   item.style.backgroundRepeat = "no-repeat"
   item.style.backgroundPosition = "center"
}

main_conteiner.forEach(item=>SetImage(item,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSYIEMq7K_PBa3EsduG4abA15Lv-myukn3xg&usqp=CAU"))

main_item.forEach(item=>{
    if( item.getAttribute("data-name")=="triangle"){
        SetImage(item,"https://www.svgrepo.com/show/532297/triangle.svg")
    }
    if(item.getAttribute("data-name")=="rect"){
        SetImage(item,"https://www.svgrepo.com/show/532287/square.svg")
    }
    if(item.getAttribute("data-name")=="circle"){
        SetImage(item,"https://www.svgrepo.com/show/532681/circle.svg")
    }
    if(item.getAttribute("data-name")=="heart"){
        SetImage(item,"https://www.svgrepo.com/show/532473/heart.svg")
    }
    if(item.getAttribute("data-name")=="star"){
        SetImage(item,"https://www.svgrepo.com/show/533052/star.svg")
    }
})

function Find(array, item){
    for (let i=0; i<array.length; i++){
        if (array[i] == item){
            return true;
        }
    }
    return false;
}
function findToSame(){
    for(let item of main_item){
        item.style.opacity = 0
            item.addEventListener("click",()=>{
                if(!Find(except, item.getAttribute("data-name"))){
                    item.style.opacity = 1
                    Arr.push(item.getAttribute("data-name"))
                    couterOfClicks++
                    item.classList.add("click")
                    if(Arr.length==2){  
                        if(Arr[0]==Arr[1]){
                        main_item.forEach(item1=>{
                            if(item1.getAttribute("data-name")==Arr[0]){
                                item.style.opacity = 1
                                except.push(item1.getAttribute("data-name"))
                            }
                        })
                    }}
                    if(couterOfClicks==2){
                        setTimeout(()=>{
                            couterOfClicks=0
                            let ClassClick = document.querySelectorAll(".click")
                            ClassClick.forEach(item=>{
                            item.style.opacity=0
                            item.classList.remove("click")
                            Arr = []
                            main_item.forEach(item1=>{
                                except.forEach(item=>{
                                    if(item1.getAttribute("data-name")==item){
                                        item1.style.opacity=1
                                    }
                                })
                            })
                        }) 
                    },1000)
                    }
                    if(couterOfClicks==2){
                        couterOfTry++
                    }
                    if(except.length==10){
                        victory.style.display = "flex"
                        victoryBlock.textContent = "Поздравляем с победой! Количество ваших попыток: "+couterOfTry
                    }
                    
                }
            })
    }
}


startBtn.addEventListener('click',()=>{
    for(let item of main_conteiner){
        item.style.order = Math.random()*9+1|0
    }
    main_item.forEach(item=>item.style.opacity = 1)
    except = []
    
    let id = setTimeout(findToSame,2000)
})
restartBtn.addEventListener('click',()=>{
    victory.style.display = "none"
    victoryBlock.textContent = ""
})




